import TicketRepository from '../daos/repositories/ticketRepository.js'

const ticketRepository = new TicketRepository();

export const createTicketService = async (ticket) => {
    try {
        console.log(ticket);
        const newTicket = await ticketRepository.createTicket(ticket);
        return newTicket;
    } catch (error) {
        throw Error(error);
    }
};