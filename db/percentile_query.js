const db = require('./config.js');


module.exports = (res, results, params) => {
  console.log(params);
    db.query(`select name, [INSERT COLUMN NAME] ntile(100) over (order by [INSERT COLUMN NAME]) as quartile from productionschema.realdata;`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log("created");
    res.json(results);
  })
}
