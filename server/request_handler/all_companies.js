const StockData = require('./stock_data');
const queries = require('../../db/queries.js');
const companiesList = process.env.companies;

// Called from server.js "getReq"
module.exports.getReq = (res) => {
  // console.log(companiesList);
  let allCompsData = [];
  // companiesList: arr from .env
  let parsedCompaniesList = JSON.parse(companiesList);
  // console.log("allcompsData: ", allCompsData);
  console.log("parsedCompaniesList: ", parsedCompaniesList);
  for (let i = 0; i < parsedCompaniesList.length; i++) {
    let ticker = parsedCompaniesList[i];
    console.log('before StockData.StockData');
    StockData.stockData(ticker, res, 'getReq', allCompsData);
  }
};

/**
 * Called from stock_data: StockData.then
 * [make sures unique company properties (keys) are included in schema]
 * @param  {[array]} data [each val is an object with vals]
 * @return {[null]}      [calls other funcs]
 */
module.exports.consolidate = data => {

  let tableColumns = {};
  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    for (let key in obj) {
      if (!tableColumns[key]) {
        tableColumns[key] = true;
      }
    }
  }
  /**
   * [calls queries.js: sortQuery() to put in ASCII order]
   * @type {[array]}         [ASCII ordered array of properties]
   */
  sortedElements = queries.sortQuery(tableColumns);

  /**
   * [actually creates schema]
   * sortedElements type: [array]
   */
  queries.createSchema(sortedElements);
}
