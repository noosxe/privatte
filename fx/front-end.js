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
    res.redirect('/thread');
});

http.get('/login', function(req, res) {
	res.render('front/front-login');
});

http.post('/login-action', function(req, res) {
	userSystem.authUser(req.body.username, req.body.password, function(user) {
		if (user != null) {
			req.session.regenerate(function() {
				req.session.user = user;
				res.redirect('/thread');
			});
		} else {
			req.session.login_error = true;
			res.redirect('/login');
		}
	});
});

// --

http.get('/thread', requiresLogin, function(req, res) {
	res.render('front/front-thread');
});

http.get('/logout', requiresLogin, function(req, res) {
	req.session.destroy(function(){
		res.redirect('/');
	});
});

// --

http.on('connection', function (err, socket, session) {
	socket.on('new-message', function (data) {

		var message = data.message;
		http.io.sockets.emit('new-message', { message: message, sender: session.user.username});
	});
});



/* END ACTIONS */