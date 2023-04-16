import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

export default productModel;