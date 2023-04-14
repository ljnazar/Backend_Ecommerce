const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const userService = require('../models/user');
const local = require('passport-local');
const { createHash, isValidPassword } = require('../utils/bcrypt');

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userService.findOne({ _id: id });
        done(null, user);
    });

    passport.use('register', new LocalStrategy ({
        passReqToCallback: true, 
        usernameField: 'email'
    }, async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try{
                let user = await userService.findOne({email: username});
                if(user){
                    console.log('User already exists');
                    return done(null, false);
                }
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: createHash(password)
                }
                let result = await userService.create(newUser);
                return done (null, result);
            } catch (error) {
                return done ('Error al obtener el usuario: ' + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done) => {
        try{
            const user = await userService.findOne({email: username});
            //console.log(user);
            if(!user){
                console.log('User does not exists');
                return done (null, false);
            }
            if(!isValidPassword(user, password)) return done (null, false);
            return done (null, user);
        } catch(error) {
            return done (error);
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.cb6d2acccfc6dd74',
        clientSecret: '835f5dc902bb5c53830f48f214786833a5db5f05',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        scope: ['user: email']
    }, async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(profile);
            let user = await userService.findOne({ email: profile.emails[0].value });
            if(!user) {
                let newUser = {
                    first_name: profile._json.login,
                    last_name: '',
                    email: profile.emails[0].value,
                    age: 0,
                    role: 'user',
                    password: ''
                }
                let result = await userService.create(newUser);
                done(null, result);
            }
            else {
                done(null, user);
            }
        } catch (error) {
            done(error);
        }
    }));

};

module.exports = initializePassport;