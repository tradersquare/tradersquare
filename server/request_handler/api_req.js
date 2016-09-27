const path = require('path');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);

module.exports = (type, ticker, statement, year, period) => {
  return new Promise((resolve, reject) => {
    intrinio[type](ticker, statement, year, period)
      .on('complete', (data, response) => {
        const results = data.data;
        const element = {};
        // console.log("data:", data);
        // console.log("results:", results);
        for(let i of results){
          check52Week(i, element, year);
        }
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  });
}

const check52Week = (i, element, year) => {
  console.log("i.tag:", i.tag);
  if (i.tag === "52_week_high") {
    element["fiftytwo_week_high"] = i.value;
  } else if (i.tag === "52_week_low") {
    element["fiftytwo_week_low"] = i.value;
  } else {
    element[i.tag+year] = i.value;
  }
}
