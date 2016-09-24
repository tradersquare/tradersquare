const StockData = require('./stock-data');
const companiesObj = require('../../db/spCompanies.js');
const companiesList = companiesObj.sp500;
const queries = require('../../db/queries.js');

let allCompsData = [];

module.exports.getReq = (res) => {
  // console.log(companiesList);
  for (let i = 0; i < /*companiesList.length*/1; i++) {
    let ticker = companiesList[i];
    StockData.stockData(ticker, res);
  }
}

module.exports.consolidate = (data) => {
  console.log('allCompsData: ', data);
  console.log(data.length);

  let finalObj = {};

  for (let i = 1; i < data.length; i++) {
    let obj = data[i];
    for (let key in obj) {
      if (!finalObj[key]) {
        finalObj[key] = true;
      }
    }
  }
  // console.log(finalObj);

  const sortedElements = queries.sortQuery(finalObj);
  queries.createSchema(sortedElements);
}
