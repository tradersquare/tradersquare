const db = require('./config.js');

module.exports = (res, results, resolve) => {
  db.query(`SELECT column_name from information_schema.columns WHERE table_schema = 'productionschema' AND table_name = 'realdata';`)
  .on('row', row => {
    results.push(row.column_name);
  })
  .on('end', function(){
    console.log("selected");
    resolve(results);
  })
}
