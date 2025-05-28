from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

groceries = []

@app.route('/groceries', methods=['GET', 'POST'])
def handle_groceries():
    if request.method == 'POST':
        data = request.get_json()
        groceries.append(data)
        return jsonify({"message": "Added!", "data": data}), 201
    return jsonify(groceries)

if __name__ == '__main__':
    app.run(debug=True)
