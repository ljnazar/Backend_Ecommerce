const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    idProduct: Number,
    products: [
        {
            product: String,
            quantity:Number
        }
    ]
}, {versionKey: false});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;