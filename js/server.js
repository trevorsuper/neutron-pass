const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
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

// Endpoint to send account creation verification email
function sendVerificationEmail(email, res) {
  console.log(`Received request to send account creation verification email to: ${email}`);

  let mailOptions = {
    from: '"Neutron Pass" <neutron.pass.master@gmail.com>',
    to: email,
    subject: 'Account Created Successfully',
    text: 'Your account has been created successfully. Please verify your email address.',
    html: `<b>Your account has been created successfully. Please verify your email address.</b>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred: ', error.message);
      return res.status(500).send({ error: error.message });
    }
    console.log('Email sent: ', info.response);
    res.status(200).send({ message: 'Verification email sent' });
  });
}

// Endpoint to create a new account
app.post('/create-account', (req, res) => {
  const { email, login_password, master_password } = req.body;

  // Create new entry
  const new_entry = {
    email_id: email,
    login_password: login_password,
    master_password: master_password,
    passwords: {}
  };

  // Read existing data from JSON file
  let data = [];
  try {
    if (fs.existsSync('./user.json')) {
      const jsonData = fs.readFileSync('./user.json', 'utf8');
      data = jsonData ? JSON.parse(jsonData) : [];
    }
  } catch (err) {
    console.error('Error reading file:', err);
  }

  // Add new entry to data
  data.push(new_entry);

  // Write updated data back to JSON file
  try {
    fs.writeFileSync('./user.json', JSON.stringify(data, null, 2));
    console.log('File successfully written');
    sendVerificationEmail(email, res);
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).send({ error: 'Failed to create account' });
  }
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

// Endpoint to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Read existing data from JSON file
  let data = [];
  try {
    if (fs.existsSync('./user.json')) {
      const jsonData = fs.readFileSync('./user.json', 'utf8');
      data = jsonData ? JSON.parse(jsonData) : [];
    }
  } catch (err) {
    console.error('Error reading file:', err);
    return res.status(500).send({ error: 'Failed to read user data' });
  }

  // Check if user exists
  const user = data.find(user => user.email_id === email && user.login_password === password);
  if (user) {
    // Send verification email
    fetch('http://localhost:3000/send-login-verification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Failed to send verification email:', data.error);
        res.status(500).send({ error: 'Failed to send verification email' });
      } else {
        res.status(200).send({ message: 'Verification email sent' });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send({ error: 'Failed to send verification email' });
    });
  } else {
    res.status(400).send({ error: 'Invalid email or password' });
  }
});

// Function to verify master password
function verifyMasterPassword(masterPassword, res) {
  let data = [];
  try {
    const jsonData = fs.readFileSync('./user.json', 'utf8');
    data = jsonData ? JSON.parse(jsonData) : [];
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send({ error: 'Failed to read user data' });
    return false;
  }
  const user = data.find(user => user.master_password === masterPassword);
  if (!user) {
    res.status(400).send({ error: 'Invalid master password' });
    return false;
  }
  return true;
}

// Endpoint to get passwords
app.post('/passwords', (req, res) => {
  const { masterPassword } = req.body;

  if (!verifyMasterPassword(masterPassword, res)) {
    return;
  }

  try {
    const jsonData = fs.readFileSync('./user.json', 'utf8');
    const data = JSON.parse(jsonData);
    const passwords = data.map(user => user.passwords);
    res.status(200).send(passwords);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).send({ error: 'Failed to read passwords' });
  }
});

// Endpoint to create a new password entry
app.post('/passwords/create', (req, res) => {
  const { masterPassword, site, email, password } = req.body;

  if (!verifyMasterPassword(masterPassword, res)) {
    return;
  }

  try {
    const jsonData = fs.readFileSync('./user.json', 'utf8');
    const data = JSON.parse(jsonData);
    data[0].passwords[site] = [email, password];
    fs.writeFileSync('./user.json', JSON.stringify(data, null, 2));
    res.status(200).send({ message: 'Password entry created' });
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).send({ error: 'Failed to create password entry' });
  }
});

// Endpoint to update a password entry
app.put('/passwords/update', (req, res) => {
  const { masterPassword, site, email, password } = req.body;

  if (!verifyMasterPassword(masterPassword, res)) {
    return;
  }

  try {
    const jsonData = fs.readFileSync('./user.json', 'utf8');
    const data = JSON.parse(jsonData);
    if (data[0].passwords[site]) {
      data[0].passwords[site] = [email, password];
      fs.writeFileSync('./user.json', JSON.stringify(data, null, 2));
      res.status(200).send({ message: 'Password entry updated' });
    } else {
      res.status(404).send({ error: 'Site not found' });
    }
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).send({ error: 'Failed to update password entry' });
  }
});

// Endpoint to delete a password entry
app.delete('/passwords/delete', (req, res) => {
  const { masterPassword, site } = req.body;

  if (!verifyMasterPassword(masterPassword, res)) {
    return;
  }

  try {
    const jsonData = fs.readFileSync('./user.json', 'utf8');
    const data = JSON.parse(jsonData);
    if (data[0].passwords[site]) {
      delete data[0].passwords[site];
      fs.writeFileSync('./user.json', JSON.stringify(data, null, 2));
      res.status(200).send({ message: 'Password entry deleted' });
    } else {
      res.status(404).send({ error: 'Site not found' });
    }
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).send({ error: 'Failed to delete password entry' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
