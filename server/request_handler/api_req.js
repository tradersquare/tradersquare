const path = require('path');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);

const element = {};

module.exports = function(type, ticker, statement, year, period) {
  return new Promise((resolve, reject) => {
    intrinio[type](ticker, statement, year, period)
      .on('complete', (data, response) => {
        const results = data.data;
        for(let i of results){
          element[i.tag+year] = i.value;
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
}
