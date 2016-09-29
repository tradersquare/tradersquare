const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);
const apiReq = require('./api_req.js');

module.exports = (ticker, res) => {

  Promise.all([
    apiReq('data_point', ticker, "ticker,name,52_week_high,52_week_low,marketcap,basiceps,volume,average_daily_volume,open_price,close_price,change,beta,short_description"),
    apiReq('financials', ticker)
    ])
  .then((data) => {
    let flatData = data.reduce( (prev, curr) => Object.assign(prev, curr));
    res.send({data: flatData});
  })
  .catch(err => {
    throw err;
  })
};
