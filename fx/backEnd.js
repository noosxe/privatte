/**
 * BackEnd module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

var fx = require('../fx/fx.js');
var http = require('../fx/http.js');
var userSystem = require('../fx/userSystem.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

http.get('/admin', userSystem.requiresAdminLogin, function(req, res) {
    res.send('hello admin');
});

http.post('/admin/loginAction', function(req, res) {

    userSystem.authAdmin(req.body.username, req.body.password);
});

/* END ACTIONS */