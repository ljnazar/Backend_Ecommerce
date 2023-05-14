import { config } from '../config/envConfig.js';
import winston from 'winston';

const customLogger = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

const buildProductLogger = () => {
    const logger = winston.createLogger({
        levels: customLogger.levels,
        transports: [
            new winston.transports.Console({ 
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLogger.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({ 
                filename: './errors.log', 
                level: 'error' 
            })
        ]
    })
    return logger;
}

const buildDevLogger = () => {
    const logger = winston.createLogger({
        levels: customLogger.levels,
        transports: [
            new winston.transports.Console({ 
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLogger.colors }),
                    winston.format.simple()
                )
            }),
        ]
    })
    return logger;
}

let logger = config.nodeEnv === 'production' ? buildProductLogger() : buildDevLogger();

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next();
}