require('./app/db').setupDB(function(err) {

  if (err) {
    console.log('error connecting to database');
  } else {
    require('./app/http');
    require('./routes');
  }

});
