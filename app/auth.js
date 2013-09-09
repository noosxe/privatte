var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var users = require('./users');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
      return done(null, false, { message: 'Invalid e-mail' });
    }

    if (password.length < 6 || password.length > 255) {
      return done(null, false, { message: 'Invalid password' })
    }

    return users.authUser({email: email, password: password}, function(err, user) {

      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: 'Incorrect e-mail/password!' });
      }

      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.requireAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};
