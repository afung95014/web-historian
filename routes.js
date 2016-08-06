var helpers = require('./archive-helpers');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.post('/addLink', function(req, res, next) {
    var data = "'" + req.body.url + "'";
    helpers.addEntry(res, data);
  });

  app.post('/searchArchive', function(req, res) {
    var id = req.body.id;
    helpers.getDataStatus(res, id);
  });
};
