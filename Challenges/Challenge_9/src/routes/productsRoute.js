import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getAllProducts,
    adminRender,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productsController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { mockProducts } from '../utils/mockProducts.js'

const productsRoute = Router();

productsRoute.get('/', authToken, getAllProducts);
productsRoute.get('/admin/products', authToken, isAdmin, adminRender);
productsRoute.post('/admin/products', authToken, isAdmin, createProduct);
productsRoute.put('/admin/products/:pid', authToken, isAdmin, updateProduct);
productsRoute.delete('/admin/products/:pid', authToken, isAdmin, deleteProduct);

productsRoute.get('/mockingproducts', authToken, isAdmin, (req, res) => {
    try {
        const result = mockProducts();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
});

export default productsRoute;