import mongoose, { Schema } from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = new Schema({
    code: { type: Schema.Types.String, unique: true },
    purchase_datetime: { type: Schema.Types.Date, default: new Date() },
    amount: { type: Schema.Types.Number },
    purchaser: { type: Schema.Types.String, required: true },
    //products: [{ type: Schema.Types.ObjectId, ref: 'products' }], // Ver de reemplazar por cart y agregarle ref
    products: [
        {
            product: { type: Schema.Types.ObjectId, required: true, ref: 'products' },
            quantity: { type: Schema.Types.Number, required: true },
            _id: false
        }
    ]
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
