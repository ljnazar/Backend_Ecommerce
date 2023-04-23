import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productsController.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const productsRoute = Router();

productsRoute.get('/', authToken, getAllProducts);

productsRoute.post("/", authToken, isAdmin, createProduct);

productsRoute.put("/:pid", authToken, isAdmin, updateProduct);

productsRoute.delete("/:pid", authToken, isAdmin, deleteProduct);

export default productsRoute;