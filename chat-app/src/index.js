const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

// let count = 0;

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New web socket connection');
    // socket.emit('COUNT_UPDATED', count);

    // socket.on('COUNT_INCREMENTED', () => {
    //     count++;
    //     socket.emit('COUNT_UPDATED', count)
    //     io.emit('COUNT_UPDATED', count);
    // });

    io.emit('WELCOME_MESSAGE', 'Welcome to the jungle!');
    socket.broadcast.emit('MESSAGE', 'A new user has joined!');

    socket.on('SEND_MESSAGE', (message) => {
        io.emit('MESSAGE', message);
    });

    socket.on('disconnect', () => {
        io.emit('MESSAGE', 'A user has left!');
    });
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});
