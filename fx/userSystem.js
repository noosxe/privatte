/**
 * UserSystem module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var mongoose = require('mongoose');
var db = require('../fx/db.js');
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
        //var rsaPublic = fs.readFileSync("./pubkey", 'ascii');
        //var rsaPrivate = fs.readFileSync("./privkey.pem", 'ascii');
        //var passphrase = "";

        //var params = { publicKey: rsaPublic, privateKey: rsaPrivate, passphrase: passphrase };
        //var keypair = rsa.createRsaKeypair(params);

        //var ciphertext = keypair.encrypt("abcde", 'utf8', 'hex');
        //var plaintext_again = keypair.decrypt(ciphertext, 'hex', 'utf8');

        //console.log("abcde");
        //console.log(plaintext_again);
/*
        res.render('front/frontLogin', {
            hash: rsaPublic
        });*/
    }
};

exports.requiresAdminLogin = function(req, res, next) {
    if (req.session.user && req.session.user.level < 10) // levels lower than 10 are allowed to enter admin area
        next();
    else
        res.render('back/backLogin');
}