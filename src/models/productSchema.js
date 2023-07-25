import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new Schema({
    title: { type: Schema.Types.String, unique: true, required: true},
    description: { type: Schema.Types.String, required: true},
    category: { type: Schema.Types.String, required: true, default: 'general' },
    price: { type: Schema.Types.Number, required: true },
    thumbnail: { type: Schema.Types.String, default: 'https://www.maricopa-sbdc.com/wp-content/uploads/2020/11/image-coming-soon-placeholder-768x768.png' },
    code: { type: Schema.Types.String, unique: true },
    stock: { type: Schema.Types.Number, required: true },
    creator: { type: Schema.Types.String, required: true },
    premium: { type: Schema.Types.Boolean, required: true }
}, {versionKey: false});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);
