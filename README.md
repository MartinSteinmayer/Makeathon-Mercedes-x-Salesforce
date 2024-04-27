# Makeathon-Mercedes-x-Salesforce

## Setup

### Installing Dependencies

You will need npm, python and nodejs installed.

### Running The App

To run the app you will need to open two terminals:

1 - Backend: In the source directory, run "python -m venv flaskvenv" then "source flaskvenv/bin/activate" to initiate the Virtual Environment. Before running the backend, get the OpenAI api key and run "export OPENAI_API_KEY="your_key". To run the backend run "python3 (or python) flask-server/server.py". The Virtual Environment should already have the necessary dependencies, but if not, just download the ones missing.

2 - Frontend: Go to the "client" directory and run "npm install" and then "npm start".

After these steps the app should be up and running in http://localhost:3000/
