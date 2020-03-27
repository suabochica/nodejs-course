const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { generateMessage, generateLocationMessage } = require('./utils/message');
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/users');

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

    socket.on('JOIN', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });

        if (error) {
            callback(error);
        }

        socket.join(user.room);

        socket.emit('MESSAGE', generateMessage('Welcome to the jungle!'));
        socket.broadcast.to(user.room).emit('MESSAGE', generateMessage(`${user.username} has joined!`));

        callback();
    });

    socket.on('SEND_MESSAGE', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }

        io.to('This').emit('MESSAGE', generateMessage(message));
        callback();
    });

    socket.on('SEND_LOCATION', (latitude, longitude, callback) => {
        const url = `https://google.com/maps?q=${latitude},${longitude}`;

        io.emit('LOCATION_MESSAGE', generateLocationMessage(url));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('MESSAGE', generateMessage(`${user.username} has left`));
        }
    });
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});
