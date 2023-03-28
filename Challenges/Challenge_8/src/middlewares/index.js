const isAuth =  (req, res, next) => {
    if(req.session.user){
        next();
    }else{
        res.render('login', { status: 'failed' });
    }
}

module.exports = { isAuth };