/**
 * FrontEnd module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var fs = require('fs');
var fx = require('../fx/fx.js');
var http = require('../fx/http.js');
var userSystem = require('../fx/user-system.js');
var requiresLogin = userSystem.requiresLogin;

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

http.get('/', requiresLogin, function(req, res) {
    res.redirect('/home');
});

http.get('/login', function(req, res) {
	res.render('front/front-login');
});

http.post('/login-action', function(req, res) {
    res.end("cool");
});

// --

http.get('/home', requiresLogin, function(req, res) {
	res.render('front/front');
});

/* END ACTIONS */