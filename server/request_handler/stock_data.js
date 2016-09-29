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

module.exports.stockData = (ticker, res, dbStuff, allCompsData, columns) => {
  Promise.all([
    apiReq('statement', ticker, "income_statement", "2014", "FY"),
    apiReq('statement', ticker, "income_statement", "2015", "FY"),
    apiReq('statement', ticker, "balance_sheet", "2014", "FY"),
    apiReq('statement', ticker, "balance_sheet", "2015", "FY"),
    apiReq('statement', ticker, "cash_flow_statement", "2014", "FY"),
    apiReq('statement', ticker, "cash_flow_statement", "2015", "FY"),
    apiReq('statement', ticker, "calculations", "2014", "FY"),
    apiReq('statement', ticker, "calculations", "2015", "FY"),
    apiReq('data_point', ticker, "ticker,name,52_week_high,52_week_low,marketcap,pricetoearnings,basiceps,volume,average_daily_volume,open_price,close_price,change,beta"),
    apiReq('financials', ticker)
    ])
  .then((data) => {

    let flatData = data.reduce( (prev, curr) => Object.assign(prev, curr));
    // console.log("DATA FROM PROMISE:", data);
    // console.log("FLATDATA FROM PROMISE:", flatData);
    /**
    * called from server file: get('schema'):
    */
    if (dbStuff === 'getReq') {
      allCompsData.push(flatData);

      let parsedCompaniesList = JSON.parse(companiesList);
      if (allCompsData.length === parsedCompaniesList.length) {
        // console.log('parsedCompaniesList: ', parsedCompaniesList);
        /**
         * calls all_companies: consolidate
         */
        callAll.consolidate(allCompsData);
      }
    }
    if (dbStuff === 'populate') {
      query.insertRow(columns, flatData);
    }

    res.send(flatData);
  })
  .catch(err => {
    console.log("***ERROR***")
    res.send({});
  })
};
