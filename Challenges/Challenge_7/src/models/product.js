const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    price: String,
    thumbnail: String,
    code: String,
    stock: String
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

module.exports = productModel;