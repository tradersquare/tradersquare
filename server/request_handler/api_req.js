const path = require('path');
const username = process.env.INTRINIO_USER;
const password = process.env.INTRINIO_PASSWORD;
const intrinio = require(path.resolve( __dirname, "intrinio"))(username, password);

/**
 * [main Func, called from different places]
 * [primarily called from stock_data.js: stockData]
 * @param  {[string]} type      [finds which "intrinio.js" method to call]
 * @param  {[string]} ticker    [company ticker passed in]
 * @param  {[string]} statement [things API call should get back], optional
 * @param  {[num]} year      [description], optional
 * @param  {[type]} period    [description], optional
 * @return {[object]}           [cleaned up object with key:val pairs,
 *                               returns to "data" param of .then inside stock_data]
 */
module.exports = (type, ticker, statement, year, period) => {
  return new Promise((resolve, reject) => {
    intrinio[type](ticker, statement, year, period)
      .on('complete', (data, response) => {
        const results = data.data;
        console.log("results = data.data:", data);
        const element = {};

        for(let i of results){
          // console.log("YEAR:", year);
          // console.log('this is i: ', i);
          // called below
          check52Week(i, element, year);
        }
        // console.log('before resolving element, element is: ', element);
        resolve(element);
      })
      .on('error', (error) => {
        console.log('follwing error from api_req.js: module.exports');
        reject(error);
      })
  });
}

/**
 * [cleans up trouble property names]
 * @param  {[object]} i       [holds one entire property from API]
 * @param  {[array]} element [storage for return vals from this func]
 * @param  {[type]} year    [description]
 * @return {[null]}         [just pushes to 'element' arr]
 */
const check52Week = (i, element, year) => {
  // console.log("i.tag:", i.tag);
  const property = i.tag || i.item;
  // console.log('property name: ', property);
  if (property === "52_week_high") {
    element["fiftytwo_week_high"] = i.value;
  } else if (property === "52_week_low") {
    element["fiftytwo_week_low"] = i.value;
  } else {
    // console.log('year', year);
    date = (year === undefined) ? '' : year;
    // console.log("DATE: ", date);
    element[property + date] = i.value;
  }
}
