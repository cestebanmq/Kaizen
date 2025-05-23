import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
// Allow all origins for simplicity in this example.
// For production, configure specific origins: app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development. Restrict in production.
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

io.on('connection', (socket: Socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for a custom message from a client
  socket.on('client_message', (msg: string) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    // Broadcast the message to all other clients
    socket.broadcast.emit('server_message', { id: socket.id, message: msg });
  });

  // Listen for cursor position updates
  socket.on('cursor_position', (position: { x: number; y: number }) => {
    // console.log(`Cursor position from ${socket.id}: ${position.x}, ${position.y}`);
    // Broadcast cursor position to other clients
    socket.broadcast.emit('cursor_update', { id: socket.id, position });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    // Optionally, broadcast a user_disconnected event
    socket.broadcast.emit('user_disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
