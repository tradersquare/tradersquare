const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);
const apiReq = require('./api_req.js');

module.exports = (ticker, res) => {
  //DO NOT DELETE THIS!!!!!!
  Promise.all([
    apiReq('data_point', ticker, "name,52_week_high,52_week_low,marketcap,average_daily_volume,open_price,close_price,change,short_description")
    ])
  .then((data) => {
    // let flatData = data.reduce( (prev, curr) => Object.assign(prev, curr));
    data[0].ticker = ticker;
    res.send(data[0]);
  })
  .catch(err => {
    throw err;
  })
};
