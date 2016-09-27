const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);
const db = require('../../db/config.js');
const query = require('../../db/queries.js');
const callAll = require('./all_companies.js');
const companiesList = process.env.companies;
const apiReq = require('./api_req.js');


const statementPromise = (ticker, statement, year, period, type) => {
  return new Promise((resolve, reject) => {
    intrinio.statement(ticker, statement, year, period)
      .on('complete', (data, response) => {
        const results = data.data;
        for(let i of results){
          element[i.tag+year] = i.value;
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
};

const dataPointPromise = (type, ticker) => {
  return new Promise((resolve, reject) => {
    intrinio[type](ticker, "fiftytwo_week_high,fiftytwo_week_low,marketcap,pricetoearnings,basiceps,volume,average_daily_volume,open_price,close_price,change,beta")
      .on('complete', (data, response) => {
        const results = data.data;
        const element = {};
        for(let i of results){
          element[i.item] = i.value;
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
};

//used to populate database
//DON'T DELETE:
let allCompsData = [];
//

module.exports.stockData = (ticker, res) => {

  Promise.all([
    apiReq('statement', ticker, "income_statement", "2014", "FY"),
    apiReq('statement', ticker, "income_statement", "2015", "FY"),
    apiReq('statement', ticker, "balance_sheet", "2014", "FY"),
    apiReq('statement', ticker, "balance_sheet", "2015", "FY"),
    apiReq('statement', ticker, "cash_flow_statement", "2014", "FY"),
    apiReq('statement', ticker, "cash_flow_statement", "2015", "FY"),
    apiReq('statement', ticker, "calculations", "2014", "FY"),
    apiReq('statement', ticker, "calculations", "2015", "FY"),
    dataPointPromise('data_point', ticker)
    ])
  .then((data) => {
    // console.log('DATA: ', data);
    let flatData = data.reduce( (prev, curr) => Object.assign(prev, curr));
    console.log(flatData);
    //used to create/populate db schemase/tables
    //DONT DELETE:
    // query.insertRow(flatData);
    //

    // used to populate postgres table
    // DON'T DELETE:
    // allCompsData.push(flatData);

    // if (allCompsData.length === companiesList.sp500.length) {
    //   callAll.consolidate(allCompsData);
    // }

    res.send(flatData);
  })
  .catch(err => {
    throw err;
  })
};
