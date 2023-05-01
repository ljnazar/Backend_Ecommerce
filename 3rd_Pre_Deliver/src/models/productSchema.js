import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new Schema({
    title: { type: Schema.Types.String, unique: true, required: true, max: 30 },
    description: { type: Schema.Types.String, required: true, max: 100 },
    category: { type: Schema.Types.String, required: true, default: "general" },
    price: { type: Schema.Types.Number, required: true },
    thumbnail: Schema.Types.String,
    code: Schema.Types.String,
    stock: Schema.Types.String
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
