import jwt from 'jsonwebtoken';
import CustomError from './customError.js';
import { errorDictionary } from './errorDictionary.js';
//const { createHash } = require('./bcrypt');
//const RANDOM_PRIVATE_KEY = createHash('secretoConHashRandom');

const RANDOM_PRIVATE_KEY = 'secretRandom';

export const generateToken = (user) => {
    const token = jwt.sign({ user }, RANDOM_PRIVATE_KEY);
    return token;
}

export const authToken = (req, res, next) => {
    const token = req.signedCookies.sessionToken;
    //if(!token) return res.status(401).redirect('/login');//.json({ error: 'Not authenticated' });
    if(!token) CustomError.createError({
        name: 'Autentication Error',
        cause: 'Sesión expirada - Ingrese nuevamente',
        message: 'Error trying to access',
        code: errorDictionary.AUTHENTICATION_ERROR
    });
    
    //throw new Error('Not authenticated');
    jwt.verify(token, RANDOM_PRIVATE_KEY, error => {
        //if(error) return res.status(403).redirect('/login');//.json({ error: 'Not authorized' });
        if(error) CustomError.createError({
            name: 'Autentication Error',
            cause: 'Sesión expirada - Ingrese nuevamente',
            message: 'Error trying to access',
            code: errorDictionary.AUTHENTICATION_ERROR
        });
        
        //throw new Error('Not authorized');
        next();
    });

}