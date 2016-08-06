var pgpLib = require('pg-promise');
var pgp = pgpLib();
var connectionString = require('./db/config');
var db = pgp(connectionString);
var helpers = require('./archive-helpers');


//when worker.js runs, it will do work every 10 seconds
//it will archive any sites that have not been archived yet

setInterval(function() {
  db.each('select * from sites where archived = false', [], function(site) {
    helpers.downloadUrl(site);
  })
    .catch(function(err) {
      console.log(err);
    });
}, 10000);
