const db = require('./config.js');


module.exports = (res, results) => {
  db.query(`select ticker, close_price, pricetoearnings
    from productionschema.realdata
    where pricetoearnings is distinct from 'nm'
    and cast(pricetoearnings as decimal) > 30
    order by pricetoearnings;`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log("created");
    res.json(results);
  })
}
