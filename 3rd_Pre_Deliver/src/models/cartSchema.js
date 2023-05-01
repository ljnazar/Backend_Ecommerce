import mongoose, { Schema } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Products" },
            quantity: { type: Schema.Types.Number, required: true, default: 0 },
            _id: false
        }
    ]
}, {versionKey: false});

export const cartModel = mongoose.model(cartCollection, cartSchema);