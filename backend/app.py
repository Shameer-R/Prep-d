from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

SPOONACULAR_API_KEY = os.getenv('SPOONACULAR_API_KEY')

groceries = []

url = 'https://api.spoonacular.com/recipes/findByIngredients'

def getMealFromRecipe():
    ingredient_list = ','.join(item['grocery_name'] for item in groceries)

    request_string = f"{url}?ingredients={ingredient_list}&number=10&apiKey={SPOONACULAR_API_KEY}"

    print(request_string)

@app.route('/groceries', methods=['GET', 'POST'])
def handle_groceries():
    if request.method == 'POST':
        data = request.get_json()
        groceries.append(data)
        getMealFromRecipe()
        return jsonify({"message": "Added!", "data": data}), 201
    return jsonify(groceries)

if __name__ == '__main__':
    app.run(debug=True)
