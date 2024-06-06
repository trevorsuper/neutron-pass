const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'neutron.pass.master@gmail.com',
    pass: 'utiu fxgd tlux jbqp' // Replace with your app-specific password
  }
});

app.post('/send-verification-email', (req, res) => {
  const { email } = req.body;
  console.log(`Received request to send verification email to: ${email}`);

  let mailOptions = {
    from: '"Neutron Pass" <neutron.pass.master@gmail.com>',
    to: email,
    subject: 'Account Verification',
    text: 'Your account has been created successfully. Please verify your email.',
    html: '<b>Your account has been created successfully. Please verify your email.</b>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred: ', error.message);
      return res.status(500).send({ error: error.message });
    }
    console.log('Email sent: ', info.response);
    res.status(200).send('Verification email sent');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
