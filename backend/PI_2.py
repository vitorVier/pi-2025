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
import shap
import matplotlib.pyplot as plt
import seaborn as sns

# ============================
# CARREGAR E PRÉ-PROCESSAR OS DADOS
# ============================
df = pd.read_csv("C:/Users/Darles Thume/Downloads/dados_dediabetes.csv")

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

# ============================
# SHAP: INTERPRETABILIDADE
# ============================
# OBS: O SHAP pode demorar dependendo do tamanho do dataset
explainer = shap.Explainer(random_search.best_estimator_.named_steps['rf'])
X_scaled = random_search.best_estimator_.named_steps['scaler'].transform(X)
shap_values = explainer(X_scaled)

# Summary Plot
shap.summary_plot(shap_values, X, feature_names=X.columns)
