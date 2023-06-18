import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongooseApiKey: process.env.MONGOOSE_API_KEY,
    hostEmail: process.env.HOST_EMAIL,
    serviceEmail: process.env.SERVICE_EMAIL,
    userEmail: process.env.USER_EMAIL,
    passEmail: process.env.PASS_EMAIL
}
