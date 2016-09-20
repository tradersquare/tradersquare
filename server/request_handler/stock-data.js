dataconst path = require('path')
const restler = require('restler')
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password)

let element = {};

const statementPromise = (ticker) => {
  return new Promise((resolve, reject) => {
    intrinio.statement(ticker, 'income_statement', '2014', 'FY')
      .on('complete', (data, response) => {
        const results = data.data;
        for(let i of results){
          element[i.tag] = i.value;
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
};

const datapointPromise = (ticker) => {
  return new Promise((resolve, reject) => {
    intrinio.data_point(ticker, "52_week_high,52_week_low,marketcap,pricetoearnings,basiceps,volume,average_daily_volume")
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


module.exports = (ticker, res) => {

  Promise.all([
    statementPromise(ticker), datapointPromise(ticker)
    ])
  .then((data) => {
    res.send(element);
  })
  .catch(err => {
    throw err;
  })
};
