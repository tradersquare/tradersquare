const StockData = require('./stock_data');
const companiesObj = process.env.companies;
const companiesList = companiesObj.sp500;
>>>>>>> [bug-fix](deploy): add companies env conditional
const queries = require('../../db/queries.js');

let allCompsData = [];

module.exports.tableColumns;
let tableColumns = {};
module.exports.getReq = (res) => {
  // console.log(companiesList);
  for (let i = 0; i < companiesList.length; i++) {
    let ticker = companiesList[i];
    StockData.stockData(ticker, res);
  }
}

module.exports.consolidate = (data) => {
  console.log('allCompsData: ', data);
  console.log(data.length);


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
