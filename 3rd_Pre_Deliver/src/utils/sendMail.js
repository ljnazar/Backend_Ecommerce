import nodemailer from 'nodemailer';

const gmailConfig = {
    service: 'gmail',
    auth: {
      user: "tumail",
      pass: "tupass"
    }
};

const mailContent = {
    from: 'desde donde',
    to: 'a quien envio',
    subject: 'Mail con html',
    html: `
    <div>
    <h1>
        !Esto es un test con imagenes!
    </h1>
    <img src="cid:perrito1">
    </div>`,
    attachments: [{
        filename: 'perrito1.jpg',
        path: 'perrito1.jpg',
        cid: 'perrito1'
    }]
};

export const sendMail = async (gmailConfig, mailContent) => {
  const transporter = nodemailer.createTransport(gmailConfig);
  let response = await transporter.sendMail(mailContent);
  console.log(response);
}

//sendMail(gmailConfig, mailContent);