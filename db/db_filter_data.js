const db = require('./config.js');

let counter = 0;
module.exports = (res, params) => {
  console.log("PARSED PARAMS: ", params);
  let filterPromises = params.map((obj) => {
    return new Promise((resolve, reject) => {
      let tempResults = [];
      let results = [];
      let parsedParams = JSON.parse(obj);
      if (parsedParams.type === 'Value') {
        db.query(`select ticker, close_price, ${parsedParams.strat}
          from productionschema.realdata
          where ${parsedParams.strat} is distinct from 'nm'
          and cast(${parsedParams.strat} as decimal) ${parsedParams.sign} ${parsedParams.input}
          order by ${parsedParams.strat};`)
          .on('row', row => {
            results.push(row);
          })
          .on('end', function() {
            resolve(results);
          })
      } else {
        db.query(`select ticker, close_price, ${parsedParams.strat}, ntile(100) over (order by cast(${parsedParams.strat} as decimal)) as percentile from productionschema.realdata where ${parsedParams.strat} is distinct from 'nm';`)
          .on('row', row => {
            tempResults.push(row);
          })
          .on('end', function() {
            const percentile = tempResults.filter((obj) => {
              const val1 = parsedParams.sign === ">" ? obj.percentile : parsedParams.input;
              const val2 = parsedParams.sign === "<" ? obj.percentile : parsedParams.input;
              if (val1 > val2) {
                return obj;
              }
            })
            results.push(percentile);

            console.log("RESULTS: ", results);

            resolve(results[0]);
          })
      }
    })
  })

  Promise.all(filterPromises)
    .then((data) => {
      let shortest = Number.POSITIVE_INFINITY;
      let histogram = {};

      let dataConcat = [].concat.apply([], data);


      for (let data of dataConcat) {
        if (!histogram[data.ticker]) {
          histogram[data.ticker] = [];
        }
        histogram[data.ticker].push(data);
      }

      let finalData = [];

      for (let key in histogram) {
        if (histogram[key].length === data.length) {
          histogram[key] = Object.assign(...histogram[key]);
          finalData.push(histogram[key]);
        }
      }
      res.send(finalData);
    })
}
