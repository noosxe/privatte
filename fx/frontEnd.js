/**
 * FrontEnd module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var fs = require('fs');
var fx = require('../fx/fx.js');
var http = require('../fx/http.js');
//var rsa = require('rsa');
var userSystem = require('../fx/userSystem.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

http.get('/', userSystem.requiresLogin, function(req, res) {
    console.log('here');
    res.send('hello user');
});

http.post('/loginAction', function(req, res) {
    console.log(req.body.password);
    res.send(JSON.stringify(new Buffer("Hello World").toString("base64")));
});

/* END ACTIONS */