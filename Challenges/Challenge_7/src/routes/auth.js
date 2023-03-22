const { Router } = require('express');
const { authMiddleware, sessionValidation } = require('../middlewares/index');
const { createHash, isValidPassword } = require('../utils/index');
const userModel = require('../models/user');
const productModel = require('../models/product');
//const passport = require('passport');

const authRouter = Router();

// authRouter.get('/', authMiddleware, async(req, res) => {
//     res.render('datos', {});
// });

authRouter.get('/login', sessionValidation, async(req, res) => {
    res.render('login', {});
});

authRouter.post('/login', sessionValidation,  async (req, res) => {
    let user = req.body;
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
        res.render('datos', { user: req.session.user, role: userFound.role , products});
    }
});

authRouter.get('/register', sessionValidation, async(req, res) => {
    res.render('register', {});
});

authRouter.post('/register', sessionValidation,  async(req, res) => {
    const { first_name, last_name, age, email, password } = req.body;
    let newUser = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password)
    }
    try {
        let user = await userModel.findOne({ email: newUser.email });
        if(user){
            res.render('register-error', {});
        }
        const usuarioSaveModel = userModel(newUser);
        await usuarioSaveModel.save();
    } catch (error) {
        console.log(error);
        res.render('register-error', {});
    }

    res.render('login', { message: 'Registro exitoso', status: 'success' });
})

// authRouter.get('/soloLogueados', authMiddleware, (req, res) => {
//     res.render('datos', {});
// });

authRouter.get('/logout', async(req, res) => {
    req.session.destroy(error => {
        res.redirect('/login');
    });
});

authRouter.get('/restaurarPassword', async(req, res) => {
    res.render('restore-password', {});
});

authRouter.post('/restaurarPassword', sessionValidation,  async(req, res) => {
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