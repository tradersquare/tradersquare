const db = require('./config.js');
const callAll = require('../server/request_handler/all_companies')

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

/**
 * [sortQuery description]
 * @param  {[object]} element [description]
 * @return {[array]}         [description]
 */
module.exports.sortQuery = sortQuery;

function sortQuery(element) {
  let indexedElements = [];
  for (let key in element) {
    indexedElements.push(key);
  }
  const sortedElements = indexedElements.sort();
  return sortedElements;
}

module.exports.createSchema = sortedElements => {

  const varChar = ' varchar(40), ';
  const tableCols = sortedElements.join(varChar);
  let dummyCols = '';

  for (let i = 0; i < 20; i++) {
    dummyCols = dummyCols + `Equation${i}${varChar}`;
  }

  dummyCols = dummyCols.slice(0, dummyCols.length - 2);

  db.query(`CREATE TABLE IF NOT EXISTS productionschema.realdata (id SERIAL PRIMARY KEY, ${tableCols} varchar(40), ${dummyCols});`)
    .on('end', function() {
      console.log("created")
    })
    .catch(console.error)
}

module.exports.insertRow = (data, elements) => {
  for (let key in elements) {
    if (data.indexOf(key) === -1) {
      delete elements[key];
    }
  }
  // console.log('testing insertRow');
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

  db.query(`INSERT INTO productionschema.realdata (${colsPure}) values(${values})`)
    .on('end', function() {
      console.log("inserted into productionschema.stockdatatable")
    });
}

// module.exports.updateRow = (element) => {
//   db.query(`UPDATE productionschema.stockdatatable SET `)
// }
