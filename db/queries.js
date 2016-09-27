const db = require('./config.js');
const callAll = require('../server/request_handler/all_companies')
const columnsList = require('./columns.js');

module.exports = function() {
  db.query(`INSERT INTO productionschema.stockdatatable();`)
    .on('end', function() {
      console.log("created")
    })
}

/**
 * Called from all_companies.js: consolidate
 * [creates Schema]
 * @param  {[array]} sortedElements [array of keys, in ASCII order]
 * @return {[null]}                []
 */
module.exports.createSchema = sortedElements => {
  // console.log('inside createSchema function: sortedElements: ', sortedElements);
  const varChar = ' varchar(40), ';
  const tableCols = sortedElements.join(varChar);
  let dummyCols = '';

  for (let i = 0; i < 20; i++) {
    dummyCols = dummyCols + `Equation${i}${varChar}`;
  }

  dummyCols = dummyCols.slice(0, dummyCols.length - 2);
  console.log("TABLECOLS:", tableCols, "DUMMYCOLS:", dummyCols);
  db.query(`CREATE TABLE IF NOT EXISTS productionschema.stockdatatable1 (id SERIAL PRIMARY KEY, ${tableCols} varchar(40), ${dummyCols});`)
    .on('end', function() {
      console.log("created")
    })
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

  // DROP TABLE command
  // 'DROP TABLE productionschema.stockdatatable'
