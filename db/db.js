var pg = require('pg');
var connectionString = require('./config');

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE sites(id SERIAL PRIMARY KEY not null, url VARCHAR(150) not null, archived BOOLEAN not null)');

query.on('end', function() { client.end(); });