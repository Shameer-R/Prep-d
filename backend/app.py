from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

SPOONACULAR_API_KEY = os.getenv('SPOONACULAR_API_KEY')

groceries = []

url = 'https://api.spoonacular.com/recipes/findByIngredients'

def getMealFromRecipe():
    ingredient_list = ','.join(item['grocery_name'] for item in groceries)

    request_string = f"{url}?ingredients={ingredient_list}&number=10&apiKey={SPOONACULAR_API_KEY}"

    return request_string
    
@app.route('/meals', methods=['GET'])
def generate_meal():
    if request.method == 'GET':
        if not groceries:
            return jsonify({"error": "No groceries found"}), 400
        
        api_url = getMealFromRecipe()
    
        response = requests.get(api_url)
        
        if response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({"error": "Failed to fetch recipes"}), response.status_code


@app.route('/groceries', methods=['GET', 'POST'])
def handle_groceries():
    if request.method == 'POST':
        data = request.get_json()
        groceries.append(data)
        return jsonify({"message": "Added!", "data": data}), 201
    return jsonify(groceries)

if __name__ == '__main__':
    app.run(debug=True)
