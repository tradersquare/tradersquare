const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);
const db = require('../../db/config.js');
const query = require('../../db/queries.js');
const callAll = require('./all_companies.js');
const companiesList = require('../../db/spCompanies.js') || process.env.companies;

const element = {};

const statementPromise = (ticker, statement, year, period) => {
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

const dataPointPromise = (ticker) => {
  return new Promise((resolve, reject) => {
    intrinio.data_point(ticker, "fiftytwo_week_high,fiftytwo_week_low,marketcap,pricetoearnings,basiceps,volume,average_daily_volume,open_price,close_price,change,beta")
      .on('complete', (data, response) => {
        const results = data.data;
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

const zscorePromise = (ticker) => {
  return new Promise((resolve, reject) => {
    intrinio.data_point(ticker, "ticker,name,altmanzscore")
      .on('complete', (data, response) => {
        const results = data.data;
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

const historicalPricePromise = (ticker) => {
  return new Promise((resolve, reject) => {
    intrinio.historical_data(ticker, "close_price")
      .on('complete', (data, response) => {
        element.historicalPrice = data.data;
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
    statementPromise(ticker, "income_statement", "2014", "FY"),
    statementPromise(ticker, "income_statement", "2015", "FY"),
    statementPromise(ticker, "balance_sheet", "2014", "FY"),
    statementPromise(ticker, "balance_sheet", "2015", "FY"),
    statementPromise(ticker, "cash_flow_statement", "2014", "FY"),
    statementPromise(ticker, "cash_flow_statement", "2015", "FY"),
    statementPromise(ticker, "calculations", "2014", "FY"),
    statementPromise(ticker, "calculations", "2015", "FY"),
    dataPointPromise(ticker)
    ])
  .then((data) => {

    //used to create/populate db schemase/tables
    //DONT DELETE:
    query.insertRow(element);
    //

    // used to populate postgres table
    // DON'T DELETE:
    // allCompsData.push(element);

    // if (allCompsData.length === companiesList.sp500.length) {
    //   callAll.consolidate(allCompsData);
    // }


    res.send(element);
  })
  .catch(err => {
    throw err;
  })
};
