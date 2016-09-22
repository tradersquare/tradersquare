const pg                      = require('pg');
const db                      = require('../db/config');

pg.defaults.ssl = true;

const client = new pg.Client(process.env.DATABASE_URL);

client.connect((err) => {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');
});

module.exports = client;
