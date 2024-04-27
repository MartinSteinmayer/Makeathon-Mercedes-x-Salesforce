import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null); 


  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Send message when the user submits
  const sendMessage = async (event) => {
    event.preventDefault();  // Prevent the form from refreshing the page
    try {
        if (input.trim() === '') {
            return;
        }
        const userInput = input;
        setInput('');  // Clear input after sending
        setMessages([...messages, { text: userInput, sender: 'user' }]);
        
        const response = await fetch('http://localhost:5000/api/prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userInput })
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Handle the data received from the server
        } else {
          throw new Error('Server responded with non-2xx status');
        }
      } catch (error) {
        console.error('Request failed', error);
      }
};

/*
  // Simulate a bot response
  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === 'user') {
      setTimeout(() => {
        setMessages(msgs => [...msgs, { text: "Let's pretend I understood that.", sender: 'bot' }]);
      }, 1000);  // Simulate response delay
    }
  }, [messages]);*/

  // Scroll to the last message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot">
      <h2>Chatbot</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </p>
        ))}
        <div ref={endOfMessagesRef}></div>  {/* Invisible element to mark end of messages */}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
