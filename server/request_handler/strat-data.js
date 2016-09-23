const path = require('path');
const restler = require('restler');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);

let element = {};

const calculationPromise = (ticker) => {
  return new Promise((resolve, reject) => {
    intrinio.data_point(ticker, "ticker,name,altmanzscore,assetturnover,grossmargin,pricetoearnings,currentratio,epsgrowth,divpayoutratio,debttoequity,enterprisevalue,earningsyield,netincomegrowth,roe")
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
    calculationPromise(ticker),
    ])
  .then((data) => {
    console.log("******", element)
    res.send({data: element});
  })
  .catch(err => {
    throw err;
  })
};