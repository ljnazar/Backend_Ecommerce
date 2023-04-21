import { Router } from 'express';
import userRouter from './userRoute.js'
import productsRoute from './productsRoute.js'
import cookieParser from 'cookie-parser';

const mainRoute = Router();

mainRoute.use(cookieParser('PrivateKey'));

// MAIN ROUTE

mainRoute.use('/', userRouter);
mainRoute.use('/home', productsRoute);


export default mainRoute;