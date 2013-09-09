var app = require('./../app/http').app;
var passport = require('passport');

app.get('/login', require('../app/func').csrf, function(req, res) {
  res.render('site/login');
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({status:'error', info:info.message});
    }

    return req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.json({status:'ok'});
    });
  })(req, res, next);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
