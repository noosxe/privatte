var mongoose = require('mongoose');
var hasher = require('pbkdf2-hasher');

exports.authUser = function(user, callback) {
  mongoose.models.User.findOne({ email: user.email }, function(err, result) {
    if (err) {
      return callback(err, null);
    }

    if (!result) {
      return callback(null, null);
    }

    return hasher.verify(user.password, result.password, function(err, verified) {
      if (err) {
        return callback(err, null);
      }

      if (verified) {
        result.password = null;
        return callback(null, result)
      } else {
        return callback(null, null);
      }
    });
  });
};
