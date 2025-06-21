from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import os
import joblib # Usado para salvar e carregar o modelo
import sqlite3
from datetime import datetime
from db import obter_total_diagnosticos

# --- Configuração da Aplicação ---
app = Flask(__name__)
CORS(app)

# Conexão única com SQLite
conn = sqlite3.connect("diagnosticos.db", check_same_thread=False)
cursor = conn.cursor()

# Cria tabela se não existir
cursor.execute("""
CREATE TABLE IF NOT EXISTS relatorios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    total_diagnosticos INTEGER,
    data TEXT
)
""")
conn.commit()

def salvar_relatorio(total_diagnosticos: int):
    data = datetime.now().isoformat()
    cursor.execute(
        "INSERT INTO relatorios (total_diagnosticos, data) VALUES (?, ?)",
        (total_diagnosticos, data)
    )
    conn.commit()

def obter_ultimo_relatorio():
    row = cursor.execute(
        "SELECT * FROM relatorios ORDER BY id DESC LIMIT 1"
    ).fetchone()
    if row:
        return {"id": row[0], "total_diagnosticos": row[1], "data": row[2]}
    return {"id": 0, "total_diagnosticos": 0, "data": ""}

# --- Constantes e Variáveis Globais ---
MODEL_PATH = 'diabetes_model.joblib'
MODEL_COLUMNS_PATH = 'model_columns.joblib'
CLASS_MAPPING_PATH = 'class_mapping.joblib'
CSV_PATH = 'backend/dados_dediabetes_completos.csv'

# Variáveis para armazenar o modelo e as colunas em memória
model = None
model_columns = None
class_mapping = None

# --- Funções Auxiliares ---

def load_model():
    """ Carrega o modelo, as colunas e o mapeamento de classes do disco. """
    global model, model_columns, class_mapping
    try:
        if all(os.path.exists(p) for p in [MODEL_PATH, MODEL_COLUMNS_PATH, CLASS_MAPPING_PATH]):
            print("🧠 Carregando modelo, colunas e mapeamento existentes...")
            model = joblib.load(MODEL_PATH)
            model_columns = joblib.load(MODEL_COLUMNS_PATH)
            class_mapping = joblib.load(CLASS_MAPPING_PATH)
            print("✅ Modelo carregado com sucesso!")
        else:
            print("⚠️ Arquivos de modelo não encontrados. Treine o modelo primeiro via GET /train.")
    except Exception as e:
        print(f"❌ Erro ao carregar o modelo: {e}")

# --- Rotas da API ---

@app.route('/')
def home():
    """ Rota inicial para verificar se o servidor está no ar. """
    return "Servidor rodando! GET /train para treinar, POST /diagnosticar para prever."

@app.route('/train', methods=['GET'])
def train_model():
    """ Carrega, pré-processa, treina e salva o modelo de machine learning. """
    global model, model_columns, class_mapping
    try:
        print("🔄 Iniciando o processo de treinamento...")
        if not os.path.exists(CSV_PATH):
            return jsonify({"error": f"Arquivo de dados não encontrado: {CSV_PATH}"}), 404
        
        df = pd.read_csv(CSV_PATH)
        df.columns = df.columns.str.strip()
        print(f"📊 Dados carregados: {df.shape[0]} linhas, {df.shape[1]} colunas.")

        # --- Pré-processamento ---
        def converter_tempo_para_semanas(valor):
            if pd.isna(valor): return 0
            valor_str = str(valor).lower()
            numeros = ''.join(filter(str.isdigit, valor_str))
            if not numeros: return 0
            num = int(numeros)
            if 'semana' in valor_str: return num
            if 'mês' in valor_str or 'mes' in valor_str: return num * 4
            if 'ano' in valor_str: return num * 52
            return 0

        if 'tempo_sintomas' in df.columns:
            df['tempo_sintomas'] = df['tempo_sintomas'].apply(converter_tempo_para_semanas)
        
        # Mapeia colunas binárias conhecidas
        mapeamento_binario = {'sim': 1, 'não': 0, 'masculino': 0, 'feminino': 1}
        # Seleciona colunas que podem ser mapeadas
        cols_to_map = [col for col in df.columns if set(df[col].unique()).issubset(mapeamento_binario.keys())]
        df[cols_to_map] = df[cols_to_map].replace(mapeamento_binario)
        print(f"✅ Colunas binárias mapeadas: {cols_to_map}")

        if 'tipo_diabetes' not in df.columns:
            return jsonify({"error": "Coluna alvo 'tipo_diabetes' não encontrada."}), 400

        # Separa o alvo (y) antes de processar as features (X)
        y_labels = df['tipo_diabetes'].astype('category')
        temp_class_mapping = {code: label for code, label in enumerate(y_labels.cat.categories)}
        y = y_labels.cat.codes
        X = df.drop(columns=['tipo_diabetes'])
        print(f"🔄 Mapeamento de classes: {temp_class_mapping}")

        # *** CORREÇÃO: Converte TODAS as colunas de texto restantes para numérico ***
        categorical_cols = X.select_dtypes(include=['object']).columns
        if len(categorical_cols) > 0:
            print(f"🔍 Codificando colunas de texto: {list(categorical_cols)}")
            X = pd.get_dummies(X, columns=categorical_cols, prefix=categorical_cols)
            print("✅ Colunas de texto convertidas com One-Hot Encoding.")
        
        # Agora, X é totalmente numérico
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
        
        # --- Pipeline e Treinamento ---
        pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('clf', RandomForestClassifier(random_state=42, class_weight='balanced'))
        ])
        param_grid = {
            'clf__n_estimators': [100, 200],
            'clf__max_depth': [10, 20],
            'clf__min_samples_leaf': [1, 2]
        }
        
        grid_search = GridSearchCV(pipeline, param_grid, cv=5, n_jobs=-1, verbose=1, scoring='accuracy')
        grid_search.fit(X_train, y_train)

        best_model = grid_search.best_estimator_
        accuracy = best_model.score(X_test, y_test)
        
        # Salva o modelo, a ordem das colunas e o mapeamento de classes
        joblib.dump(best_model, MODEL_PATH)
        joblib.dump(list(X.columns), MODEL_COLUMNS_PATH) # Salva colunas após get_dummies
        joblib.dump(temp_class_mapping, CLASS_MAPPING_PATH)

        # Atualiza as variáveis globais
        model, model_columns, class_mapping = best_model, list(X.columns), temp_class_mapping

        print(f"🎯 Acurácia final: {accuracy:.4f}")
        print(f"💾 Modelo, colunas e mapeamento salvos com sucesso!")

        return jsonify({
            "mensagem": "Modelo treinado e salvo com sucesso!",
            "acuracia": round(accuracy, 4),
            "melhores_parametros": grid_search.best_params_
        })

    except Exception as e:
        print(f"❌ Erro inesperado durante o treinamento: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Ocorreu um erro interno durante o treinamento.", "detalhes": str(e)}), 500

@app.route('/diagnosticar', methods=['POST'])
def diagnosticar():
    """ Recebe dados de um paciente e retorna um diagnóstico. """
    if model is None:
        return jsonify({"error": "Modelo não treinado. Acesse GET /train primeiro."}), 400

    try:
        dados_paciente = request.json
        print(f"📥 Recebidos dados para diagnóstico: {dados_paciente}")

        df_paciente = pd.DataFrame([dados_paciente])

        # Pré-processamento idêntico ao de treino para os dados do paciente
        df_paciente.replace('', 0, inplace=True)  # evita conversão errada de string vazia

        # Colunas binárias
        df_paciente.replace({'sim': 1, 'não': 0, 'masculino': 0, 'feminino': 1}, inplace=True)
        
        # Garante que o DataFrame do paciente tenha as mesmas colunas do modelo
        # Adiciona colunas faltantes (dummies) com valor 0 e remove extras
        df_final = pd.DataFrame(columns=model_columns)
        df_final = pd.concat([df_final, df_paciente], ignore_index=True, sort=False).fillna(0)
        df_final = df_final[model_columns] # Garante a ordem e remove colunas extras

        # Faz a predição
        predicao_codigo = model.predict(df_final)[0]
        probabilidades = model.predict_proba(df_final)[0]
        
        diagnostico = class_mapping.get(predicao_codigo, "Desconhecido")
        confianca = round(probabilidades.max() * 100, 2)
        
        print(f"🔍 Diagnóstico: {diagnostico} com {confianca}% de confiança.")
        
        return jsonify({
            "diagnostico": diagnostico,
            "confianca_percentual": confianca
        })

    except Exception as e:
        print(f"❌ Erro na predição: {e}")
        return jsonify({"error": "Erro ao processar o diagnóstico.", "detalhes": str(e)}), 500

@app.route('/relatorio', methods=['GET'])
def relatorio():
    total = obter_total_diagnosticos()
    return jsonify({'total_diagnosticos': total})

# --- Execução da Aplicação ---
if __name__ == '__main__':
    load_model() # Tenta carregar um modelo existente ao iniciar
    app.run(host='0.0.0.0', port=5000, debug=True)
