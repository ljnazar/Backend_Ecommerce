const { Router } = require('express');
const passport = require('passport');

const sessionsRouter = Router();

sessionsRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {})

sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    req.session.user = req.user;
    //console.log(req.session.user);
    res.redirect('/');
})

module.exports = sessionsRouter;