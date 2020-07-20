const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {userJoin, getCurrentUser, userLeave, getUsers, getCards, shuffle} = require('./users.js');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New user connected');
    socket.on('joined', (name) => {
        console.log(name + ' joined the game.');
        const cards = getCards();
        let card = -1;
        do {
            card = Math.floor(Math.random() * 52);
        } while(cards.includes(card));
        const user = userJoin(socket.id, name, card);
        const users = getUsers();
        socket.emit('newPlayer', {name:name, users:users});
        socket.broadcast.emit('updatePlayers', users);
    });

    socket.on('reshuffle', () => {
        shuffle();
        const users = getUsers();
        io.emit('updatePlayers', users);
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user) {
            console.log(user.name + ' left the game.');
            io.emit('updatePlayers', getUsers());
        }
    })
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
