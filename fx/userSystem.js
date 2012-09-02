/**
 * UserSystem module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

//var mongoose = require('mongoose');
//var db = require('../fx/db.js');
//var rsa = require('rsa');
var fs = require('fs');

/* END INCLUDES */

/* BEGIN EXPORTS */

exports.authAdmin = function(username, password) {
    var user = mongoose.model('user');
    user.findOne({ userName: username }, function (err, doc){
        console.log(doc);
    });
};

exports.requiresLogin = function(req, res, next) {
    if (req.session.user)
        next();
    else {
        res.render('front/frontLogin');
    }
};

exports.requiresAdminLogin = function(req, res, next) {
    if (req.session.user && req.session.user.level < 10) // levels lower than 10 are allowed to enter admin area
        next();
    else
        res.render('back/backLogin');
}