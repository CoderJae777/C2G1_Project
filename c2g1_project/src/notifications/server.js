const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('WebSocket server is running');
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  // Simulate sending a new workshop request notification
  setInterval(() => {
    const message = JSON.stringify({ type: 'newRequest', data: { workshop: "New Workshop" } });
    ws.send(message);
  }, 60000); // send every 10 seconds for demo purposes

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
