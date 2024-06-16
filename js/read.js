const fs = require('fs');
try {
  const jsonString = fs.readFileSync('./user.json', 'utf-8');
  const data = JSON.parse(jsonString);
  console.log(data.passwords);
} catch (err) {
  console.error('Error reading file:', err);
}
/*
read.js prints the emails and passwords to the terminal.
*/