var app = require('./../app/http').app;

app.get('/login', require('../app/func').csrf, function(req, res) {
  res.render('site/login');
});

app.post('/login', function(req, res) {

});
