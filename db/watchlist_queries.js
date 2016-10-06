const db = require('./config.js');

module.exports.watchlistInsert = (res, rowData) => {
  console.log('watchlistInsert inherited rowData:', rowData);
  const startInsertQuery = `INSERT INTO watchlistSchema.watchlistTable`;
  const queryCols = `(userExtId, StockName, StockTicker, ClosingPrice)`
  const queryVals = `VALUES (45, 'Facebook Inc.', 'FB', 1000)`;

  const insertQuery = `${startInsertQuery} ${queryCols} ${queryVals}`;
  console.log('final insertQuery: ', insertQuery);
  db.query(insertQuery)
    .on('end', function() {
      console.log("added: ", insertQuery);
    })
    .catch(console.error)
  res.end();
}

function notInWatchlistTable() {

}

function queryAllRowsWatchlist() {

}

module.exports.queryAllRowsWatchlist = queryAllRowsWatchlist;

function queryWatchlistRow() {

}

module.exports.queryWatchlistRow = queryWatchlistRow;

/*From postgres terminal:
to get into postgres DB, must have postgres installed on local machine
need entry username and password (ask developers)
to get all entries for this table: [SELECT * FROM watchlistSchema.watchlistTable;]

to see all schemas: [\dn;]
to see all tables in public: [\d]

drop table: [DROP TABLE [schemaName].[tableName]]
delete all rows in table: [DELETE FROM watchlistSchema.watchlistTable;]
delete specific rows: https://www.postgresql.org/docs/8.2/static/sql-delete.html
*/
