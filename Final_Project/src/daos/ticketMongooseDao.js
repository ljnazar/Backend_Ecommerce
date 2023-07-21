import { ticketModel } from '../models/ticketSchema.js';

export default class TicketMongooseDao {

    async create(newTicket) {
        const ticketDocument = await ticketModel.create(newTicket);
        return ticketDocument;
    }

    async getTicketById(id) {
        const ticketDocument = await ticketModel.findOne({ _id: id }).populate('products.product');
        return ticketDocument;
    }

}
