import { Router } from 'express';
import passport from 'passport';

const sessionsRouter = Router();

sessionsRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {});

sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res) => {
    // change to JWT
    req.session.user = req.user;
    //console.log(req.session.user);
    res.redirect('/');
});

export default sessionsRouter;