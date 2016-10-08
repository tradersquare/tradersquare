const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const path = require('path');
const intrinio = require(path.resolve(__dirname, "intrinio"))(username, password);
const db = require('../../db/config.js');


module.exports = () => {
    return new Promise( (resolve, reject) => {
      intrinio.financials('FB')
        .on('complete', (data, response) => {
          resolve(data);
        })
        .on('error', error => {
          console.log('follwing error from graph_details: module.exports');
          reject(error);
        })
    })
    .then(data => {
      console.log(data, 'this was the data got back');
      db.query(`INSERT INTO dummy.cron (var, numnum) VALUES ('bye', 30);`)
        .on('end', function() {
          console.log('db table should be updated, run command: SELECT * FROM productionschema.realdata;');
        })
        .catch(console.error)
    })
  }
