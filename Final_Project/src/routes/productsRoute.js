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

productsRoute.get('/loggerTest', (req, res) => {
    req.logger.debug('Este es un debug');
    req.logger.http('http://localhost:8080/home/loggerTest');
    req.logger.info('Ingreso en la ruta raiz');
    req.logger.warn('Este es un warning');
    req.logger.error('Este es un error');
    req.logger.fatal('Este es un error fatal');
    res.send('Ruta ok');
});

export default productsRoute;