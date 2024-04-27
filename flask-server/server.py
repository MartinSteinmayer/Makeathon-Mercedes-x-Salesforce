from flask import Flask, jsonify, request
import os
from flask_cors import CORS
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
    return response

@app.route('/api/prompt', methods=['POST'])
def get_response():
    try:
        completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
            {"role": "user", "content": request.json["message"]}
        ]
        )
        return jsonify({'message': completion.choices[0].message.content})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)