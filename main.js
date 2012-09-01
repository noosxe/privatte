/**
 * Main module
 *
 * @author coder_
 */

/* BEGIN INCLUDES */

require('./fx/conf.js').root_dir = __dirname;
require('./fx/db.js');
require('./models/user.js');
require('./fx/http.js');
require('./fx/preProcess.js');
require('./fx/backEnd.js');
require('./fx/frontEnd.js');
require('./fx/postProcess.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */


/* END ACTIONS */


/* sockets */
/*

io.sockets.on('connection', function(socket) {
    
});

*/