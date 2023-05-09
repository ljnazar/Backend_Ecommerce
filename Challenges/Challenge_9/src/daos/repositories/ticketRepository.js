import TicketDao from '../dtos/ticketDto.js';

const ticketDao = new TicketDao();

export default class TicketRepository {
    async createTicket(ticket) {
        const result = await ticketDao.createTicket(ticket);
        return result;
    }
}
