const express = require('express');
const app = express();

const productsRouter = require('./routes/products');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);

const server = app.listen(8080, ()=> console.log('Server running on port 8080'));
server.on('error', error => console.log(error));