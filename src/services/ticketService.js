import TicketMongooseDao from '../daos/ticketMongooseDao.js'

export default class TicketService {

    constructor() {
        this.ticketMongooseDao = new TicketMongooseDao();
    }

    async create(newTicket) {
        const ticketDocument = await this.ticketMongooseDao.create(newTicket);
        return ticketDocument;
    }

    async getTicketById(id) {
        const ticketDocument = await this.ticketMongooseDao.getTicketById(id);
        return ticketDocument;
    }

}
