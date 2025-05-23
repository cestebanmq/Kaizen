import { io, Socket } from 'socket.io-client';

// Ensure this URL matches your Socket.IO server address
const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:3001';

// Initialize the socket connection
// `autoConnect: false` means we'll need to call socket.connect() manually
// This is often preferred in React to control connection timing within effects
const socket: Socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ['websocket'], // Prefer WebSocket
});

// Optional: Log basic connection events globally for debugging
// These can also be handled per-component if more specific logic is needed

socket.on('connect', () => {
  console.log('Socket.IO: Connected to server, id:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Socket.IO: Disconnected from server, reason:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Socket.IO: Connection error:', error.message, error.cause);
  // Potentially log error.data for more details if the server sends them
  if (error.cause) {
    // @ts-ignore
    console.error('Socket.IO: Connection error data:', error.data);
  }
});

export default socket;
