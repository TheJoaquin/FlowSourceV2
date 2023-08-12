from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

app = Flask(__name__)
#CORS(app)

app = Flask(__name__, static_folder='../', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('first-diagram.html')

@app.route('/run-rust', methods=['POST'])
def run_rust_code():
    try:
        data = request.get_json()
        code = data.get('code')

        with open('user_code.rs', 'w') as f:
            f.write(code)

        try:
            # Compilar
            compile_result = subprocess.run(['rustc', 'user_code.rs'], capture_output=True, text=True, timeout=10)

            # Ejecutar si la compilación tuvo éxito
            if compile_result.returncode == 0:
                execute_result = subprocess.run(['./user_code'], capture_output=True, text=True, timeout=10)
                return jsonify({'output': execute_result.stdout})
            else:
                return jsonify({'output': compile_result.stderr})

        except subprocess.TimeoutExpired:
            return jsonify({'output': 'Error: Tiempo de ejecución excedido'})
    except Exception as e:
        # Captura cualquier error y devuélvelo en formato JSON
        return jsonify({'error': str(e)}), 500
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
