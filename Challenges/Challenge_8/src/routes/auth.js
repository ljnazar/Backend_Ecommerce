const { Router } = require('express');
const { isAuth } = require('../middlewares/index');
const { createHash, isValidPassword } = require('../utils/bcrypt');
const userModel = require('../models/user');
const productModel = require('../models/product');
const passport = require('passport');
const { generateToken, authToken } = require('../utils/jwt');
const cookieParser = require('cookie-parser');

const authRouter = Router();

authRouter.use(cookieParser('PrivateKey'));

// LOGIN

authRouter.get('/login', (req, res) => {
    res.render('login');
});

authRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}),  async (req, res) => {
    let user = req.body;
    //console.log(user);
    let userFound = await userModel.findOne({ email: user.email });
    if(!userFound || !isValidPassword(userFound, user.password)){
        res.render('login-error', { user });
    }else{
        req.session.user = userFound.email;
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
        //console.log({ user: req.session.user, role: userFound.role , products});
        //res.render('datos', { user: req.session.user, role: userFound.role , products});
        // Generate token JWT
        const accessToken = generateToken(user);
        //res.cookie('sessionToken', accessToken, { maxAge: 30*1000, httpOnly: true, signed: true }).json({ status: 'success', message: 'Logged in!' });
        res.cookie('sessionToken', accessToken, { maxAge: 30*1000, httpOnly: true, signed: true }).render('datos', { user: req.session.user, role: userFound.role , products});
    }
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

authRouter.get('/', isAuth, (req, res) => {
    res.render('datos', {});
});

// VALIDATE TOKEN JWT

authRouter.get('/VerificateToken', authToken, (req, res) => {
    const token = req.signedCookies.sessionToken;
    res.json({ signedCookies: token });
    //res.send({ status: 'success', sessionToken });
});

// LOGOUT

authRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.redirect('/login');
    });
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

module.exports = authRouter;