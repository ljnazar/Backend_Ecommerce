import express from 'express';
import session from 'express-session';
import mongoose from'mongoose';
import exphbs from 'express-handlebars';
import mainRoute from './routes/index.js'
import { createHash } from'./utils/bcrypt.js';
import passport from 'passport';
import initializePassport from'./config/passportConfig.js';
import config from './config/envConfig.js';
import compression from "compression";
import helmet from "helmet";
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: config.nodeEnv == 'development' ? 'http://localhost:8080/' : 'https://my.web.com',
    optionsSuccessStatus: 200
}

// Middlewares
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));
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
app.use(compression());
app.use(helmet());

// Routes

app.use('/', mainRoute);

const server = app.listen(config.port, () => console.log(`Server running on port: ${config.port}`));
server.on('error', error => console.log(error));

mongoose.connect(config.mongooseApiKey)
    .then(res => console.log('Database connected'))
    .catch(error => {
        console.log("Cannot connect to database: " + error);
        process.exit();
    });