var CronJob = require('cron').CronJob;
var bot = require('./bot.js');

new CronJob({
  cronTime: "59 4 * * *",
  onTick: bot.start(),
  start: true,
  timeZone: "America/Los_Angeles"
});
