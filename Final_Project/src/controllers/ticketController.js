import CartService from '../services/cartService.js';
import ProductService from '../services/productService.js';
import TicketService from '../services/ticketService.js';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/sendEmail.js'

const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketService()

export const purchaseProducts = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.params);
        
        if(cart.products.length){

            let ticket
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
    
                    await cartService.deleteProduct(
                        req.params,
                        cart.products[index].product._id
                    );
                }
            }
    
            if (productsTicket.length) {
                ticket = await ticketService.create({
                    code: uuidv4(),
                    purchase_datetime: new Date(),
                    amount: totalPrice,
                    purchaser: req.session.email,
                    products: productsTicket,
                });
                const email = req.session.email;
                let contentEmail = `
                    <div>
                        <h4>
                            Detalle de compra:
                        </h4>
                        <p>
                            ${ticket}
                        </p>
                    </div>`
                await sendEmail(
                    email, 
                    'Ticket de compra', 
                    contentEmail
                );
            }
    
            res.status(201).send({ status: "success", payload: ticket });

        }
        else{
            res.status(404).send({ status: "Error", message: 'No existen productos' });
        }
    } catch (error) {
        next(error);
    }
};

