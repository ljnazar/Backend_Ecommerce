import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongooseApiKey: process.env.MONGOOSE_API_KEY
}
