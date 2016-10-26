//Alternate approach to heroku scheduler add-on
//Will become necessary if add-on functionality ceases to work

module.exports = {
  start: function() {
  console.log('cron started');

    db.query(` INSERT INTO dummy.cron (var, numnum) VALUES ('hello', 45);`)
      .on('end', function() {
        console.log('check "dummy" table');
      })
  }
};
