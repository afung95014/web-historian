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
var pgpLib = require('pg-promise');
var pgp = pgpLib();
var connectionString = require('./db/config');
var db = pgp(connectionString);

//routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/addLink', function(req, res, next) {
  var data = "'" + req.body.url + "'";
  db.one("insert into sites(url, archived) values($1, $2) returning id", [data, false])
    .then(function (data) {
        console.log(data.id); // print new user id;
        res.json(data.id);
    })
    .catch(function (error) {
        console.log("ERROR:", error.message || error); // print error;
    });
  // db.one("select * from sites where url = " + "'" + data + "'" + ";")
  // .then(function(response) {
  // 	console.log('is this working?: ', response);

  // })
});

app.post('/searchArchive', function(req, res) {
  console.log('requested archived url!: ', req.body);
  var id = req.body.id;
  db.one("select * from sites where id = $1",[id])
    .then(function(data) {
      console.log(data);
      if(data.archived === false) {
      	res.json(data);
      } else {
      	console.log('data ready to display!');
      }
    })
    .catch(function(err) {
      console.log(err);
    })
});


app.listen(port);
console.log('server is live on localhost ' + port);