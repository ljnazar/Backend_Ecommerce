const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);
const env = require('dotenv')

env.config();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/nuevoMensaje', (req, res) => {
    let { mensaje } = req.body;
    dataCompleta.push(mensaje);
    io.sockets.emit('messages', dataCompleta);
    res.send('Mensaje enviado');
})

let dataCompleta = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', data => {
        dataCompleta.push(data);
        io.sockets.emit('messages', dataCompleta); 
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));