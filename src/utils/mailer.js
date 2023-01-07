require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  return transporter.sendMail({
    from: process.env.MAIL_FROM_ADDRESS, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: htmlContent, // html body
  });
};

module.exports = {
  sendMail,
};
