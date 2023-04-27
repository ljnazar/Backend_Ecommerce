import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
            quantity: { type: Number, required: true, default: 0 },
            _id: false
        }
    ]
}, {versionKey: false});

export const cartModel = mongoose.model(cartCollection, cartSchema);