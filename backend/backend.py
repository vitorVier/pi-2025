from flask import Flask, request, jsonify
import requests  # Para enviar dados à sua API externa

app = Flask(__name__)

# Dados processados (simulando um banco de dados local)
processed_data = []

# SUA API EXTERNA (substitua pela URL real)
EXTERNAL_API_URL = "https://sua-api.com/receive-data"

@app.route('/')
def home():
    return "Servidor de processamento rodando! Acesse /process para enviar dados."

@app.route('/process', methods=['POST'])
def process_data():
    """
    Recebe dados brutos, processa e envia para a API externa.
    Exemplo de requisição (POST):
    {
        "data": [1, 2, 3, 4]
    }
    """
    try:
        # Passo 1: Receber os dados brutos
        raw_data = request.json.get('data', [])
        
        if not raw_data:
            return jsonify({"error": "Dados não fornecidos"}), 400

        # Passo 2: Processar os dados (exemplo: calcular média)
        processed_result = {
            "media": sum(raw_data) / len(raw_data),
            "soma": sum(raw_data),
            "tamanho": len(raw_data)
        }

        # Passo 3: Salvar localmente (opcional)
        processed_data.append(processed_result)

        # Passo 4: Enviar para sua API externa
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)