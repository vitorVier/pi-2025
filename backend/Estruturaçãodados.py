import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from imblearn.over_sampling import SMOTE
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report

# Carregar o arquivo CSV
file_path = "C:/Users/Darles Thume/Downloads/dados_dediabetes.csv"
df = pd.read_csv(file_path)

# Converter variáveis categóricas para numéricas
label_encoders = {}
for col in ['historico_familiar', 'hipertensao', 'doencas_cardiacas', 'sintomas_frequentes', 'tempo_sintomas', 'tipo_diabetes']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Selecionar variáveis preditoras e alvo
X = df.drop(columns=['tipo_diabetes'])
y = df['tipo_diabetes']

# Dividir os dados em treino e teste
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Aplicar o SMOTE para balanceamento
smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

# Normalizar os dados
scaler = StandardScaler()
X_train_resampled = scaler.fit_transform(X_train_resampled)
X_test = scaler.transform(X_test)

# Treinar o modelo Naïve Bayes
model = GaussianNB()
model.fit(X_train_resampled, y_train_resampled)

# Fazer previsões
y_pred = model.predict(X_test)

# Avaliar o modelo
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

print(f"Acurácia do modelo: {accuracy:.2f}")
print("Relatório de Classificação:")
print(report)
