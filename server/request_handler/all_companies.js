const StockData = require('./stock_data');
const companiesList = process.env.companies;
const queries = require('../../db/queries.js');

//let tableColumns = {};
// module.exports.tableColumns; //not sure why this is here... what is it doing...?
module.exports.getReq = (res) => {
  // console.log(companiesList);
  let allCompsData = [];
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
  // console.log(tableColumns);

  sortedElements = queries.sortQuery(tableColumns);
  queries.createSchema(sortedElements);
}
