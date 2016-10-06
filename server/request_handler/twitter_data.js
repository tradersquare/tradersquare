const path = require('path');
const restler = require('restler');
const TWITTER_KEY = process.env.TWITTER_KEY;
const TWITTER_SECRET = process.env.TWITTER_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const apiReq = require('./api_req.js');
const Twit = require('twit');
const _ = require('underscore');
const nlp = require('nlp_compromise');
const sentiment = require('sentiment');

module.exports = (handle) => {
  let T = new Twit({
    consumer_key: TWITTER_KEY,
    consumer_secret: TWITTER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_SECRET
  });

  T.get('search/tweets', { q: `#${handle} stock`, count: 100 }, function(err, data, response) {
    const package = data.statuses;
    const allScores = package.map(function(tweet) {
      console.log(tweet.text);
      sent = sentiment(tweet.text);
      console.log(sent.score);
      return sent.score;
    })
    .reduce(function(tot, cur) {
      return tot + cur;
    });
    console.log('reduced: ' ,allScores);
  })
}
