// рассылает сообщения с помощью сервиса SendGrid

const sgMail = require('@sendgrid/mail')
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);


const sendEmailWithSendGrid = async (data) => {
  const mail = { ...data, from: 'Peltek1985@gmail.com' };
  await sgMail.send(mail);
  return true;
}


module.exports = sendEmailWithSendGrid;