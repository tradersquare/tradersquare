if(process.env.NODE_ENV !== "production") {
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
const config                  = require('../webpack.config.js');
const db                      = require('../db/config');
const pg                      = require('pg');
const dbURL                   = process.env.DATABASE_URL;

//REQUEST HANDLER MODULES
const stockData               = require('./request_handler/stock-data');


pg.defaults.ssl = true;
pg.connect(dbURL, db);

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
  stats: {colors:true}
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
app.get('/stockData/*', function(req, res){
  const ticker = req.url.slice(11).toUpperCase();
  stockData(ticker, res);
})

app.get('/stockDataTmp/*', function(req, res){
  const ticker = req.url.slice(14).toUpperCase();
  const dummy = {
    data: {
    ticker: ticker,
    altmanzscore: Math.random(),
    assetturnover: Math.random(),
    grossmargin: Math.random(),
    pricetoearnings: Math.random(),
    currentratio: Math.random(),
    epsgrowth: Math.random(),
    name: `${ticker}, inc.`
    }
  }
  console.log(dummy);
  res.send(dummy)
})

app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.listen(process.env.PORT || 3000, function(){
  console.log('Server started, listening on port:', 3000);
});
