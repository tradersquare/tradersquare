const path = require('path')
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
        console.log(element);
        resolve(element);
      })
      .on('error', (error) => {
        reject(error);
      })
  })
}



module.exports = (ticker, res) => {

  Promise.all([
    statementPromise(ticker)
    ])
  .then((something)=>{

    // const results = data.data;
    // for(let i of results){
    //   element[i.tag] = i.value;
    // }
    console.log(something);
    res.send(something);

  })
  .catch(err => {
    throw err;
  })

  

}