import CartService from '../services/cartService.js';
import ProductService from '../services/productService.js';
import { createTicketService } from '../services/ticketService.js';
import { uuid } from 'uuidv4';
import sendMail from '../utils/sendMail.js'

const cartService = new CartService();
const productService = new ProductService();

export const purchaseProducts = async (req, res) => {
    try {
        let ticket;
        let bodyMail;
        const cart = await cartService.getCart(req.params);

        let totalPrice = 0;
        const productsTicket = [];

        for (let index = 0; index < cart.products.length; index++) {
        if (cart.products[index].quantity <= cart.products[index].product.stock) {
            totalPrice += cart.products[index].product.price;
            const product = await productService.getOne(
            cart.products[index].product._id
            );

            product.stock = product.stock - cart.products[index].quantity;

            await product.save();

            productsTicket.push(product);

            await cartService.deleteProductInCart(
            req.params.cid,
            cart.products[index].product._id
            );
        }
        }

        if (productsTicket.length) {
            ticket = await createTicketService({
                code: uuid(),
                purchase_datetime: new Date(),
                amount: totalPrice,
                purchaser: req.session.email,
                products: productsTicket,
            });
            bodyMail = sendMail(
                ticket,
                req.session.email,
                "http://localhost:8080/payment"
            );
        }

        res.status(201).send({ status: "success", payload: ticket });

    } catch (error) {
        res.status(404).send({ status: "error", message: error.message });
    }
};

