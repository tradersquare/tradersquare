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

module.exports = (res, ticker) => {
  return new Promise(
    // apiReq('statement', ticker)
    intrinio[type](ticker, statement, year, period)
    // .on('complete', (data, response) = > {
    //
    // })
    // 'https://api.intrinio.com/prices?identifier={symbol}'
  ).then(data => {
    res.send(data);
  })
}
