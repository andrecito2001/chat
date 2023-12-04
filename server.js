// server.js

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000", // Ajusta la URL de tu aplicación React
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
    io.emit('message', message); // Envía el mensaje a todos los clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(8080, () => {
  console.log('Servidor escuchando en http://localhost:8080');
});
