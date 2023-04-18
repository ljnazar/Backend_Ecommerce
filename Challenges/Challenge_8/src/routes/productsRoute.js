import { Router } from 'express';
import { authToken } from '../utils/jwt.js';
import { 
    getAllProducts
} from '../controllers/productsController.js';

const userRoute = Router();

// DATOS

userRoute.get('/', authToken, getAllProducts);

export default userRoute;