const StockData = require('./stock_data');
const queries = require('../../db/queries.js');
const companiesList = process.env.companies;

//let tableColumns = {};
// module.exports.tableColumns; //not sure why this is here... what is it doing...?
module.exports.getReq = (res) => {
  // console.log(companiesList);
  let allCompsData = [];
  // companiesList: arr from .env
  let parsedCompaniesList = JSON.parse(companiesList);
  for (let i = 0; i < parsedCompaniesList.length; i++) {
    let ticker = parsedCompaniesList[i];
    StockData.stockData(ticker, res, 'getReq', allCompsData);
  }
};

module.exports.consolidate = data => {
  console.log('allCompsData: ', data);
  console.log(data.length);

  let tableColumns = {};
  for (let i = 1; i < data.length; i++) {
    let obj = data[i];
    for (let key in obj) {
      if (!tableColumns[key]) {
        tableColumns[key] = true;
      }
    }
  }

  sortedElements = queries.sortQuery(tableColumns);
  queries.createSchema(sortedElements);
}
