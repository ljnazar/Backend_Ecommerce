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

const productsRoute = Router();

productsRoute.get('/', authToken, getAllProducts);

productsRoute.get('/admin', authToken, isAdmin, adminRender);

productsRoute.post("/admin", authToken, isAdmin, createProduct);

productsRoute.put("/admin/:pid", authToken, isAdmin, updateProduct);

productsRoute.delete("/admin/:pid", authToken, isAdmin, deleteProduct);

export default productsRoute;