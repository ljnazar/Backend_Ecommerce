import jwt from 'jsonwebtoken';
//const { createHash } = require('./bcrypt');
//const RANDOM_PRIVATE_KEY = createHash('secretoConHashRandom');

const RANDOM_PRIVATE_KEY = 'secretRandom';

export const generateToken = (user) => {
    const token = jwt.sign({ user }, RANDOM_PRIVATE_KEY);
    return token;
}

export const authToken = (req, res, next) => {

    const sessionGithub = req.session.user;

    if(sessionGithub){
        next();
    }else {
        const token = req.signedCookies.sessionToken;
        if(!token) return res.status(401).redirect('/login');//.json({ error: 'Not authenticated' });
        jwt.verify(token, RANDOM_PRIVATE_KEY, (error, credentials) => {
            if(error) return res.status(403).redirect('/login');//.json({ error: 'Not authorized' });
            req.userCredentials = credentials.user;
            console.log(credentials.user);
            console.log(credentials);
            next();
        })
    }

}