const db = require('./config.js');

module.exports = function() {
  db.query(`INSERT INTO productionschema.stockdatatable();`)
    .on('end', function(){
      console.log("created")
    })
}

module.exports.createSchema = sortedElements => {
  // const sortedElements = sortQuery(element);

  const varChar = 'varchar(20)';
  const tableCols = sortedElements.join(' varchar(20), ');
  console.log(tableCols);
  // console.log(tableCols.slice(0,1000));
  // console.log('tableCols: ', tableCols);

  // db.query('DROP TABLE productionschema.stockdatatable')
    // .on('end', () => console.log('table dropped'))
    // .then( () => {
      /*return*/ db.query(`CREATE TABLE IF NOT EXISTS productionschema.stockdatatable(id SERIAL PRIMARY KEY, ${tableCols} varchar(20));`)
      // .on('end', function(){
      //   console.log("created");
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
    if (key === 'nm') {
      console.log('WTFWTFWTF');
    }
    indexedElements.push(key);
  }
  const sortedElements = indexedElements.sort();
  console.log(sortedElements);
  return sortedElements;
}

module.exports.sortQuery = sortQuery;

module.exports.insertRow = elements => {
    // const sortedElements = sortQuery(element);
    console.log(typeof elements);

    /**
     * [sortedArr description]
     * @type {[array]}
     */
    const sortedArr = sortQuery(elements);
    // console.log('sortedArr: ', sortedArr);


    let colsPure ='';
    // for (let key in sortedArr) {
    //   colsPure = colsPure + key + ', '
    // }

    sortedArr.map( val => {
      colsPure = colsPure + val + ', ';
    })
    colsPure = colsPure.slice(0, colsPure.length - 2);
    console.log(colsPure);

    let values = '';

    sortedArr.map( key => {
      let val = elements[key];
      values = `${values} '${val}',`;
    });


    values = values.slice(0, values.length - 1);
    console.log(values);

    // console.log(values);

    db.query(`INSERT INTO productionschema.stockdatatable (${colsPure}) values(${values});`)
      .on('end', function(){
        console.log("inserted into productionschema.stockdatatable")
      })
    //   .on('error', (error) => console.log(error))
}
