import { Router } from 'express';
import { createHash } from '../utils/bcrypt.js';
import userModel from '../models/userSchema.js';
import productModel from '../models/productSchema.js';
import passport from 'passport';
import { generateToken, authToken } from '../utils/jwt.js';
import cookieParser from 'cookie-parser';

const authRouter = Router();

authRouter.use(cookieParser('PrivateKey'));

// LOGIN

authRouter.get('/login', (req, res) => {
    res.render('login');
});

authRouter.post('/login', passport.authenticate('login'),  async (req, res) => {
    // Generate token JWT
    const accessToken = generateToken(req.userCredentials);
    res.cookie('sessionToken', accessToken, { maxAge: 30*1000, httpOnly: true, signed: true }).json();
});

authRouter.get('/faillogin', (req, res) => {
    res.render('login-error');
});

// REGISTER

authRouter.get('/register', (req, res) => {
    res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', {failureRedirect: '/failregister', successRedirect: '/'}));

authRouter.get('/failregister', (req, res) => {
    res.render('register-error');
})

// DATOS

authRouter.get('/', authToken, async (req, res) => {

    const productsFound = await productModel.find({category: "notebooks"});
    let products = [];
    if(productsFound){
        productsFound.forEach( element => {
            let object = {
                thumbnail: element.thumbnail,
                category: element.category,
                description: element.description,
                price: element.price,
                stock: element.stock
            }
                products.push(object);
        });
    }

    res.render('datos', { user: req.user.email, role: req.user.role , products});

});

// VALIDATE TOKEN JWT

authRouter.get('/VerificateToken', authToken, (req, res) => {
    const token = req.signedCookies.sessionToken;
    res.json({ signedCookies: token });
});

// LOGOUT

authRouter.get('/logout', (req, res) => {
    res.redirect('/login');
});

// RESET PASSWORD

authRouter.get('/restaurarPassword', (req, res) => {
    res.render('restore-password', {});
});

authRouter.post('/restaurarPassword',  async(req, res) => {
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

export default authRouter;