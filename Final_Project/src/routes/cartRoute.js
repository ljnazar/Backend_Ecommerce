import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getCart,
    addProduct,
    deleteProduct,
    cleanCart,
    //updateQuantityProduct
} from '../controllers/cartController.js';
import { purchaseProducts } from '../controllers/ticketController.js'

const cartRoute = Router();

cartRoute.get('/:cid', authToken, getCart);
cartRoute.post('/:cid/product/:pid', authToken, addProduct);
cartRoute.delete('/:cid/product/:pid', authToken, deleteProduct);
cartRoute.delete('/:cid', authToken, cleanCart);
//cartRoute.put('/:cid/product/:pid', authToken, updateQuantityProduct);
cartRoute.get('/:cid/purchase', purchaseProducts);

export default cartRoute;