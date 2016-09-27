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


const statementPromise = (ticker, statement, year, period, type) => {
  return new Promise((resolve, reject) => {
    intrinio.statement(ticker, statement, year, period)
      .on('complete', (data, response) => {
        const results = data.data;
        for (let i of results) {
          element[i.tag + year] = i.value;
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
};

const dataPointPromise = (type, ticker, items) => {
  return new Promise((resolve, reject) => {
    intrinio[type](ticker, items)
      .on('complete', (data, response) => {
        const results = data.data;
        for (let i of results) {
          if (i.item === "52_week_high") {
            element["fiftytwo_week_high"] = i.value;
          } else if (i.item === "52_week_low") {
            element["fiftytwo_week_low"] = i.value;
          } else {
            element[i.item] = i.value;
          }
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
};

//used to populate database
//DON'T DELETE (for now):
// let allCompsData = [];
//

module.exports.stockData = (ticker, res, dbStuff, allCompsData) => {
  Promise.all([
    apiReq('statement', ticker, "income_statement", "2014", "FY"),
    apiReq('statement', ticker, "income_statement", "2015", "FY"),
    apiReq('statement', ticker, "balance_sheet", "2014", "FY"),
    apiReq('statement', ticker, "balance_sheet", "2015", "FY"),
    apiReq('statement', ticker, "cash_flow_statement", "2014", "FY"),
    apiReq('statement', ticker, "cash_flow_statement", "2015", "FY"),
    apiReq('statement', ticker, "calculations", "2014", "FY"),
    apiReq('statement', ticker, "calculations", "2015", "FY"),
    dataPointPromise('data_point', ticker, "ticker,name,52_week_high,52_week_low,marketcap,pricetoearnings,basiceps,volume,average_daily_volume,open_price,close_price,change,beta")
    ])
  .then((data) => {
    // console.log('DATA: ', data);
    let flatData = data.reduce( (prev, curr) => Object.assign(prev, curr));
    console.log(flatData);
    //note: fix following to not be commented out (add conditional)
    //condition: should check if already in DB
    //used to create/populate db schemase/tables
    //DONT DELETE:
    // use check_db.js in db folder to verify
    // query.insertRow(flatData);
    //

    // used to populate postgres table
    // DON'T DELETE:
    /**
    * called from server file: get('schema'):
    */
    if (dbStuff === 'getReq') {
      allCompsData.push(flatData);

      let parsedCompaniesList = JSON.parse(companiesList);

      if (allCompsData.length === parsedCompaniesList.length) {
        callAll.consolidate(allCompsData);
      }
    }

    res.send(flatData);
  })
  .catch(err => {
    throw err;
  })
};
