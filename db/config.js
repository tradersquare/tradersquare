const pg                      = require('pg');

pg.defaults.ssl = true;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect((err) => {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client.query('CREATE TABLE IF NOT EXISTS productionschema.stockdatatable(id SERIAL PRIMARY KEY, text VARCHAR(40) not null)')
      .on('end', function(){
        console.log("created")
      })
});



module.exports = client;
