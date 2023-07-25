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

const buildProductionLogger = () => {
    const logger = winston.createLogger({
        levels: customLogger.levels,
        transports: [
            new winston.transports.Console({ 
                level: 'info',
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.colorize({ colors: customLogger.colors }),
                    winston.format.printf( info => `${info.timestamp} - ${info.level}: ${info.message}` )
                )
            }),
            new winston.transports.File({ 
                filename: './errors.log', 
                level: 'error' ,
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.printf( info => `${info.timestamp} - ${info.level}: ${info.message}` )
                )
            })
        ]
    })
    return logger;
}

const buildDeveloperLogger = () => {
    const logger = winston.createLogger({
        levels: customLogger.levels,
        transports: [
            new winston.transports.Console({ 
                level: 'debug',
                format: winston.format.combine(
                    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    winston.format.colorize({ colors: customLogger.colors }),
                    winston.format.printf( info => `${info.timestamp} - ${info.level}: ${info.message}` )
                )
            })
        ]
    })
    return logger;
}

let logger = config.nodeEnv === 'production' ? buildProductionLogger() : buildDeveloperLogger();

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next();
}