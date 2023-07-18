import mongoose, { Schema } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
            quantity: { type: Schema.Types.Number, required: true },
            _id: false
        }
    ]
}, {versionKey: false});

export const cartModel = mongoose.model(cartCollection, cartSchema);