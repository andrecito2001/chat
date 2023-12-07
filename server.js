// server.js

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    io.emit('message', message); 
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(8080, '0.0.0.0', () => {
  console.log('Servidor escuchando en http://0.0.0.0:8080');
});

