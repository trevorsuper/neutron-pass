function reveal_passwords() {
  const new_entry = {
    "email_id":"test@example.com",
    "login_password":"008c70392e3abfbd0fa47bbc2ed96aa99bd49e159727fcba0f2e6abeb3a9d601",
    "master_password":"6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
    "passwords": {
      "site1":["email1","password1"],
      "site2":["email2","password2"],
      "site3":["email3","password3"],
      "site4":["email4","password4"],
      "site5":["email5","password5"],
      "site6":["email6","password6"],
      "site7":["email7","password7"],
      "site8":["email8","password8"],
      "site9":["email9","password9"],
      "site10":["email10","password10"]
    }
  }
  const email1 = new_entry.passwords.site1[0];
  const email2 = new_entry.passwords.site2[0];
  const email3 = new_entry.passwords.site3[0];
  const email4 = new_entry.passwords.site4[0];
  const email5 = new_entry.passwords.site5[0];
  const email6 = new_entry.passwords.site6[0];
  const email7 = new_entry.passwords.site7[0];
  const email8 = new_entry.passwords.site8[0];
  const email9 = new_entry.passwords.site9[0];
  const email10 = new_entry.passwords.site10[0];
  const password1 = new_entry.passwords.site1[1];
  const password2 = new_entry.passwords.site2[1];
  const password3 = new_entry.passwords.site3[1];
  const password4 = new_entry.passwords.site4[1];
  const password5 = new_entry.passwords.site5[1];
  const password6 = new_entry.passwords.site6[1];
  const password7 = new_entry.passwords.site7[1];
  const password8 = new_entry.passwords.site8[1];
  const password9 = new_entry.passwords.site9[1];
  const password10 = new_entry.passwords.site10[1];
  console.log(email1);
  console.log(email2);
  console.log(email3);
  console.log(email4);
  console.log(email5);
  console.log(email6);
  console.log(email7);
  console.log(email8);
  console.log(email9);
  console.log(email10);
  console.log(password1);
  console.log(password2);
  console.log(password3);
  console.log(password4);
  console.log(password5);
  console.log(password6);
  console.log(password7);
  console.log(password8);
  console.log(password9);
  console.log(password10);
}
