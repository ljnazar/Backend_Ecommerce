import { Router } from 'express';
import { createHash } from '../utils/bcrypt.js';
import userModel from '../models/userSchema.js';
import passport from 'passport';
import { generateToken, authToken } from '../utils/jwt.js';
import cookieParser from 'cookie-parser';
import ProductsMongooseDao from '../daos/productsMongooseDao.js'
//import { createUser, getUser } from '../controllers/userController.js';

const userRoute = Router();

userRoute.use(cookieParser('PrivateKey'));


//app.use('/', authRouter);
//app.use('/api/sessions', sessionsRouter);

//userRoute.get('/:id', getUser);
//userRoute.post('/', createUser);

// MAIN ROUTE

userRoute.get('/', (req, res) => {
    res.redirect('/home');
});

// LOGIN

userRoute.get('/login', (req, res) => {
    res.render('login');
});

userRoute.post('/login', passport.authenticate('login'),  async (req, res) => {
    // Generate token JWT
    const accessToken = generateToken(req.userCredentials);
    res.cookie('sessionToken', accessToken, { maxAge: 30*1000, httpOnly: true, signed: true }).json();
});

userRoute.get('/faillogin', (req, res) => {
    res.render('login-error');
});

// REGISTER

userRoute.get('/register', (req, res) => {
    res.render('register', {});
});

userRoute.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}));

userRoute.get('/failregister', (req, res) => {
    res.render('register-error');
})

// DATOS

userRoute.get('/home', authToken, async (req, res) => {

    const productsMongooseDao = new ProductsMongooseDao();
    const products = await productsMongooseDao.list();

    res.render('datos', { user: req.user.email, role: req.user.role , products});

});

// VALIDATE TOKEN JWT

userRoute.get('/VerificateToken', authToken, (req, res) => {
    const token = req.signedCookies.sessionToken;
    res.json({ signedCookies: token });
});

// LOGOUT

userRoute.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie('sessionToken').redirect('/login');
});

// RESET PASSWORD

userRoute.get('/restaurarPassword', (req, res) => {
    res.render('restore-password', {});
});

userRoute.post('/restaurarPassword',  async(req, res) => {
    let user = req.body;
    try {
        let userFound = await userModel.findOne({ email: user.email });
        if(!userFound){
            res.render('register', {});
        }else{
            let newPassword = createHash(user.password);
            await userModel.updateOne({ email: user.email }, { $set: { password: newPassword }});
            res.render('login', {});
        }
    
    } catch (error) {
        console.log(error);
        res.render('register', {});
    }

});

// LOGIN GITHUB

userRoute.get('/api/sessions/github', passport.authenticate('github'), async(req, res) => {});

userRoute.get('/api/sessions/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {

    req.session.user = req.user;
    res.redirect('/home');

});

export default userRoute;