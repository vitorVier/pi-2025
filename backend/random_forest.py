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
file_path = "C:/Users/Darles Thume/Downloads/dados_dediabetes.csv"

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

# Matriz de Confusão
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=label_encoders['tipo_diabetes'].classes_, yticklabels=label_encoders['tipo_diabetes'].classes_)
plt.xlabel('Previsão')
plt.ylabel('Real')
plt.title('Matriz de Confusão')
plt.show()

# Importância das variáveis
importances = model.feature_importances_
features = X.columns

plt.figure(figsize=(10, 6))
sns.barplot(x=importances, y=features)
plt.title("Importância das Variáveis")
plt.xlabel("Importância")
plt.ylabel("Variável")
plt.show()

plt.show()
input("Pressione Enter para encerrar...")

