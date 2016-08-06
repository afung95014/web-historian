var pgpLib = require('pg-promise');
var pgp = pgpLib();
var connectionString = require('../db/config');
var db = pgp(connectionString);
var helpers = require('./archive-helpers');


//when worker.js runs, it will do work every 60 seconds
//it will archive any sites that have not been archived yet

setInterval(function() {
  db.any('select * from sites where archived = false')
    .then(function(data) {
      console.log(data);
      data.forEach(function(entry) {
      	helpers.downloadUrl(entry);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}, 60000);