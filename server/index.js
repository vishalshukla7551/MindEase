const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://mind-ease-fawn.vercel.app','http://localhost:3000'], // Frontend
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('send_message', (data) => {
    io.emit('receive_message', {
      id: socket.id,
      message: data.message,
      timestamp: new Date().toISOString(),
    });
    console.log(data.message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Socket.IO server running on http://localhost:4000');
});
