import { Router } from 'express';
import userRoute from './userRoute.js'
import productsRoute from './productsRoute.js'
import cartRoute from './cartRoute.js'
import cookieParser from 'cookie-parser';

const mainRoute = Router();

mainRoute.use(cookieParser('PrivateKey'));

// MAIN ROUTE

mainRoute.use('/', userRoute);
mainRoute.use('/home', productsRoute);
mainRoute.use('/cart', cartRoute);

export default mainRoute;