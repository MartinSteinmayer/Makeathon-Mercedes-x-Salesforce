from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/members')
def hello_world():
    return {
        "members": [
            {
                "name": "John",
                "age": 30
            },
            {
                "name": "Jane",
                "age": 26
            },
            {
                "name": "Joe",
                "age": 32
            }
        ]
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

