var mongoose = require('mongoose');

exports.setupDB = function(callback) {
  var options = {
    db: { native_parser: true },
    server: {
      poolSize: 5,
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  mongoose.connect(process.env.MONGOLAB_URI, options);

  var db = mongoose.connection;

  db.on('error', function(err) {
    callback(err);
  });

  db.once('open', function() {
    console.log('connected to database');

    require('../models/user')(mongoose);

    callback(null);
  });
};
