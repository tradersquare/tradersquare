var CronJob = require('cron').CronJob;
var bot = require('./bot.js');

new CronJob({
  cronTime: "58 9,11,16,20,22 * * *", // everyday, 9:13, 11:13, 4:13, 8:13,
  onTick: bot.start(),
  start: true,
  timeZone: "America/Los_Angeles"
});
