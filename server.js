//server.js

//set up server dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/addLink', function(req, res) {
  console.log('adding link: ', req.body);
});

app.post('/searchArchive', function(req, res) {
  console.log('requested archived url!: ', req.body);
})

app.listen(port);
console.log('server is live on localhost ' + port);