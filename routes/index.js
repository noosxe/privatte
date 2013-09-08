var app = require('./../app/http').app;

app.get('/', function(req, res) {
  res.render('site/skeleton');
});

require('./login');
require('./thread');
