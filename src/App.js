// App.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('http://localhost:8080', {
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conexión establecida');
    });

    socket.on('message', (message) => {
      const newMessages = [...messages, message];
      setMessages(newMessages);
    });

    socket.on('disconnect', () => {
      console.log('Conexión cerrada');
    });

    return () => {
      socket.disconnect();
    };
  }, [messages, socket]);

  const sendMessage = () => {
    socket.emit('message', inputMessage);
    setInputMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default ChatApp;
