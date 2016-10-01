const db = require('./config.js');


module.exports = (res, results, params) => {
    console.log('params in db query: ', params);
    db.query(`select ticker, close_price, pricetoearnings
    from productionschema.realdata
    where pricetoearnings is distinct from 'nm'
    and cast(pricetoearnings as decimal) > 30
    order by pricetoearnings;`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log('results!!!', results);
    res.send(results);
  })
}
