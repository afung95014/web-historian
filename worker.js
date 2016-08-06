var pgpLib = require('pg-promise');
var pgp = pgpLib();
var connectionString = require('./db/config');
var db = pgp(connectionString);
var helpers = require('./archive-helpers');

(function() {
  db.any('select * from sites where archived = false')
    .then(function(data) {
      // console.log(data);
      data.forEach(function(entry) {
      	helpers.downloadUrl(entry);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}());