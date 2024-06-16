const fs = require('fs');
const filePath = './user.json';
function delete_site1(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw error;
  }
}

try {
  let data = delete_site1(filePath);
  data.passwords.site1[0] = "";
  data.passwords.site1[1] = "";
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('File updated successfully.');
} catch (error) {
  console.error('Error updating file:', error);
}

function delete_site2(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw error;
  }
}

try {
  let data = delete_site2(filePath);
  data.passwords.site2[0] = "";
  data.passwords.site2[1] = "";
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('File updated successfully.');
} catch (error) {
  console.error('Error updating file:', error);
}

function delete_site3(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  } catch (error) {
    throw error;
  }
}

try {
  let data = delete_site3(filePath);
  data.passwords.site3[0] = "Neuron";
  data.passwords.site3[1] = "Pants";
  fs.writeFileSync(filePath, JSON.stringify(data));
  console.log('File updated successfully.');
} catch (error) {
  console.error('Error updating file:', error);
}
/*
delete.js is just a modified version of update.js to overwrite passwords with
empty data. Yes, the delete button actually deletes the data.
*/