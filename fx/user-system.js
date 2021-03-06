/**
 * UserSystem module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var db = require('../fx/db.js').db;

/* END INCLUDES */

/* BEGIN EXPORTS */

exports.authAdmin = function(username, password) {

};

exports.authUser = function(username, password, callback) {
	db.collection('users', function(error, coll) {
		coll.findOne({username: username}, function(err, item) {
			callback(item);
		});
	});
};

exports.requiresLogin = function(req, res, next) {
	if (req.session.user)
		next();
	else {
		res.redirect('/login');
	}
};

exports.requiresAdminLogin = function(req, res, next) {
    if (req.session.user && req.session.user.level < 10) // levels lower than 10 are allowed to enter admin area
        next();
    else
        res.render('back/back-login');
};