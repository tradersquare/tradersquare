const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const path = require('path');
const intrinio = require(path.resolve(__dirname, "intrinio"))(username, password);
const db = require('../../db/config.js');

module.exports = (ticker) => {
    return new Promise( (resolve, reject) => {
      intrinio.financials(ticker)
        .on('complete', (data, response) => {
          resolve(data);
        })
        .on('error', error => {
          console.log('follwing error from graph_details: module.exports');
          reject(error);
        })
    })
    .then(data => {
      console.log(data, 'this was the data got back', ticker);
      //compData type: array
      const compData = data.data;


      compData.forEach( (v, i) => {
        let col = v.tag;
        let newValue = v.value;
        db.query(`UPDATE productionschema.realdata SET marketcap = ${newValue} WHERE ticker = '${ticker}';`)
        .on('end', () => {
          //while useful, following line slows down process significantly
          //only use for debugging purposes
          // console.log('data changed', i, ticker);
        })
        .catch( console.error)
      })

    })
  }
