const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log("Started listening on port " + PORT);
});

const io = require('socket.io')(server);


app.get('/', (req, res) =>
    res.send("Welcome to Flutter Socket"))

io.on('connection', (client) => {
    console.log(`User ${client.id} is connected to Flutter`);
    client.emit('message', 'Hello, this is Nodejs in Flutter')
    //client.broadcast.emit('message', 'Flutter');
    //client.emit('message', 'Nodejs is now connected to Flutter')

    client.on('send', (data) => {
        client.broadcast.emit('message', data);
    })
})
