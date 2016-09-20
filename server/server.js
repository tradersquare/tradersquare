require('dotenv').config();

//NODE MODULES
const express                 = require('express');
const request                 = require('request');
const bodyParser              = require('body-parser');
const path                    = require('path');
const webpack                 = require('webpack');
const webpackDevMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware    = require('webpack-hot-middleware');


//REQUEST HANDLER MODULES
const stockPrices             = require('./request_handler/stock-prices');

const db = require('../db/config');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(express.static(path.join(__dirname, '/client')));
// uncomment after we figure out what the client folder will be



// var intrinio = require(path.resolve( __dirname, "intrinio"))(username, password)



app.post('/stockData', function(req, res){
  const ticker = req.body.ticker;
  stockPrices(ticker, res);  
})

app.post('/statementData', function(req, res){
  // const ticker = req.body.ticker;
  // statementData(ticker);
})

app.listen(3000, function(){
  console.log('Server started, listening on port:', 3000);
});
