const {writeDb} = require('./dbFunctions');
const obj = {
  "twitter":"ThisIsAPlainTextPassword"
}
writeDb(obj);