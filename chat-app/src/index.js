const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

// server (emit) -> client (receive) - COUNT_UPDATED
// client (emit) -> server (receive) - INCREMENT

io.on('connection', () => {
    console.log('New web socket connection');
    socket.emit('COUNT_UPDATED', count);

    socket.on('COUNT_INCREMENTED', () => {
        count ++;
        // socket.emit('COUNT_UPDATED', count)
        io.emit('COUNT_UPDATED', count);
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});
