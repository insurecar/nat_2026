const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  //2. Define email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email, // recipient email
    subject: options.subject,
    text: options.message,
    // html: '<p>Your HTML content here</p>',
  };

  //3. Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendEmail;
