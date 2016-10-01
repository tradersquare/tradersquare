const db = require('./config.js');


module.exports = (res, results, params) => {
    console.log('params in db query: ', JSON.parse(params));
    let parsedParams = JSON.parse(params);
    db.query(`select ticker, close_price, ${parsedParams.strat}
    from productionschema.realdata
    where ${parsedParams.strat} is distinct from 'nm'
    and cast(${parsedParams.strat} as decimal) ${parsedParams.sign} ${parsedParams.input}
    order by ${parsedParams.strat};`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log('results!!!', results);
    res.send(results);
  })
}
