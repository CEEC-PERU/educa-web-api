require('dotenv').config();
const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.API_CORREO,
});

async function sendMail(to, subject, text, html) {
  const sender = new Sender("soporte@trial-0r83ql3o6qzlzw1j.mlsender.net", "QTech"); // dirección de correo asociada con tu dominio de prueba
  const recipient = [
    new Recipient(to.email, to.name)
  ];
  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipient)
    .setSubject(subject)
    .setHtml(html)
    .setText(text);
  try {
    const response = await mailerSend.email.send(emailParams);
    console.log('Correo enviado:', response);
    return response;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}

module.exports = sendMail;
