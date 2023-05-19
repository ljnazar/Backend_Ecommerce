import { ticketModel } from '../models/ticketSchema.js';

export default class TicketMongooseDao {

    async create(newTicket) {
        const userDocument = await ticketModel.create(newTicket);
        return userDocument;
    }

    async getTicketById(id) {
        const idFound = await ticketModel.findOne({ _id: id }).lean();
        return idFound;
    }

}
