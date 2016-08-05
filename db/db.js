var pgpLib = require('pg-promise');
var pgp = pgpLib();
var connectionString = require('./config');
var db = new pgp(connectionString);

db.query('CREATE TABLE sites(id SERIAL PRIMARY KEY not null, url VARCHAR(150) not null, archived BOOLEAN not null, data VARCHAR(2000));');
console.log('created table!');