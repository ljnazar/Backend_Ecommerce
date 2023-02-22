const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);
const env = require('dotenv');
const handlebars = require('express-handlebars');
const messageRouter = require('./routers/message.router');
const productRouter = require('./routers/product.router');
const cartRouter = require('./routers/cart.router');
const mongoose = require('mongoose');
const messageModel = require('./models/message.model');

env.config();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views');
app.set('view engine', 'handlebars');

app.use('/messages', messageRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

const MONGOOSE_API_KEY = process.env.MONGOOSE_API_KEY;
mongoose.connect(MONGOOSE_API_KEY, (error) => {
    if(error){
        console.log("Cannot connect to database: " + error);
        process.exit();
    }
});

io.on('connection', socket => {

    console.log('a user connected');

    (async () => {

        let messagesCurrently = await messageModel.find();
        socket.emit('viewMessages', messagesCurrently);

        socket.on('sendMessage', async data => {
            let { user, message } = data;
            if(!user || !message) return res.send({ status: "Error", error: "Incomplete values"});
            try{
                await messageModel.create({
                    user,
                    message
                });
            }
            catch(error){
                console.log(`Cannot send message to mongoose ${error}`);
            }
            let messagesCurrently = await messageModel.find();
            io.sockets.emit('viewMessages', messagesCurrently);
        });
    })();

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
});

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));




