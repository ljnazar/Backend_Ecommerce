import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getProducts,
    getOneProduct,
    createProductRender,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productsController.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const productsRoute = Router();

productsRoute.get('/', authToken, getProducts);
productsRoute.get('/:pid', authToken, getOneProduct);
productsRoute.get('/admin/createProduct', authToken, isAdmin, createProductRender);
productsRoute.post('/', authToken, isAdmin, createProduct);
productsRoute.put('/:pid', authToken, isAdmin, updateProduct);
productsRoute.delete('/:pid', authToken, isAdmin, deleteProduct);

export default productsRoute;