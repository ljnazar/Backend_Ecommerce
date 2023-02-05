const express = require('express');
const app = express();
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
require('dotenv').config();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {});
});

app.post('/nuevoMensaje', (req, res) => {
    let { mensaje } = req.body;
    dataCompleta.push(mensaje);
    io.sockets.emit('messages', dataCompleta);
    res.send('Mensaje enviado');
})

let dataCompleta = [];

const PORT = process.env.PORT;

const httpServer = app.listen(PORT, () => console.log('Server running on port 8080'));
httpServer.on('error', error => console.log(error));

const io = new Server(httpServer);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    io.sockets.emit('messages', dataCompleta);

    socket.on('message', data => {
        dataCompleta.push(data);
        io.sockets.emit('messages', dataCompleta); 
    })
})