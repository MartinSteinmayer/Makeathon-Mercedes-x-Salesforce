import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false); // State to track request status
  const endOfMessagesRef = useRef(null);
  const [threadId, setThreadId] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    fetch('/api/new_thread')
      .then(response => response.json())
      .then(data => {
        setThreadId(data.thread_id);
        console.log('New thread ID:', data.thread_id);
      })
      .catch(error => {
        console.error('Error fetching new thread:', error);
      });
  }, []);


  // Send message when the user submits
  const sendMessage = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    if (input.trim() === '' || isSending) {
      return; // If input is empty or already sending, do nothing
    }
    setIsSending(true); // Set sending to true
    const userInput = input;
    setInput(''); // Clear input after sending
    setMessages((messages) => [...messages, { text: userInput, sender: 'user' }]);

    try {
      const response = await fetch('http://localhost:5000/api/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the messages state to include the bot's response
        setMessages((messages) => [...messages, { text: data.message, sender: 'bot' }]);
      } else {
        // Optionally handle HTTP errors here
        console.error('Server responded with non-2xx status');
      }
    } catch (error) {
      console.error('Request failed', error);
      // Optionally handle network errors here
    } finally {
      setIsSending(false); // Set sending to false regardless of response
    }
  };

  // Scroll to the last message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot">
      <h2>Michael Salesman</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </p>
        ))}
        <div ref={endOfMessagesRef}></div> {/* Invisible element to mark end of messages */}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isSending} // Disable input when sending
        />
        <button type="submit" disabled={isSending}>Send</button> {/* Disable button when sending */}
      </form>
    </div>
  );
}

export default Chatbot;