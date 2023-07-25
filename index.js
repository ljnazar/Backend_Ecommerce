import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import mainRoute from './src/routes/index.js';
import { config } from './src/config/envConfig.js';
import session from 'express-session';
import { createHash } from'./src/utils/bcrypt.js';
import errorHandler from './src/middlewares/errorHandler.js';
import compression from 'express-compression';
import { addLogger } from './src/middlewares/logger.js';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { swaggerOptions } from './src/swagger-options.js';
import { onRequest } from 'firebase-functions/v2/https';

const appServer = express();

const corsOptions = {
    origin: config.nodeEnv == 'development' ? 'http://localhost:8080/' : 'https://app-2t337amdgq-uc.a.run.app/',
    optionsSuccessStatus: 200
}

appServer.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main.hbs' }));
appServer.set('view engine', '.hbs');

const specs = swaggerJsdoc(swaggerOptions);
appServer.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Middlewares
appServer.use(addLogger);
appServer.use(compression({ brotli: { enabled: true, zlib: {} } }));
appServer.use(cors(corsOptions));
appServer.use(express.json());
appServer.use(express.urlencoded({extended: true}));
appServer.use(express.static('public'));
appServer.use(session({
    secret: createHash('secretoConHashRandom'),
    resave: false,
    saveUninitialized: false
}));
appServer.use('/', mainRoute);
appServer.use(errorHandler);

mongoose.connect(config.mongooseApiKey)
    .then(res => console.log('Database connected'))
    .catch(error => {
        console.log("Cannot connect to database: " + error);
        process.exit();
    });


if(config.nodeEnv == 'development'){
    const server = appServer.listen(8080, () => console.log(`Server running on port: 8080`));
    server.on('error', error => console.log(error));
}

export const app = onRequest(appServer);

