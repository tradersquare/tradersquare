const db = require('./config.js');


module.exports = (res, results, params) => {
  let parsedParams = JSON.parse(params);
  if (parsedParams.type === 'Value') {
    console.log("entered value", parsedParams.type)
    db.query(`select ticker, close_price, ${parsedParams.strat}
      from productionschema.realdata
      where ${parsedParams.strat} is distinct from 'nm'
      and cast(${parsedParams.strat} as decimal) ${parsedParams.sign} ${parsedParams.input}
      order by ${parsedParams.strat};`)
      .on('row', row => {
        results.push(row);
      })
      .on('end', function() {
        res.send(results);
      })
  } else {
    db.query(`select ticker, close_price, ${parsedParams.strat}, ntile(100) over (order by cast(${parsedParams.strat} as decimal)) as percentile from productionschema.realdata where ${parsedParams.strat} is distinct from 'nm';`)
      .on('row', row => {
        results.push(row);
      })
      .on('end', function() {
        const percentile = results.filter((obj) => {
          const val1 = parsedParams.sign === ">" ? obj.percentile : parsedParams.input;
          const val2 = parsedParams.sign === "<" ? obj.percentile : parsedParams.input;
          if (val1 > val2){
            return obj;
          }
        })
        console.log(percentile);

        res.send(percentile);
      })
  }
}
