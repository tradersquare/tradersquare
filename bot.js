module.exports = {
  start: function() {
<<<<<<< HEAD
      console.log('cron');
=======
    //put here dummy insert into table, test in terminal first
      console.log('cron');

    db.query(` INSERT INTO dummy.cron (var, numnum) VALUES ('hello', 45);`)
      .on('end', function() {
        console.log('check dummy yo');
      })
>>>>>>> [deploy]: change cron time to 47, 4 min in future
  }
};
