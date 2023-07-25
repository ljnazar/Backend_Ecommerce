import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getProducts,
    getOneProduct,
    //adminRender,
    createProductRender,
    updateProductRender,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productsController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
//import { mockProducts } from '../utils/mockProducts.js'

const productsRoute = Router();

productsRoute.get('/', authToken, getProducts);
productsRoute.get('/:pid', authToken, getOneProduct);
//productsRoute.get('/admin', authToken, isAdmin, adminRender);
productsRoute.get('/admin/createProduct', authToken, isAdmin, createProductRender);
productsRoute.get('/admin/updateProduct', authToken, isAdmin, updateProductRender);
productsRoute.post('/', authToken, isAdmin, createProduct);
productsRoute.put('/:pid', authToken, isAdmin, updateProduct);
productsRoute.delete('/:pid', authToken, isAdmin, deleteProduct);

// productsRoute.get('/mockingproducts', authToken, isAdmin, (req, res) => {
//     try {
//         const result = mockProducts();
//         res.status(200).send(result);
//     } catch (error) {
//         console.log(error);
//     }
// });

// productsRoute.get('/loggerTest', (req, res) => {
//     req.logger.debug('Este es un debug');
//     req.logger.http('http://localhost:8080/api/products/loggerTest');
//     req.logger.info('Ingreso en la ruta raiz');
//     req.logger.warn('Este es un warning');
//     req.logger.error('Este es un error');
//     req.logger.fatal('Este es un error fatal');
//     res.send('Ruta ok');
// });

export default productsRoute;