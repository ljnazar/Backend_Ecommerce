import express from 'express';
import session from 'express-session';
import mongoose from'mongoose';
import exphbs from 'express-handlebars';
import authRouter from'./routes/auth.js';
import sessionsRouter from'./routes/sessions.js';
import { createHash } from'./utils/bcrypt.js';
import initializePassport from'./config/passport.config.js';
import passport from 'passport';
import env from 'dotenv';

env.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

// Session and passport only for GitHub login
initializePassport();
app.use(session({
    secret: createHash('secretoConHashRandom'),
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', authRouter);
app.use('/api/sessions', sessionsRouter);

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