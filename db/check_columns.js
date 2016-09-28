const db = require('./config.js');

module.exports = (res, results) => {
  db.query(`SELECT column_name from information_schema.columns WHERE table_schema = 'productionschema' AND table_name = 'stockdatatable';`)
  .on('row', row => {
    console.log("ROW: ", row.column_name);
    results.push(row.column_name);
  })
  .on('end', function(){
    console.log("selected");
    res.json(results);
  })
}
