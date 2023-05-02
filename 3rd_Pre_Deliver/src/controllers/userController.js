import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { generateToken} from '../utils/jwt.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';

const userService = new UserService();
const cartService = new CartService();

// MAIN ROUTE

export const mainRender = (req, res, next) => {
    try {
        res.clearCookie('sessionToken').redirect('/home');
    } 
    catch(error) {
        next(error);
    }
};

// LOGIN

export const loginRender = (req, res, next) => {
    try {
        res.render('login');
    } 
    catch(error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        const userFound = await userService.getUserByUsername(email);

        //if(!userFound) return res.status(401).json({ error: 'User does not exists' });
        if(!userFound) throw new Error('User does not exists');
        //if(!isValidPassword(userFound, password)) return res.status(401).json({ error: 'Wrong password' });
        if(!isValidPassword(userFound, password)) throw new Error('Wrong password');
        
        req.session.email = userFound.email;
        req.session.role = userFound.role;
    
        // Generate token JWT
        const accessToken = generateToken(email);
        res.cookie('sessionToken', accessToken, { maxAge: 3000*1000, httpOnly: true, signed: true }).json();
    } 
    catch(error) {
        next(error);
    }
};

// export const loginUserError = (req, res, next) => {
//     try {
//         res.render('login-error');
//     } 
//     catch(error) {
//         next(error);
//     }
// };

// REGISTER

export const registerRender = (req, res, next) => {
    try {
        res.render('register');
    } 
    catch(error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const {first_name, last_name, password, email} = req.body;
    
        let userFound = await userService.getUserByUsername(email);
        if(userFound) throw new Error('User already exists');
            //console.log('User already exists');
            //res.redirect('/failregister');
            //throw new Error('User already exists');
    
        const cart = await cartService.create();
    
        req.session.cartId = cart._id;
    
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            cartId: cart._id
        }
        await userService.create(newUser);
        return res.status(201).redirect('/login');
    } 
    catch(error) {
        next(error);
    }
};

// export const createUserError = (req, res, next) => {
//     try {
//         res.render('register-error');
//     } 
//     catch(error) {
//         next(error);
//     }
// };

// LOGOUT

export const logoutUser = (req, res, next) => {
    try {
        res.clearCookie('sessionToken').redirect('/login');
    } 
    catch(error) {
        next(error);
    }
};

// RESET PASSWORD

export const restoreRender = (req, res, next) => {
    try {
        res.render('restore-password');
    } 
    catch(error) {
        next(error);
    }
};

export const restorePassword = async(req, res, next) => {
    try {
        let user = req.body;
        let userFound = await userService.getUserByUsername(user.email);
        if(!userFound){
            console.log('User not found');
        }else{
            let newPassword = createHash(user.password);
            await userService.updateUser(user.email, newPassword);
            console.log('Restore password ok');
            res.render('login');
        }
    }
    catch(error) {
        next(error);
    }

};