var app = require('./../app/http').app;

app.get('/thread', function(req, res) {
  res.render('site/thread');
});
