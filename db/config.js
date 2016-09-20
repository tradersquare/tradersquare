const pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
  
  client
    .query('CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null)')
    .on('end', function(){
      console.log("created")
    })

  client
    .query('SELECT text FROM items;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});