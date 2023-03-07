const express = require('express');
const app = express();
const env = require('dotenv');
const productRouter = require('./routers/product.router');
const cartRouter = require('./routers/cart.router');
const mongoose = require('mongoose');

env.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);
app.use('/carts', cartRouter);

mongoose.set("strictQuery", false);

const MONGOOSE_API_KEY = process.env.MONGOOSE_API_KEY;
mongoose.connect(MONGOOSE_API_KEY, (error) => {
    if(error){
        console.log("Cannot connect to database: " + error);
        process.exit();
    }
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log('Server running on port 8080'));
server.on('error', error => console.log(error))



