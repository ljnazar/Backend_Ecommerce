const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const authRouter = require('./src/routes/auth');
const sessionsRouter = require('./src/routes/sessions');
const { createHash } = require('./src/utils/bcrypt');
const initializePassport = require('./src/config/passport.config');
const passport = require('passport');
const { authToken } = require('./src/utils/jwt');
//const { isAuth } = require('./src/middlewares/index');

const env = require('dotenv');

env.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

initializePassport();

app.use(session({
    secret: createHash('secretoConHashRandom'),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/', authRouter);

app.use('/api/sessions', sessionsRouter);

// app.get('/', authToken, (req, res) => {
//     res.redirect('/');
// });

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
server.on('error', error => console.log(error));

const MONGOOSE_API_KEY = process.env.MONGOOSE_API_KEY;
mongoose.connect(MONGOOSE_API_KEY)
    .then(res => console.log('Database connected'))
    .catch(error => {
        console.log("Cannot connect to database: " + error);
        process.exit();
    });