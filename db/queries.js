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
  const tableCols = sortedElements.slice(0,15).join(' varchar(20), ');
  // console.log(tableCols);
  // console.log(tableCols.slice(0,1000));
  // console.log('tableCols: ', tableCols);

  db.query('DROP TABLE productionschema.stockdatatable')
    .on('end', () => console.log('table dropped'))

  db.query(`CREATE TABLE IF NOT EXISTS productionschema.stockdatatable(id SERIAL PRIMARY KEY, ${tableCols} varchar(20));`)
    // .on('end', function(){
    //   console.log("created");
    //   console.log('tableCols: ', tableCols);
    // })
    // .on('error', console.error);
    .then(console.log)
    .catch(console.error)
}

module.exports.insertRow = sortedElements => {
    // const sortedElements = sortQuery(element);
    const colsPure = sortedElements.join(', ');
    console.log('colsPure: ', colsPure);

    let values = '';
    sortedElements.map( (key) => {
      if (key === 'nm') {
        console.log('WTFWTFWTF');
      }
      let val = element[key];
      values = `${values} '${val}',`;
    });
    values = values.slice(0, values.length - 1);

    console.log(values);

    db.query(`INSERT INTO productionschema.stockdatatable (${colsPure}) values(${values});`)
      .on('end', function(){
        console.log("inserted into productionschema.stockdatatable")
      })
      .on('error', (error) => console.log(error))
}

module.exports.sortQuery = element => {
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
