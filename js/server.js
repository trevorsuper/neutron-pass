const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'neutron.pass.master@gmail.com',
    pass: 'utiu fxgd tlux jbqp'  // Use a secure method to store this password
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('Error with transporter verification:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Function to generate a numeric verification code
function generateVerificationCode() {
  const length = 6;
  const numbers = '0123456789';
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    randomCode += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return randomCode;
}

// Temporary storage for verification codes
let verificationCodes = {};

// Endpoint to send login verification email
app.post('/send-login-verification-email', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode();
  console.log(`Received request to send login verification email to: ${email}`);
  console.log(`Generated verification code: ${verificationCode}`);

  // Store the verification code with an expiration time
  verificationCodes[email] = {
    code: verificationCode,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  };

  let mailOptions = {
    from: '"Neutron Pass" <neutron.pass.master@gmail.com>',
    to: email,
    subject: 'New Login Detected',
    text: `A new login has been detected. Verification code expires in 10 minutes: ${verificationCode}`,
    html: `<b>A new login has been detected. Verification code expires in 10 minutes: ${verificationCode}</b>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred: ', error.message);
      return res.status(500).send({ error: error.message });
    }
    console.log('Email sent: ', info.response);
    res.status(200).send({ message: 'Login verification email sent' });
  });
});

// Endpoint to verify the code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  console.log(`Received request to verify code for: ${email}`);
  console.log(`Provided code: ${code}`);

  const storedData = verificationCodes[email];

  if (storedData) {
    console.log(`Stored code: ${storedData.code}`);
    console.log(`Code expiration: ${new Date(storedData.expiresAt).toISOString()}`);
  } else {
    console.log('No verification code found for this email.');
  }

  if (storedData && storedData.code === code && Date.now() < storedData.expiresAt) {
    // Code is valid
    console.log('Verification code is valid.');
    delete verificationCodes[email]; // Remove the code after verification
    res.status(200).send({ valid: true });
  } else {
    // Code is invalid or expired
    console.log('Verification code is invalid or expired.');
    res.status(400).send({ valid: false, message: 'Invalid or expired verification code' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
