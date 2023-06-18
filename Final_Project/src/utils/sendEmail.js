import nodemailer from 'nodemailer';
import { config } from '../config/envConfig.js';

export const sendEmail = async (email, subject, content) => {
    try {
        const transporter = nodemailer.createTransport({
            host: config.hostEmail,
            service: config.serviceEmail,
            port: 587,
            secure: true,
            auth: {
                user: config.userEmail,
                pass: config.passEmail,
            },
        });

        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: email,
            subject: subject,
            html: content,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
}