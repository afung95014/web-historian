//server.js

//set up server dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//connect database
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname,'db/config.js'));
console.log('db connected at:', connectionString);

//routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/addLink', function(req, res) {
  console.log('adding link: ', req.body.url);
  var data = req.body.url;
  var result = [];

  pg.connect(connectionString, function(err, client, done) {
  	//Handle connection errors
  	if(err) {
  	  done();
  	  console.log(err);
  	  return res.status(500).send(json({success: false, data: err}));
  	}

  	//SQL query
  	var query = client.query('INSERT INTO sites (url, archived) VALUES ("' + data + '", false) WHERE NOT EXISTS (SELECT * FROM sites WHERE url =' + data + ')');

  	query.on('row', function(row) {
  	  console.log(row);
  	  result.push(row);
  	});

  	query.on('end', function() {
  	  done();
  	  return res.json(result);
  	});

  });
});

app.post('/searchArchive', function(req, res) {
  console.log('requested archived url!: ', req.body);
});


app.listen(port);
console.log('server is live on localhost ' + port);