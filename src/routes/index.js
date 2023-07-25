import { Router } from 'express';
import userRoute from './userRoute.js';
import adminUsersRoute from './adminUsersRoute.js';
import productsRoute from './productsRoute.js';
import cartRoute from './cartRoute.js';
import cookieParser from 'cookie-parser';

const mainRoute = Router();

mainRoute.use(cookieParser('PrivateKey'));

// MAIN ROUTE

mainRoute.use('/', userRoute);
mainRoute.use('/api/users', adminUsersRoute);
mainRoute.use('/api/products', productsRoute);
mainRoute.use('/api/cart', cartRoute);

export default mainRoute;