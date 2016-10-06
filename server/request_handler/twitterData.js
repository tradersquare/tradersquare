const path = require('path');
const restler = require('restler');
const TWITTERKEY = process.env.TWITTERKEY;
const apiReq = require('./api_req.js');

// var tweets = axios.get('https://api.twitter.com/1.1/search/tweets.json')
// 
// var urlHappy = `https://api.twitter.com/1.1/search/tweets.json?q=%23${company}%20%3A%29`
// var data = axios.get(urlHappy);
