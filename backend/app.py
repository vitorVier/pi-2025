from flask import Flask, request, jsonify
import joblib
import numpy as np
from db import salvar_relatorio, obter_total_diagnosticos

app = Flask(__name__)
modelo = joblib.load('modelo_diabetes.pkl')

features = [
    'age', 'gender', 'hypertension', 'heart_disease', 'smoking_history',
    'bmi', 'HbA1c_level', 'blood_glucose_level'
]

@app.route('/')
def home():
    return 'API de Previsão de Diabetes está online!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = [data[feature] for feature in features]
        input_array = np.array(input_data).reshape(1, -1)
        prediction = modelo.predict(input_array)[0]

        # Atualiza contador de diagnósticos e salva
        total = obter_total_diagnosticos() + 1
        salvar_relatorio(total)

        return jsonify({'diagnostico': int(prediction)})
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

@app.route('/relatorio', methods=['GET'])
def relatorio():
    total = obter_total_diagnosticos()
    return jsonify({'total_diagnosticos': total})

if __name__ == '__main__':
    app.run(debug=True)
