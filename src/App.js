// App.js
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatUsRef = useRef(null);
  const inputMessageRef = useRef(null);

  const socket = io('http://172.25.233.247:8080', {
    transports: ['websocket'],
  });

  const updateScroll = () => {
    if (chatUsRef.current) {
      chatUsRef.current.scrollTop = chatUsRef.current.scrollHeight;
    }
  };

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

    updateScroll();

    return () => {
      socket.disconnect();
    };

  }, [messages, socket]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', inputMessage);
      setMessages([...messages, { user: 'me', message: inputMessage }]);
      updateScroll();
      setInputMessage('');
      if (inputMessageRef.current) {
        inputMessageRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='App-body'>
      <div className='App-men'>
        <div className='mensaje1'>
          <img 
            src='/us1.png'
          />
          <div className='texto'>
            <div className='titulo'>
              Nombre Usuario
            </div>
            <div className='subtitulo'>
              En línea
            </div>
          </div>
        </div>
        {Array.from({ length: 2 }, (_, index) => (
        <div className='mensaje2' key={index}>
          <img 
            src='/us1.jpeg'
          />
          <div className='texto'>
            <div className='titulo'>
              Nombre Usuario {index + 2}
            </div>
            <div className='subtitulo'>
              Hace {index + 40} min
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className='App-chat'>
        <div className='infChat'>
          <img
            src='/us1.jpeg'
          />
          <div>
            <h1>Nombre Usuario</h1>
            <h2>En línea</h2>
          </div>
        </div>
        <div className='chatUs' ref={chatUsRef}>
          {messages.map((message, index) => (
            <div className={message.user === 'me' ? 'chat1' : 'chat2'} key={index}>
              {message.user === 'me' ? (
                <>
                  <div>{message.message}</div>
                  <img src='/us1.jpeg' alt='User' />
                </>
              ) : (
                <>
                  <img src='/us2.jpeg' alt='User' />
                  <div>{message}</div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className='textBox'>
          <input
            ref={inputMessageRef}
            type='text'
            placeholder='Mensaje...'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={sendMessage}>
            <img
              src='/enviar.png'
              className='d-icon'
            />
            <img
              src='/enviar2.png'
              className='h-icon'
            />
          </button>
        </div>
      </div>
      <div className='App-us'>
      </div>
    </div>
  );
};

export default ChatApp;
