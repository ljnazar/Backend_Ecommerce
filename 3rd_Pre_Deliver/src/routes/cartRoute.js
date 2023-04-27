import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getCart,
    addProductToCart,
    deleteProductInCart,
    cleanCart,
    updateQuantityProduct
} from '../controllers/cartController.js';

const cartRoute = Router();

cartRoute.get('/:cid', authToken, getCart);

cartRoute.post('/:cid/product/:pid', authToken, addProductToCart);

cartRoute.delete('/:cid/product/:pid', authToken, deleteProductInCart);

cartRoute.delete('/:cid', authToken, cleanCart);

cartRoute.put('/:cid/product/:pid', authToken, updateQuantityProduct);

export default cartRoute;