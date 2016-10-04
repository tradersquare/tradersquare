const db = require('./config.js');


module.exports = (res, results, ticker, metric) => {
    db.query(`select ticker, ${metric}, ntile(100) over (order by cast(${metric} as decimal)) as percentile from productionschema.realdata where ${metric} is distinct from 'nm';`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log(results);
    const percentile = results.find((obj) => {
      return obj.ticker === ticker
    })
    if(percentile){
      percentile.metric = metric;
    }
    res.json(percentile || null);
  })
}
