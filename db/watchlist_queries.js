const db = require('./config.js');

module.exports.watchlistInsert = (res, obj) => {
  const startInsertQuery = `INSERT INTO watchlistSchema.watchlistTable`;
  const queryCols = `(userExtId, StockName, StockTicker, ClosingPrice)`
  const queryVals = `VALUES ('Akul', 'Facebook Inc.', 'FB', 1000)`;

  const insertQuery = `${startInsertQuery} ${queryCols} ${queryVals}`;
  console.log('final insertQuery: ', insertQuery);
  // db.query(insertQuery)
  //   .on('end', function() {
  //     console.log("created")
  //   })
  //   .catch(console.error)
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
