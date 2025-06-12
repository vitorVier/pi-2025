from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import requests
import os

app = Flask(__name__)

trained_models = []

EXTERNAL_API_URL = "http://192.168.0.199:5000"
CSV_PATH = 'backend/dados_dediabetes_completos.csv'

@app.route('/')
def home():
    return "Servidor rodando! Acesse /process para processar dados ou /train para treinar modelo."

@app.route('/process', methods=['POST'])
def process_data():
    try:
        raw_data = request.json.get('data', [])
        if not raw_data:
            return jsonify({"error": "Dados não fornecidos"}), 400

        processed_result = {
            "media": sum(raw_data) / len(raw_data),
            "soma": sum(raw_data),
            "tamanho": len(raw_data)
        }

        response = requests.post(
            EXTERNAL_API_URL,
            json=processed_result,
            headers={"Content-Type": "application/json"}
        )

        if response.status_code == 200:
            return jsonify({
                "status": "Dados processados e enviados!",
                "resultado_local": processed_result,
                "resposta_api": response.json()
            })
        else:
            return jsonify({
                "error": "Falha ao enviar para a API",
                "detalhes": response.text
            }), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/train', methods=['GET'])
def train_model():
    try:
        print("🔄 Iniciando treinamento...")

        if not os.path.exists(CSV_PATH):
            print("❌ Arquivo não encontrado!")
            return jsonify({"error": "Arquivo de dados não encontrado."}), 404
        
        df = pd.read_csv(CSV_PATH)
        df.columns = df.columns.str.strip()  # Remove espaços dos nomes de coluna
        print("📊 Dados carregados com sucesso!")
        print("🧾 Colunas:", df.columns.tolist())

        def converter_tempo(valor):
            if pd.isna(valor):
                return 0
            valor = str(valor).lower()
            numeros = ''.join(filter(str.isdigit, valor))
            if numeros == '':
                return 0
            num = int(numeros)
            if 'semana' in valor:
                return num
            elif 'mês' in valor or 'mes' in valor:
                return num * 4
            elif 'ano' in valor:
                return num * 52
            else:
                return 0

        if 'tempo_sintomas' in df.columns:
            df['tempo_sintomas'] = df['tempo_sintomas'].apply(converter_tempo)
            print("✅ Coluna 'tempo_sintomas' convertida para valores numéricos.")

        mapeamento_binario = { 
            'sim': 1,
            'não': 0,
            'masculino': 0,
            'feminino': 1
        }
        df = df.replace(mapeamento_binario)

        if 'tipo_diabetes' not in df.columns:
            print("❌ Coluna 'tipo_diabetes' não está no dataset.")
            return jsonify({"error": "Coluna 'tipo_diabetes' não encontrada no dataset."}), 400

        if 'sintomas_frequentes' in df.columns:
            df = pd.get_dummies(df, columns=['sintomas_frequentes'], prefix='sintoma')
            print("✅ Coluna 'sintomas_frequentes' transformada em variáveis dummies.")

        X = df.drop(columns=['tipo_diabetes'])
        y = df['tipo_diabetes'].astype('category').cat.codes
        print("✅ Dados separados em X e y.")

        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('clf', RandomForestClassifier(random_state=42))
        ])

        param_grid = {
            'clf__n_estimators': [50, 100, 200],
            'clf__max_depth': [None, 10, 20],
            'clf__min_samples_split': [2, 5],
            'clf__min_samples_leaf': [1, 2]
        }

        grid_search = GridSearchCV(pipeline, param_grid, cv=5, n_jobs=-1, verbose=1)
        grid_search.fit(X_train, y_train)

        print(f"✅ Melhor conjunto de parâmetros: {grid_search.best_params_}")

        best_model = grid_search.best_estimator_

        y_pred = best_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"🎯 Acurácia: {accuracy}")

        report = classification_report(y_test, y_pred, output_dict=True)
        trained_models.append(best_model)

        # Mostrar proporção das classes (balanceamento)
        class_counts = df['tipo_diabetes'].value_counts(normalize=True).rename("proportion")
        print("🔎 Balanceamento das classes (proporção):")
        print(class_counts)

        return jsonify({
            "mensagem": "Modelo treinado com sucesso!",
            "acuracia": round(accuracy, 4),
            "relatorio": {
                "precisao": round(report['weighted avg']['precision'], 2),
                "recall": round(report['weighted avg']['recall'], 2),
                "f1_score": round(report['weighted avg']['f1-score'], 2)
            },
            "amostras_treinadas": len(X_train),
            "melhores_parametros": grid_search.best_params_
        })

    except Exception as e:
        print("❌ Erro durante o treinamento:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
