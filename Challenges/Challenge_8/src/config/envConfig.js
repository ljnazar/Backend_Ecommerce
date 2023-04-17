import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    mongooseApiKey: process.env.MONGOOSE_API_KEY,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
}

export default config;
