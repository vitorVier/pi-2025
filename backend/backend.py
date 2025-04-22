# Manipulação de dados
import pandas as pd
import numpy as np

# Pré-processamento
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Divisão de dados
from sklearn.model_selection import train_test_split

# Balanceamento
from imblearn.over_sampling import SMOTE

# Modelo
from sklearn.ensemble import RandomForestClassifier

# Avaliação
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Visualização
import matplotlib.pyplot as plt
import seaborn as sns

# Caminho do seu arquivo CSV
file_path = "dados_dediabetes.csv"

# Carregar os dados
df = pd.read_csv(file_path)

# Codificar variáveis categóricas
label_encoders = {}
for col in ['historico_familiar', 'hipertensao', 'doencas_cardiacas', 'sintomas_frequentes', 'tempo_sintomas', 'tipo_diabetes']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Separar preditores e alvo
X = df.drop(columns=['tipo_diabetes'])
y = df['tipo_diabetes']

# Dividir treino/teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Aplicar SMOTE
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# Normalizar os dados
scaler = StandardScaler()
X_train_res = scaler.fit_transform(X_train_res)
X_test = scaler.transform(X_test)

# Treinar modelo Random Forest
model = RandomForestClassifier(random_state=42)
model.fit(X_train_res, y_train_res)

# Fazer previsões
y_pred = model.predict(X_test)

# Avaliar
acc = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Acurácia do modelo: {acc:.2f}")
print("Relatório de Classificação:")
print(report)

# Imports
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, learning_curve
from sklearn.preprocessing import LabelEncoder, StandardScaler, label_binarize
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_curve, auc
from imblearn.over_sampling import SMOTE

# Carregar os dados
file_path = "dados_dediabetes.csv"
df = pd.read_csv(file_path)

# Codificar variáveis categóricas
label_encoders = {}
for col in ['historico_familiar', 'hipertensao', 'doencas_cardiacas', 'sintomas_frequentes', 'tempo_sintomas', 'tipo_diabetes']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Separar preditores e alvo
X = df.drop(columns=['tipo_diabetes'])
y = df['tipo_diabetes']

# Dividir treino/teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Aplicar SMOTE
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# Normalizar os dados
scaler = StandardScaler()
X_train_res = scaler.fit_transform(X_train_res)
X_test = scaler.transform(X_test)

# Treinar modelo Random Forest
model = RandomForestClassifier(random_state=42)
model.fit(X_train_res, y_train_res)

# Fazer previsões
y_pred = model.predict(X_test)

# Avaliação
acc = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)
print(f"Acurácia do modelo: {acc:.2f}")
print("Relatório de Classificação:")
print(report)

# Matriz de Confusão
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=label_encoders['tipo_diabetes'].classes_,
            yticklabels=label_encoders['tipo_diabetes'].classes_)
plt.xlabel('Previsão')
plt.ylabel('Real')
plt.title('Matriz de Confusão')
plt.show()

# Importância das Features
importances = model.feature_importances_
indices = np.argsort(importances)[::-1]
plt.figure(figsize=(10, 6))
plt.title("Importância das Variáveis")
sns.barplot(x=importances[indices], y=X.columns[indices], palette='viridis')
plt.show()

# Curvas ROC por Classe
y_test_bin = label_binarize(y_test, classes=[0, 1, 2, 3])
y_score = model.predict_proba(X_test)

fpr, tpr, roc_auc = {}, {}, {}
for i in range(y_test_bin.shape[1]):
    fpr[i], tpr[i], _ = roc_curve(y_test_bin[:, i], y_score[:, i])
    roc_auc[i] = auc(fpr[i], tpr[i])

plt.figure(figsize=(10, 7))
for i in range(y_test_bin.shape[1]):
    plt.plot(fpr[i], tpr[i], label=f'Classe {i} (AUC = {roc_auc[i]:.2f})')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('Falso Positivo')
plt.ylabel('Verdadeiro Positivo')
plt.title('Curvas ROC por Classe')
plt.legend()
plt.grid()
plt.show()

# Curva de Aprendizado
train_sizes, train_scores, test_scores = learning_curve(model, X_train_res, y_train_res, cv=5)
train_mean = np.mean(train_scores, axis=1)
test_mean = np.mean(test_scores, axis=1)

plt.figure(figsize=(8, 5))
plt.plot(train_sizes, train_mean, 'o-', label='Treino')
plt.plot(train_sizes, test_mean, 'o-', label='Validação')
plt.xlabel('Tamanho do conjunto de treino')
plt.ylabel('Acurácia')
plt.title('Curva de Aprendizado')
plt.legend()
plt.grid()
plt.show()

# Comparação Real vs Previsto
df_result = pd.DataFrame({'Real': y_test, 'Previsto': y_pred})
plt.figure(figsize=(8, 6))
sns.countplot(data=df_result, x='Real', hue='Previsto', palette='pastel')
plt.title('Distribuição de Classes: Real vs Previsto')
plt.show()

input("Pressione Enter para encerrar...")

# ============================
# IMPORTAÇÕES
# ============================
import pandas as pd
import numpy as np
from sklearn.model_selection import StratifiedKFold, RandomizedSearchCV, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from imblearn.pipeline import Pipeline
from imblearn.over_sampling import SMOTE
from scipy.stats import randint
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

# ============================
# CARREGAR E PRÉ-PROCESSAR OS DADOS
# ============================
df = pd.read_csv("dados_dediabetes.csv")

# Codificar variáveis categóricas
label_encoders = {}
for col in ['historico_familiar', 'hipertensao', 'doencas_cardiacas', 'sintomas_frequentes', 'tempo_sintomas', 'tipo_diabetes']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Separar preditores e alvo
X = df.drop(columns=['tipo_diabetes'])
y = df['tipo_diabetes']

# ============================
# PIPELINE + VALIDAÇÃO CRUZADA + TUNING
# ============================
pipeline = Pipeline(steps=[
    ('scaler', StandardScaler()),
    ('smote', SMOTE(random_state=42)),
    ('rf', RandomForestClassifier(random_state=42))
])

param_dist = {
    'rf__n_estimators': randint(100, 500),
    'rf__max_depth': [None, 10, 20, 30],
    'rf__min_samples_split': [2, 5, 10],
    'rf__min_samples_leaf': [1, 2, 4],
    'rf__bootstrap': [True, False]
}

skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

random_search = RandomizedSearchCV(
    pipeline,
    param_distributions=param_dist,
    n_iter=20,
    cv=skf,
    scoring='f1_weighted',
    n_jobs=-1,
    verbose=1,
    random_state=42
)

random_search.fit(X, y)

print("Melhores parâmetros:", random_search.best_params_)

# ============================
# AVALIAÇÃO FINAL
# ============================
y_pred = random_search.predict(X)
acc = accuracy_score(y, y_pred)
print(f"Acurácia no conjunto completo: {acc:.2f}")
print("Relatório de Classificação:")
print(classification_report(y, y_pred))

# Matriz de Confusão
cm = confusion_matrix(y, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=label_encoders['tipo_diabetes'].classes_,
            yticklabels=label_encoders['tipo_diabetes'].classes_)
plt.xlabel('Previsão')
plt.ylabel('Real')
plt.title('Matriz de Confusão')
plt.show()

# ============================
# EXPORTAR O MODELO
# ============================
joblib.dump(random_search.best_estimator_, 'modelo_diabetes.pkl')
print("Modelo salvo com sucesso!")
