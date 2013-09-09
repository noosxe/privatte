var app = require('./../app/http').app;

var auth = require('../app/auth').requireAuthentication;

app.get('/thread', auth, function(req, res) {
  res.render('site/thread');
});
