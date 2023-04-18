import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { authToken } from '../utils/jwt.js';
import { 
    mainUrl, 
    loginUrl, 
    loginUser, 
    loginUserError, 
    registerUrl, 
    createUser, 
    createUserError,
    getAllProducts, 
    logoutUser, 
    restoreUrl, 
    restorePassword,
    sessionGithub
} from '../controllers/userController.js';

const userRoute = Router();

userRoute.use(cookieParser('PrivateKey'));

// MAIN ROUTE

userRoute.get('/', mainUrl);

// LOGIN

userRoute.get('/login', loginUrl);

userRoute.post('/login', passport.authenticate('login'), loginUser);

userRoute.get('/faillogin', loginUserError);

// REGISTER

userRoute.get('/register', registerUrl);

userRoute.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}), createUser);

userRoute.get('/failregister', createUserError);

// DATOS

userRoute.get('/home', authToken, getAllProducts);

// LOGOUT

userRoute.get('/logout', logoutUser);

// RESET PASSWORD

userRoute.get('/restaurarPassword', restoreUrl);

userRoute.post('/restaurarPassword', restorePassword);

// LOGIN GITHUB

userRoute.get('/api/sessions/github', passport.authenticate('github'));

userRoute.get('/api/sessions/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), sessionGithub);

export default userRoute;