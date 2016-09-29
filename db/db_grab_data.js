const db = require('./config.js');


module.exports = (res, results) => {
  db.query(`SELECT * FROM productionschema.realdata;`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log("created");
    res.json(results);
  })
}
