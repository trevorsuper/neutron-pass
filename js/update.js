const fs = require('fs');
const filePath = './user.json';
function update_site1(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw error;
  }
}

try {
  let data = update_site1(filePath);
  data.passwords.site1[0] = "json@email.com";
  data.passwords.site1[1] = "JavaScript";
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('File updated successfully.');
} catch (error) {
  console.error('Error updating file:', error);
}

function update_site2(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw error;
  }
}

try {
  let data = update_site2(filePath);
  data.passwords.site2[0] = "mail@mail.com";
  data.passwords.site2[1] = "PASSWORD";
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('File updated successfully.');
} catch (error) {
  console.error('Error updating file:', error);
}

function update_site3(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw error;
  }
}

try {
  let data = update_site3(filePath);
  data.passwords.site3[0] = "test@example.com";
  data.passwords.site3[1] = "Adventure";
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('File updated successfully.');
} catch (error) {
  console.error('Error updating file:', error);
}
/*
update.js functions. These will have to be changed to what the user types in.
*/