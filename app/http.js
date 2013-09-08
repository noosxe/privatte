var express = require('express');
var app = express();

app.configure('all', function() {
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(require('connect-assets')({
    compress: true
  }));
  app.use(express.favicon());
  app.use(express.cookieParser());
  app.use(express.session({secret: '5905742C-D7FE-4929-B4C5-9B0176A9D5B9'}));
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.csrf());
  app.use(express.static(__dirname + '/../assets'));
});

app.configure('development', function() {
  app.use(express.logger('dev'));
});

app.configure('production', function() {
  app.use(express.logger());
});

app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port'));

exports.app = app;
