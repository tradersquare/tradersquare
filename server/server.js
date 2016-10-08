if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

//NODE MODULES
const express                 = require('express');
const request                 = require('request');
const bodyParser              = require('body-parser');
const path                    = require('path');
const webpack                 = require('webpack');
const webpackDevMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware    = require('webpack-hot-middleware');
const config                  = require('../webpack.config');
const db                      = require('../db/config');
const pg                      = require('pg');
const dbURL                   = process.env.DATABASE_LINK;
const callAll                 = require('./request_handler/all_companies');
const GrabDataDB              = require('../db/db_grab_data');
const GrabFilteredDataDB      = require('../db/db_filter_data');
const getPercentile           = require('../db/percentile_query');
const getGraphData            = require('./request_handler/graph_data');
const {genericTableCreator}   = require('../db/queries');
const {addExtraCols}          = require('./server_helper');
const {watchListTable}        = require('../db/db_tables_store');
const {watchlistInsert}       = require('../db/watchlist_queries');
const {queryAllRowsWatchlist} = require('../db/watchlist_queries');

const tables = {watchListTable};
//REQUEST HANDLER MODULES
const StockData = require('./request_handler/stock_data');
const stratData = require('./request_handler/strat_data');
const metricData = require('./request_handler/metric_data');
const tweetData = require('./request_handler/twitter_data');

const app = module.exports = express();
// const router = express.Router();

/**
 * For webpack
 */
// router.get('/', someController);
// app.use(router);
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    },
    noInfo: true
}))
  // app.use(webpackHotMiddleware(compiler, {
  //   log: console.log
  // }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, '../public')));
// uncomment after we figure out what the client folder will be

// var intrinio = require(path.resolve( __dirname, "intrinio"))(username, password)
//'{"ticker": "FB"}'
app.get('/stockData/*', function(req, res) {
  const ticker = req.url.slice(11).toUpperCase();
  StockData.stockData(ticker, res);
});

/**
 * use schema endpoint for dev only
 * not connected to client
 * use in postman with env headers
 * invokes getReq() in allCompanies.js
 */
app.get('/schema/', function(req, res) {
  callAll.getReq(res);
});

app.get('/populate/', function(req, res) {
  callAll.populate(res);
});

app.get('/getDataDB/', function(req, res) {
  let results = [];
  GrabDataDB(res, results);
});

app.get('/getFilteredDataDB/*', function(req, res) {
  // let results = [];
  let params = req.query.filter;
  GrabFilteredDataDB(res, params);
})

app.get('/getPercentile/*', function(req, res) {
  const parsed = req.url.slice(14).split("/")
  const ticker = parsed[1].toUpperCase();
  const metric = parsed[2];
  let results = [];
  getPercentile(res, results, ticker, metric);
})

app.get('/getAllCompany/', function(req, res) {
  let results = [];
  GrabDataDB(res, results);
});

app.get('/getBasicInfo/*', function(req, res) {
  console.log('inside basic info listener');
  const ticker = req.url.slice(14).toUpperCase();
  stratData(ticker, res);
});

app.get('/getMetrics/*', function(req, res){
  const ticker = req.url.slice(12).toUpperCase();
  metricData(ticker, res)
})

app.get('/getGraphData/*', function(req, res) {
  ticker = req.url.slice(14).toUpperCase();
  getGraphData(res, ticker);
})

app.get('/getTwitterData/*', function(req, res) {
  handle = req.url.slice(16).toUpperCase();
  console.log('twitterslice', handle);
  tweetData(handle, res);
});

/**
 * [floating endpoint for easily creating db tables]
 * @req.url {[string]}    after localhost:3000/ type in number of extra cols
 *                        then type in /[table-name], as stored in db_tables_store.js
 *                        looks like: localhost:3000/[integer]/[table_name]
 * note: table in db_tables_store.js must be created as arr as follows:
 * [schemaName, tableName, {colTitle: title1, colType: type, optionalSize: size}, ...{}]
 * in above, each object starting at index 2 represents a column
 * genericTableCreator returns res.send(finalQueryString), found in queries.js
 * addExtraCols found in server_helper.js
 * note: restart server after failed attempt of making any table
 */
app.get('/createGenericTable/*', function(req, res) {
  const extraCols = req.url.slice(20, 22);
  const table = req.url.slice(23);
  // res.status(200).send(req.url.slice(22));
  const tableObj = tables[table];
  // console.log('inside get req:', tableObj);
  addExtraCols(extraCols, tableObj);
  // console.log('modified tableObj: ', tableObj);
  genericTableCreator(tableObj, res);
});

/**
 * endpoint accessed by: add_stock action
 * watchListInsert found in: watchlist_queries.js
 */
app.post('/addToWatchlist', function(req, res) {
  // console.log('req.body: ', req.body);
  watchlistInsert(res, req.body);
})

app.use('/getFromWatchList', function(req, res) {
  console.log('getFromWatchList endpoint reached');
  queryAllRowsWatchlist(res);
})

app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Server started, listening on port:', 3000);
});
