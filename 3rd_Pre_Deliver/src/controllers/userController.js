import { createHash } from '../utils/bcrypt.js';
import { generateToken} from '../utils/jwt.js';
import UserService from '../services/userService.js';

// MAIN ROUTE

export const mainRender = (req, res) => {
    res.redirect('/home');
};

// LOGIN

export const loginRender = (req, res) => {
    res.render('login');
};

export const loginUser = async (req, res) => {
    // Generate token JWT
    const accessToken = generateToken(req.userCredentials);
    res.cookie('sessionToken', accessToken, { maxAge: 30*1000, httpOnly: true, signed: true }).json();
};

export const loginUserError = (req, res) => {
    res.render('login-error');
};

// REGISTER

export const registerRender = (req, res) => {
    res.render('register', {});
};

export const createUser = async (req, res) => {};

export const createUserError = (req, res) => {
    res.render('register-error');
};

// LOGOUT

export const logoutUser = (req, res) => {
    req.session.destroy();
    res.clearCookie('sessionToken').redirect('/login');
};

// RESET PASSWORD

export const restoreRender = (req, res) => {
    res.render('restore-password', {});
};

export const restorePassword = async(req, res) => {
    const userService = new UserService();
    let user = req.body;
    try {
        let userFound = await userService.getUserByUsername(user.email);
        if(!userFound){
            res.render('register', {});
        }else{
            let newPassword = createHash(user.password);
            await userService.updateUser(user.email, newPassword);
            res.render('login', {});
        }
    
    } catch (error) {
        console.log(error);
        res.render('register', {});
    }

};

// LOGIN GITHUB

export const sessionGithub = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/home');
};
