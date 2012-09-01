/**
 * Remote control module
 *
 */

/* BEGIN INCLUDES */

var net = require('net');
var fx = require('../fx/fx.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN VARS */

var conf;
var server = net.createServer(function(socket) {
        fx.log.log("connection incoming");
        socket.write("Echo server\r\n");
        socket.on('data', function(data) {
            fx.log.log(data);
        });
    });

/* END VARS */
//--------------------------------------------------------------------------------
/* BEGIN EXPORTS */

exports.init = function(c) {
    fx.log.act('[control] initialising control');
    conf = c;
};

exports.start = function() {
    fx.log.act('[control] listening for connections on ' + conf.tcp_host + ':' + conf.tcp_port);
    server.listen(conf.tcp_port, conf.tcp_host);
};

/* END EXPORTS */