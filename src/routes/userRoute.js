import { Router } from 'express';
import { 
    mainRender, 
    loginRender, 
    loginUser, 
    registerRender, 
    createUser, 
    logoutUser, 
    restoreRender,
    sendPasswordCode,
    validatePasswordUpdate,
    restorePassword,
} from '../controllers/userController.js';

const userRoute = Router();

// MAIN ROUTE
userRoute.get('/', mainRender);

// LOGIN
userRoute.get('/login', loginRender);
userRoute.post('/login', loginUser);

// REGISTER
userRoute.get('/register', registerRender);
userRoute.post('/register', createUser);

// LOGOUT
userRoute.get('/logout', logoutUser);

// RESET PASSWORD
userRoute.get('/sendRecovery', restoreRender);
userRoute.post('/sendRecovery', sendPasswordCode);
userRoute.get('/restorePassword', validatePasswordUpdate);
userRoute.post('/restorePassword', restorePassword);

export default userRoute;