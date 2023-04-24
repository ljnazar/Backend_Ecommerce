import jwt from 'jsonwebtoken';
//const { createHash } = require('./bcrypt');
//const RANDOM_PRIVATE_KEY = createHash('secretoConHashRandom');

const RANDOM_PRIVATE_KEY = 'secretRandom';

export const generateToken = (user) => {
    const token = jwt.sign({ user }, RANDOM_PRIVATE_KEY);
    return token;
}

export const authToken = (req, res, next) => {
    const token = req.signedCookies.sessionToken;
    if(!token) return res.status(401).redirect('/login');//.json({ error: 'Not authenticated' });
    jwt.verify(token, RANDOM_PRIVATE_KEY, error => {
        if(error) return res.status(403).redirect('/login');//.json({ error: 'Not authorized' });
        next();
    });

}