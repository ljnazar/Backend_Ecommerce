const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    product: String,
    quantity: String
}, {versionKey: false});

const cartModel = mongoose.model(cartCollection, cartSchema);

module.exports = cartModel;