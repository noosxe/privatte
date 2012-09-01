/**
 * FrontEnd module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var fs = require('fs');
var fx = require('../fx/fx.js');
var http = require('../fx/http.js');
var rsa = require('rsa');
var userSystem = require('../fx/userSystem.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

http.get('/', userSystem.requiresLogin, function(req, res) {
    res.send('hello user');
});

http.post('/loginAction', function(req, res) {
    console.log(req.body.password);

    var rsaPublic = fs.readFileSync("./pubkey", 'ascii');
    var rsaPrivate = fs.readFileSync("./privkey.pem", 'ascii');

    var params = { publicKey: rsaPublic, privateKey: rsaPrivate, passphrase: "" };
    var keypair = rsa.createRsaKeypair(params);
    var plaintext_again = keypair.decrypt(req.body.password, 'hex', 'utf8');
    console.log(plaintext_again);

    res.send(JSON.stringify(new Buffer("Hello World").toString("base64")));
});

/* END ACTIONS */