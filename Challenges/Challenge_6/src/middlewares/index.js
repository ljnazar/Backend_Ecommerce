const authMiddleware =  (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.render('login', { status: 'failed' });
    }
}

const sessionValidation = (req, res, next) => {
    if(!req.session?.user){
        next();
    }else{
        res.render('datos', {});
    }
}

module.exports = { sessionValidation, authMiddleware };