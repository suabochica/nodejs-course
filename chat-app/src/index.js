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

        socket.emit('MESSAGE', generateMessage('Admin', 'Welcome to the jungle!'));
        socket.broadcast.to(user.room).emit('MESSAGE', generateMessage('Admin', `${user.username} has joined!`));
        io.to(user.room).emit('ROOM_DATA', {
            room: user.room,
            users: getUsersInRoom(user.room),
        });

        callback();
    });

    socket.on('SEND_MESSAGE', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed');
        }

        io.to(user.room).emit('MESSAGE', generateMessage(user.username, message));
        callback();
    });

    socket.on('SEND_LOCATION', (latitude, longitude, callback) => {
        const user = getUser(socket.id);
        const url = `https://google.com/maps?q=${latitude},${longitude}`;

        io.to(user.room).emit('LOCATION_MESSAGE', generateLocationMessage(user.username, url));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('MESSAGE', generateMessage(user.username, `${user.username} has left`));
            io.to(user.room).emit('ROOM_DATA', {
                room: user.room,
                users: getUsersInRoom(user.room),
            });
        }
    });
});

server.listen(port, () => {
    console.log('Server is up on port 3000');
});
