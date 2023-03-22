const express = require('express');
const session = require('express-session');
//const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const authRouter = require('./src/routes/auth');
const sessionsRouter = require('./src/routes/sessions');
const { createHash } = require('./src/utils/index');
const initializePassport = require('./src/config/passport.config');
const passport = require('passport');
const env = require('dotenv');
const app = express();

env.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }));
app.set('view engine', '.hbs');

// const mongoStore = MongoStore.create({
//     mongoUrl: 'mongodb+srv://ljnazar:elmo1546@ecommerce.2qxtdjo.mongodb.net/ecommerce?retryWrites=true&w=majority',
//     mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//     ttl: 150
// });

// app.use(session({
//     store: mongoStore,
//     secret: createHash('secretoConHashRandom'),
//     resave: false,
//     saveUninitialized: false
// }));

initializePassport();

app.use(session({
    secret: createHash('secretoConHashRandom'),
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use('/', authRouter);
//app.use('/', authRouter);
app.use('/api/sessions', sessionsRouter);
// app.get('/', (req, res) => {
//     res.redirect('/login');
// });

app.get('/', (req, res) => {
    res.redirect('/login');
});


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