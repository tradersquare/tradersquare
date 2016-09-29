const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve(__dirname, "intrinio"))(username, password);
const db = require('../../db/config.js');
const query = require('../../db/queries.js');
const callAll = require('./all_companies.js');
const companiesList = process.env.companies;
const apiReq = require('./api_req.js');

//
// apiReq('prices', ticker, "cash_flow_statement", "2015", "FY"),
// (type, ticker, statement, year, period)
// intrinio[type](ticker, statement, year, period)
// statement: function(ticker, statement, year, period){
//   return this.get('https://api.intrinio.com/financials/standardized?='+ticker+'&statement='+statement+'&fiscal_year='+year+'&fiscal_period='+period)

/**
 * [exports description]
 * @param  {[type]} res    [description]
 * @param  {[type]} ticker [description]
 * @return {[type]}        [description]
 */
module.exports = (res, ticker) => {
  return new Promise( (resolve, reject) => {
    // apiReq('statement', ticker)
    intrinio.prices(ticker)
      .on('complete', (data, response) => {
        resolve(data);
      })
      .on('error', error => {
        console.log('follwing error from graph_details: module.exports');
        reject(error);
      })
    // 'https://api.intrinio.com/prices?identifier={symbol}'
  })
  .then(data => {
    res.send(data);
  })
}
