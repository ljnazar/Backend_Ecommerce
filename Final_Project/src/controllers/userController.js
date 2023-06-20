import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { generateToken} from '../utils/jwt.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';
import CustomError from '../utils/customError.js';
import { errorDictionary } from '../utils/errorDictionary.js';
import { generateUserErrorInfo } from '../utils/generateUserErrorInfo.js';
import { sendEmail } from '../utils/sendEmail.js';

const userService = new UserService();
const cartService = new CartService();

// MAIN ROUTE

export const mainRender = (req, res, next) => {
    try {
        //res.clearCookie('sessionToken').redirect('/api/products');
        res.redirect('/api/products');
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
        if(!userFound) CustomError.createError({
            name: 'Login error',
            cause: 'User does not exists',
            message: 'Error trying to login',
            code: errorDictionary.INVALID_USER_ERROR
        });
        //throw new Error('User does not exists');
        //if(!isValidPassword(userFound, password)) return res.status(401).json({ error: 'Wrong password' });
        if(!isValidPassword(userFound, password)) CustomError.createError({
            name: 'Login error',
            cause: 'Wrong password',
            message: 'Error trying to login',
            code: errorDictionary.WRONG_PASSWORD_ERROR
        });
        
        //throw new Error('Wrong password');
        
        req.session.userId = userFound._id;
        req.session.email = userFound.email;
        req.session.role = userFound.role;
        req.session.cartId = userFound.cartId;

        //console.log(userFound.cartId);
        
        //localStorage.setItem("cartId", userFound.cartId);
    
        // Generate token JWT
        const accessToken = generateToken(email);
        res.cookie('sessionToken', accessToken, { maxAge: 3000*1000, httpOnly: true, signed: true }).json({ cartId: userFound.cartId });
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
    
        if(!first_name || !last_name || !password || !email){
            CustomError.createError({
                name: 'User creation error',
                cause: generateUserErrorInfo({ first_name, last_name, password, email }),
                message: 'Error trying to create user',
                code: errorDictionary.REQUIRED_FIELDS_ERROR
            });
        }
        
        let userFound = await userService.getUserByUsername(email);
        if(userFound) CustomError.createError({
            name: 'User creation error',
            cause: 'User already exists',
            message: 'Error trying to create user',
            code: errorDictionary.DUPLICATED_USER_ERROR
        });
        //throw new Error('User already exists');
            //console.log('User already exists');
            //res.redirect('/failregister');
            //throw new Error('User already exists');
    
        const cart = await cartService.create();
    
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            cartId: cart._id
        }
        await userService.create(newUser);
        return res.status(201).json({});
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

export const restoreRender = async (req, res, next) => {
    try {
        res.render('send-recovery-password');
    } 
    catch(error) {
        next(error);
    }
};

let tokens = [];

const deleteToken = token => {
    tokens = tokens.filter( element => element.token != token);
};

const saveToken = token => {
    tokens.push({
        token,
        time: Date.now()
    });
    setTimeout(() => {
        deleteToken(token);
        console.log('token borrado'); //////////////
        console.log(tokens); //////////////////
    }, 60 * 60 * 1000);
};

export const sendPasswordCode = async (req, res, next) => {
    console.log('1'); ///////////////////////
    try {
        const { email } = req.body;
        let token = createHash(email);
        saveToken(token);
        const link = `http://localhost:8080/restorePassword?token=${token}`;
        let content = `
        <div>
            <h4>
                Link para cambio de contraseña:
            </h4>
            <p>
                ${link}
            </p>
        </div>`
        await sendEmail(email, 'Recuperar contraseña', content);
    }
    catch(error) {
        next(error);
    }
}; 

export const validatePasswordUpdate = async(req, res, next) => {
    console.log('2'); ///////////////////////
    try {
        let tokenFound = false;
        let { token } = req.query;
        console.log(tokens); ////////////////
        for (let element in tokens){
            if(tokens[element].token == token) tokenFound = true;
            console.log(tokenFound); ////////////////
        }
        if(tokenFound){
            res.render('restore-password');
        }
        else{
            CustomError.createError({
                name: 'Recovery password error',
                cause: 'Token error',
                message: 'Error trying to recovery password',
                code: errorDictionary.AUTHORIZATION_ERROR
            });
        }
    }
    catch(error) {
        next(error);
    }
};

export const restorePassword = async(req, res, next) => {
    console.log('3'); ///////////////////////
    try {
        let { email, newPassword } = req.body;
        let userFound = await userService.getUserByUsername(email);
        if(userFound){
            let newPasswordHash = createHash(newPassword);
            await userService.updatePassword(email, newPasswordHash);
            console.log('Restore password ok');
            res.status(200).json({});
        }else{
            console.log('User not found');
        }
    }
    catch(error) {
        next(error);
    }
};
