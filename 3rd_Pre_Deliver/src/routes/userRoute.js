import { Router } from 'express';
//import passport from 'passport';
import { 
    mainRender, 
    loginRender, 
    loginUser, 
    loginUserError, 
    registerRender, 
    createUser, 
    createUserError,
    logoutUser, 
    restoreRender, 
    restorePassword,
    //sessionGithub
} from '../controllers/userController.js';

const userRoute = Router();

// MAIN ROUTE

userRoute.get('/', mainRender);

// LOGIN

userRoute.get('/login', loginRender);

//userRoute.post('/login', passport.authenticate('login'), loginUser);
userRoute.post('/login', loginUser);

userRoute.get('/faillogin', loginUserError);

// REGISTER

userRoute.get('/register', registerRender);

//userRoute.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}), createUser);
userRoute.post('/register', createUser);

userRoute.get('/failregister', createUserError);

// LOGOUT

userRoute.get('/logout', logoutUser);

// RESET PASSWORD

userRoute.get('/restaurarPassword', restoreRender);

userRoute.post('/restaurarPassword', restorePassword);

// LOGIN GITHUB

//userRoute.get('/api/sessions/github', passport.authenticate('github'));

//userRoute.get('/api/sessions/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), sessionGithub);

export default userRoute;