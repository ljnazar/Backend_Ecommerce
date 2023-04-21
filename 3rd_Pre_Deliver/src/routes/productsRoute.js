import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getAllProducts
} from '../controllers/productsController.js';
import isAdmin from '../middlewares/isAdmin.js';

const userRoute = Router();

// DATOS

userRoute.get('/', authToken, getAllProducts);

export default userRoute;