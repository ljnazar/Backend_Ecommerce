const mongoose = require('mongoose');

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    code: String,
    stock: String
}, {versionKey: false});

const productModel = mongoose.model(productCollection, productSchema);

module.exports = productModel;