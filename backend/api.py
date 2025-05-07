from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder

app = Flask(__name__)

# Carregar modelo treinado
modelo = joblib.load('modelo_diabetes.pkl')

# Carregar os label encoders salvos manualmente (reconstrua os encoders conforme usados no treino)
le_gender = LabelEncoder()
le_gender.fit(['Female', 'Male', 'Other'])  # Mesma ordem usada no treino

le_smoking = LabelEncoder()
le_smoking.fit(['never', 'No Info', 'former', 'not current', 'current', 'ever'])

# Inicializar scaler igual ao da pipeline
scaler = StandardScaler()

# Colunas esperadas
feature_names = [
    'gender', 'age', 'hypertension', 'heart_disease', 'smoking_history',
    'bmi', 'HbA1c_level', 'blood_glucose_level'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    try:
        # Converter para DataFrame
        df_input = pd.DataFrame([data])

        # Aplicar os mesmos encoders usados no treinamento
        df_input['gender'] = le_gender.transform([df_input.at[0, 'gender']])
        df_input['smoking_history'] = le_smoking.transform([df_input.at[0, 'smoking_history']])

        # Garantir a ordem correta das colunas
        df_input = df_input[feature_names]

        # Previsão
        prediction = modelo.predict(df_input)[0]
        probability = modelo.predict_proba(df_input)[0][prediction]

        # Decodificar a previsão
        diagnosis = 'Positive' if prediction == 1 else 'Negative'

        return jsonify({
            'diagnosis': diagnosis,
            'probability': round(float(probability), 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
