from flask import Flask, jsonify, request
import os
from flask_cors import CORS
from openai import OpenAI
import time

client = OpenAI()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

def wait_on_run(run, thread):
    while run.status == "queued" or run.status == "in_progress":
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id,
        )
        time.sleep(0.2)
    return run

def submit_message(assistant_id, thread, user_message):
    client.beta.threads.messages.create(
        thread_id=thread.id, role="user", content=user_message
    )
    return client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant_id,
    )


def get_response(thread):
    return client.beta.threads.messages.list(thread_id=thread.id, order="asc")

@app.route('/api/new_thread', methods=['GET'])
def new_thread():
    global thread
    thread = client.beta.threads.create()
    return jsonify({'thread_id': thread.id})

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
    return response

@app.route('/api/prompt', methods=['POST'])
def get_response():
    try:

        run = submit_message("asst_efvdvguie4T3QCDfEeFzZ5vR", thread, request.json['message'])
        
        completion = wait_on_run(run, thread)

        messages = client.beta.threads.messages.list(thread_id=thread.id)
        
        return jsonify({'message': messages.data[0].content[0].text.value})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)