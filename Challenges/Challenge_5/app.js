const express = require('express');
const app = express();
// const http = require('http');
// const httpServer = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(httpServer);
const env = require('dotenv');
const handlebars = require('express-handlebars');
const messageRouter = require('./routers/message.router');
const mongoose = require('mongoose');

env.config();

//app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views');
app.set('view engine', 'handlebars');

app.use('/api/messages', messageRouter);


//const messageModel = require('./models/message.model');


// app.get('/api/messages', async (req, res) => {
//     try{
//         let messages = await messageModel.find();
//         io.sockets.emit('viewProducts', messages);
//         //res.render('home', { data: messages });
//         res.render('chat');
//         //res.send({ status: "success", payload: messages });
//     }
//     catch(error){
//         console.log(`Cannot get messages with mongoose ${error}`);
//     }
// });

const MONGOOSE_API_KEY = process.env.MONGOOSE_API_KEY;
mongoose.connect(MONGOOSE_API_KEY, (error) => {
    if(error){
        console.log("Cannot connect to database: " + error);
        process.exit();
    }
});

//dataMessage = [];

// io.on('connection', socket => {

//     console.log('a user connected');

//     // (async () => {

//     //     let messages = await messageModel.find();

//     //     console.log(messages);

//     //     socket.emit('viewMessages', messages);

//     //     // socket.on('sendMessage', message => {
//     //     //     dataMessage.push(message);
//     //     //     io.sockets.emit('viewMessages', messages);
//     //     // });

//     // })();



//     // socket.on('deleteProduct', product => {
//     //     dataProducts = dataProducts.filter(element => element != product) || null;
//     //     io.sockets.emit('viewProducts', dataProducts);
//     // });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
    
// });

const PORT = process.env.PORT || 8080;
//httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const server = app.listen(PORT, ()=> console.log('Server running on port 8080'));
server.on('error', error => console.log(error));




