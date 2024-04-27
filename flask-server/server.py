from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import os

# Set the API key
client = OpenAI(
    api_key="sk-proj-fNlT2VdDMr5BDZxB9buST3BlbkFJYJzvYQet0MjRrqXLPND4",
)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/prompt', methods=['POST'])
def get_response():
    if request.is_json:
        user_message = request.json['message']
        response = client.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ],
        )
        return jsonify(response.choices[0].message['content'])
    else:
        return jsonify({"error": "Request was not JSON"}), 415

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
