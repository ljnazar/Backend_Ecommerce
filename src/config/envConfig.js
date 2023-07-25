import dotenv from 'dotenv';
dotenv.config();

export const config = {
    nodeEnv: process.env.NODE_ENV,
    mongooseApiKey: process.env.MONGOOSE_API_KEY,
    serviceEmail: process.env.SERVICE_EMAIL,
    portEmail: process.env.PORT_EMAIL,
    userEmail: process.env.USER_EMAIL,
    passEmail: process.env.PASS_EMAIL
}
