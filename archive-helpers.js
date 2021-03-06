var pgpLib = require('pg-promise');
var pgp = pgpLib();
var connectionString = require('./db/config');
var db = pgp(connectionString);
var request = require('request');

exports.addEntry = function(res, newUrl) {
  db.one("insert into sites(url, archived) values($1, $2) returning id", [newUrl, false])
    .then(function (data) {
      res.json(data.id);
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.getDataStatus = function(res, id) {
  db.one("select * from sites where id = $1",[id])
    .then(function(data) {
      if(data.archived === false) {
      	console.log('data not ready!');
      	res.sendStatus(204);
      } else {
      	console.log('data ready to display!');
      	res.json(data);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(404);
    });
};

exports.downloadUrl = function(entry) {
  url = entry.url;
  formattedUrl = url.slice(1, url.length-1);

  var urlData = '';
  request(formattedUrl, function(error, response, body) {
    if(!error && response.statusCode == 200) {
  	  urlData = body;
      console.log(urlData);
	  db.none('update sites set archived = $1, data = $2 where id = $3', [true, urlData, entry.id])
	    .then(function(response) {
	      console.log('entry is archived!');
	    })
	    .catch(function(err) {
	      console.log(err);
	    });
  	}
  });
};

