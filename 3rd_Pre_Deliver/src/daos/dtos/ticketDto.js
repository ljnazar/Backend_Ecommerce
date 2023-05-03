export default class TicketDto {
    constructor({ code, purchase_dateTime, amount, purcharser, products }) {
        this.code = code;
        this.purchase_dateTime = purchase_dateTime;
        this.amount = amount;
        this.purcharser = purcharser;
        this.products = products;
    }
}
