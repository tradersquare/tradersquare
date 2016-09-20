const path = require('path')
const restler = require('restler')
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password)

module.exports = (ticker) => {
  
}