const { Router } = require('express');
const { authMiddleware, sessionValidation } = require('../middlewares/index');
const { createHash, isValidPassword } = require('../utils/index');
const usuarioModel = require('../models/user');
//const passport = require('passport');

const authRouter = Router();

authRouter.get('/', authMiddleware, async(req, res) => {
    res.render('datos', {});
});

authRouter.get('/login', sessionValidation, async(req, res) => {
    res.render('login', {});
});

authRouter.post('/login', sessionValidation,  async(req, res) => {
    let user = req.body;
    let userFound = await usuarioModel.findOne({ email: user.email });
    if(!userFound || !isValidPassword(userFound, user.password)){
        res.render('login-error', { user });
    }else{
        req.session.user = userFound.email;
        res.render('datos', { user: req.session.user, role: userFound.role });
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
        let user = await usuarioModel.findOne({ email: newUser.email });
        if(user){
            res.render('register-error', {});
        }
        const usuarioSaveModel = usuarioModel(newUser);
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
        res.redirect('/auth/login');
    });
});

authRouter.get('/restaurarPassword', async(req, res) => {
    res.render('restore-password', {});
});

authRouter.post('/restaurarPassword', sessionValidation,  async(req, res) => {
    let user = req.body;
    try {
        let userFound = await usuarioModel.findOne({ email: user.email });
        if(!userFound){
            res.render('register', {});
        }else{
            let newPassword = createHash(user.password);
            await usuarioModel.updateOne({ email: user.email }, { $set: { password: newPassword }});
            res.render('login', {});
        }
    
    } catch (error) {
        console.log(error);
        res.render('register', {});
    }

});

module.exports = authRouter;