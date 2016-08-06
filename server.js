//server.js

//set up server dependencies
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var helpers = require('./archive-helpers');

//routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/addLink', function(req, res, next) {
  var data = "'" + req.body.url + "'";
  helpers.addEntry(res, data);
});

app.post('/searchArchive', function(req, res) {
  console.log('requested archived url!: ', req.body);
  var id = req.body.id;
  helpers.getDataStatus(res, id);
});


app.listen(port);
console.log('server is live on localhost ' + port);