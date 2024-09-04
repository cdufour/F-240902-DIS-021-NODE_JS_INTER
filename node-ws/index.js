const http = require('http');
const express = require('express');
const app = express();
const PORT = 3200;

// socket.io
// prérequis pour du socket.io
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', () => {
    console.log('Nouveau client connecté au socket');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(PORT, () => {
    console.log('Server running on ' + PORT + '...')
})