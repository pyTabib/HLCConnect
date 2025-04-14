import { WebSocket } from 'ws';

// Create WebSocket connection
const socket = new WebSocket('ws://localhost:5000/ws');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established');
  
  // Authenticate as our newly created user
  socket.send(JSON.stringify({
    type: 'auth',
    userId: 2  // this is the ID of our newuser
  }));
  
  // After 1 second, send a test message
  setTimeout(() => {
    socket.send(JSON.stringify({
      type: 'message',
      recipientId: 1, // sending to user ID 1 (the test user from storage)
      content: 'Hello from WebSocket test script!'
    }));
  }, 1000);
});

// Listen for messages
socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
});

// Handle errors
socket.addEventListener('error', (event) => {
  console.error('WebSocket Error:', event);
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed', event.code, event.reason);
});

// Keep the process running for a bit
setTimeout(() => {
  socket.close();
  console.log('Test completed, closing connection');
}, 5000);