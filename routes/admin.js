var app = require('./../app/http').app;
var users = require('./../app/users');

var auth = require('../app/auth').requireAuthentication;

app.get('/admin/boot', function(req, res) {
  if (req.query.code == '37D3D4D7-690F-43CB-8687-6896D0472664') {
    users.addUser({
      email: 'noosx.e@gmail.com',
      password: 'astser',
      firstName: 'Levon',
      lastName: 'Kirakosyan',
      birthday: new Date(1990, 9, 4),
      status: 1,
      permissions: ['user-manage', 'site-manage']
    }, function() {
      res.send('setup done');
    });
  } else {
    res.send('no permissions');
  }
});
