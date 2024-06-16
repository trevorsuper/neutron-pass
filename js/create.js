const { json } = require('body-parser');
const fs = require('fs');

const new_entry = {
  "email_id":"",
  "login_password":"",
  "master_password":"",
  "passwords": {
    "site1":["email1","password1"],
    "site2":["email2","password2"],
    "site3":["email3","password3"],
  }
}

try {
  fs.writeFileSync('./user.json', JSON.stringify(new_entry));
  console.log('File successfully written');
} catch (err) {
  console.error(err);
}
/*
create.js creates a new file user.json if it does not already exist,
and writes new_entry to it. If user.json exists it overwrites the data in it.
The code in this file is meant for creating a new .json file when a user clicks
the create account button with email, login, and master passwords written.
*/