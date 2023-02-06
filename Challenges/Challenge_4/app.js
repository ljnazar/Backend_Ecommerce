const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);
const env = require('dotenv')
const handlebars = require('express-handlebars');

env.config();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', 'views');
app.set('view engine', 'handlebars');

let dataProducts = [];

app.get('/', (req, res) => {
    res.render('home', { data: dataProducts });
});

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts');
});

/* To develop with endpoints  */

// app.post('/addProduct', (req, res) => {
//     let product = req.body;
//     let productString = JSON.stringify(product);
//     dataProducts.push(productString);
//     io.sockets.emit('viewProducts', dataProducts);
//     res.send('Producto agregado');
// });
// app.delete('/deleteProduct/:idp', (req, res) => {
//     let { idp } = req.params;
//     let dataProductsObj = [];
//     dataProducts.map( product => {
//         let auxObj = JSON.parse(product);
//         dataProductsObj.push(auxObj);
//     });
//     dataProductsObj = dataProductsObj.filter(product => product.id != idp) || null;
//     dataProducts = [];
//     dataProductsObj.map( product => {
//         let auxString = JSON.stringify(product);
//         dataProducts.push(auxString);
//     });
//     io.sockets.emit('viewProducts', dataProducts);
//     res.send('Producto Eliminado');
// });

io.on('connection', socket => {

    console.log('a user connected');

    socket.emit('viewProducts', dataProducts);

    socket.on('addProduct', product => {
        dataProducts.push(product);
        io.sockets.emit('viewProducts', dataProducts);
    });

    socket.on('deleteProduct', product => {
        dataProducts = dataProducts.filter(element => element != product) || null;
        io.sockets.emit('viewProducts', dataProducts);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
});

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));