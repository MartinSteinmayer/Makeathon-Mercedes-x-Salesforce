from flask import Flask, jsonify, request
import os
from flask_cors import CORS

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
    # Send hello as message
    return jsonify({'message': 'Hello!'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
