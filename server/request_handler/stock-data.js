const path = require('path')
const restler = require('restler')
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password)

let element = {};

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
    intrinio.data_point(ticker, "52_week_high,52_week_low,marketcap,pricetoearnings,basiceps,volume,average_daily_volume,open_price,close_price,change,beta")
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


module.exports = (ticker, res) => {

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
    res.send(element);
  })
  .catch(err => {
    throw err;
  })
};
