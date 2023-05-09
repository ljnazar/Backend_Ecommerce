import { ticketModel } from '../models/ticketSchema.js';

export default class TicketDao {
    async createTicket(ticket) {
        const newTicket = await ticketModel.create(ticket);
        return newTicket;
    }
}
