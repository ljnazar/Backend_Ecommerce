import mongoose, { Schema } from 'mongoose';

const ticketCollection = 'tickets';

const ticketSchema = new Schema({
    code: { type: Schema.Types.String, unique: true },
    purchase_datetime: { type: Schema.Types.Date, default: new Date() },
    amount: { type: Schema.Types.Number },
    purchaser: { type: Schema.Types.String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
