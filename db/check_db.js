const db = require('./config.js');

module.exports = () => {
  module.exports = (res, results) => {
  db.query(`SELECT * FROM productionschema.stockdatatable;`)
  .on('row', row => {
    results.push(row);
  })
  .on('end', function(){
    console.log("created");
    res.json(results);
  })
}

}
