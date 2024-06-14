const fileSystem = require('fs');
function readDb(dbName = 'db.json') {
  const data = fileSystem.readFileSync(dbName, 'utf-8');
  return JSON.parse(data);
}

function writeDb(obj, dbName = 'db.json') {
  if (!obj) { return console.log('Please provide data to save')};
  try {
    fileSystem.writeFileSync(dbName, JSON.stringify(obj));
    return console.log('Save Success');
  } catch (err) {
    return console.log('Save Failed');
  }
}

module.exports = { readDb, writeDb };