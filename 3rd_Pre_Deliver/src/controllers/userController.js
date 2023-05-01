import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { generateToken} from '../utils/jwt.js';
import UserService from '../services/userService.js';
import CartService from '../services/cartService.js';

const userService = new UserService();
const cartService = new CartService();

// MAIN ROUTE

export const mainRender = (req, res) => {
    res.clearCookie('sessionToken').redirect('/home');
};

// LOGIN

export const loginRender = (req, res) => {
    res.render('login');
};

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const userFound = await userService.getUserByUsername(email);

    if(!userFound) return res.status(401).json({ error: 'User does not exists' });
    if(!isValidPassword(userFound, password)) return res.status(401).json({ error: 'Wrong password' });
    
    req.session.email = userFound.email;
    req.session.role = userFound.role;

    // Generate token JWT
    const accessToken = generateToken(email);
    res.cookie('sessionToken', accessToken, { maxAge: 3000*1000, httpOnly: true, signed: true }).json();
    
};

export const loginUserError = (req, res) => {
    res.render('login-error');
};

// REGISTER

export const registerRender = (req, res) => {
    res.render('register');
};

export const createUser = async (req, res) => {

    const {first_name, last_name, password, email} = req.body;

    let userFound = await userService.getUserByUsername(email);
    if(userFound){
        console.log('User already exists');
        return res.redirect('/failregister');
    }

    const cart = await cartService.create();

    req.session.cartId = cart._id;

    console.log(cart);
    console.log(cart._id);

    const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        cartId: cart._id
    }
    await userService.create(newUser);
    return res.status(201).redirect('/login');
    
};

export const createUserError = (req, res) => {
    res.render('register-error');
};

// LOGOUT

export const logoutUser = (req, res) => {
    res.clearCookie('sessionToken').redirect('/login');
};

// RESET PASSWORD

export const restoreRender = (req, res) => {
    res.render('restore-password');
};

export const restorePassword = async(req, res) => {
    let user = req.body;
    try {
        let userFound = await userService.getUserByUsername(user.email);
        if(!userFound){
            res.render('register');
        }else{
            let newPassword = createHash(user.password);
            await userService.updateUser(user.email, newPassword);
            res.render('login');
        }
    
    } catch (error) {
        console.log(error);
        res.render('register');
    }

};