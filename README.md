# Mercedes-x-Salesforce Sales Assistant

## Installing Dependencies

### You will need npm, python and nodejs installed.

**IMPORTANT:** Make sure to grab the `OPENAI_API_KEY` from the presentation slides (applicable if you are a member of the makeathon).

## Prerequisites
To run the app, you will need to configure both the backend and frontend environments. Follow these instructions in two separate terminal windows.

### Terminal 1: Backend Setup

1. **Create a Virtual Environment**  
   Navigate to the source directory and run:  
   ```
   python3 -m venv flaskvenv
   ```

2. **Activate the Virtual Environment**  
   ```
   source flaskvenv/bin/activate
   ```

3. **Install Dependencies**  
   Install necessary libraries using npm:
   ```
   npm install openai flask-cors Flask
   ```

4. **Set Environment Variable**  
   Replace `your_key` with your actual API key:
   ```
   export OPENAI_API_KEY="your_key"
   ```

5. **Start the Backend Server**  
   Run the following command to launch the server:
   ```
   python3 flask-server/server.py
   ```

### Terminal 2: Frontend Setup

1. **Navigate to Client Directory**  
   ```
   cd client
   ```

2. **Install and Start the Frontend**  
   Install dependencies and start the frontend service:
   ```
   npm install
   npm start
   ```

## Accessing the Application

After completing the above steps, the app should be up and running at [http://localhost:3000/](http://localhost:3000/).

**Good luck finding the perfect car for your needs!**
