from flask import Flask, request, jsonify
import joblib
import numpy as np

# Inicializa a aplicação Flask
app = Flask(__name__)

# Carrega o modelo treinado
modelo = joblib.load('modelo_diabetes.pkl')

# Lista das features esperadas (ordem importa!)
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
        # Extrai os valores das features na ordem correta
        input_data = [data[feature] for feature in features]
        input_array = np.array(input_data).reshape(1, -1)
        # Realiza a predição
        prediction = modelo.predict(input_array)[0]
        return jsonify({'diagnostico': int(prediction)})
    except Exception as e:
        return jsonify({'erro': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
