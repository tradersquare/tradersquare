const db = require('./config.js');
const callAll = require('../server/request_handler/all_companies')
const columnsList = require('./columns.js');

module.exports = function() {
  db.query(`INSERT INTO productionschema.stockdatatable();`)
    .on('end', function() {
      console.log("created")
    })
}

module.exports.createSchema = sortedElements => {
  // const sortedElements = sortQuery(element);

  const tableCols = sortedElements.join(' varchar(40), ');
  console.log(tableCols);

  // db.query('DROP TABLE productionschema.stockdatatable')
  // .on('end', () => console.log('table dropped'))
  // .then( () => {
  /*return*/
  db.query(`CREATE TABLE IF NOT EXISTS productionschema.stockdatatable(id SERIAL PRIMARY KEY, ${tableCols} varchar(40));`)
    .on('end', function() {
      console.log("created")
    })
    //   console.log('tableCols: ', tableCols);
    // })
    // .on('error', console.error);
    // .then(console.log)
    // })
    .catch(console.error)
}

/**
 * [sortQuery description]
 * @param  {[object]} element [description]
 * @return {[array]}         [description]
 */
function sortQuery(element) {
  let indexedElements = [];
  for (let key in element) {
    indexedElements.push(key);
  }
  const sortedElements = indexedElements.sort();
  return sortedElements;
}

module.exports.sortQuery = sortQuery;

module.exports.insertRow = elements => {
  console.log(columnsList);
  for (let key in elements) {
    if (columnsList.columns.indexOf(key) === -1) {
      delete elements[key];
    }
  }
  console.log('testing insertRow');
  let sortedArr = sortQuery(elements);
  let colsPure = '';

  sortedArr.map(val => {
    colsPure = colsPure + val + ', ';
  })
  colsPure = colsPure.slice(0, colsPure.length - 2);

  let values = '';

  sortedArr.map(key => {
    let val = elements[key];
    values = `${values} '${val}',`;
  });

  values = values.slice(0, values.length - 1);

  db.query(`INSERT INTO productionschema.stockdatatable (${colsPure}) values(${values});`)
    .on('end', function() {
      console.log("inserted into productionschema.stockdatatable")
    });
}
