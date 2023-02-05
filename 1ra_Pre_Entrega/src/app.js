const express = require('express');
const app = express();
require('dotenv').config();

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=> console.log('Server running on port 8080'));
server.on('error', error => console.log(error));