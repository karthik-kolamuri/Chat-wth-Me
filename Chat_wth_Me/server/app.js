const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const sockets = new Set();//here we used set to store the socket ids...

const server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use(cors());
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));

function onConnect(socket) {
    console.log("New user connected");
    console.log(socket.id);
    sockets.add(socket.id); // Add socket ID to the set
    console.log([...sockets]);

    io.emit('number-client', sockets.size); // Emit the number of connected users

    socket.on('disconnect', () => onDisconnect(socket));
    socket.on('sendMessage', (message) => {
        console.log(`Message received: ${message}`);
        // Ensuree the message is sent as a string or JSON object
        io.emit('receiveMessage', typeof message === 'string' ? message : JSON.stringify(message));
    });
}

io.on('connection', onConnect);

function onDisconnect(socket) {
    sockets.delete(socket.id); // Remove socket ID from the Set
    console.log(`User disconnected: ${socket.id}`);
    io.emit('number-client', sockets.size); // Emit the updated user count
}
