import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import userModel from '../models/userSchema.js';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import UserMongooseDao from '../daos/userMongooseDao.js'

const LocalStrategy = local.Strategy

const initializePassport = () => {

    const userMongooseDao = new UserMongooseDao();

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await userMongooseDao.getById(id);
        done(null, user);
    });

    passport.use('register', new LocalStrategy ({
        passReqToCallback: true, 
        usernameField: 'email'
    }, async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try{
                let user = await userMongooseDao.getByUser(username);
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
                let result = await userMongooseDao.create(newUser);
                return done (null, result);
            } catch (error) {
                return done ('Error al obtener el usuario: ' + error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({usernameField: 'email'}, async(username, password, done) => {
        try{
            const user = await userMongooseDao.getByUser(username);
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
            //console.log(profile);
            let user = await userModel.findOne({ email: profile.emails[0].value });
            if(!user) {
                let newUser = {
                    first_name: profile._json.login,
                    last_name: '',
                    email: profile.emails[0].value,
                    age: 0,
                    role: 'user',
                    password: ''
                }
                let result = await userModel.create(newUser);
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

export default initializePassport;