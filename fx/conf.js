/**
 * Configuration module
 *
 */

/* BEGIN INCLUDES */

var fx = require("../fx/fx.js");
var fs = require("fs");

/* END INCLUDES*/
//--------------------------------------------------------------------------------
/* BEGIN VARS */

var conf_file = 'conf/conf.json';
var root_dir = '';

/* END VARS */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

fx.log.act('[conf] reading configuration file');

var conf = JSON.parse(fs.readFileSync(conf_file, 'utf8'));

/* END ACTIONS */
//--------------------------------------------------------------------------------
/* BEGIN EXPORTS - */

exports.__defineGetter__('http_port', function() {
    return conf.http_port;
});

exports.__defineGetter__('http_host', function() {
    return conf.http_host;
});

exports.__defineGetter__('db_host', function() {
    return conf.db_host;
});

exports.__defineGetter__('db_name', function() {
    return conf.db_name;
});

exports.__defineGetter__('db_user', function() {
   return conf.db_user;
});

exports.__defineGetter__('db_pass', function() {
    return conf.db_pass;
});

exports.__defineGetter__('tcp_port', function() {
    return conf.tcp_port;
});

exports.__defineGetter__('tcp_host', function() {
    return conf.tcp_host;
});

exports.__defineGetter__('static_dir', function() {
    return conf.static_dir;
});

exports.__defineGetter__('views_dir', function() {
    return conf.views_dir;
});

exports.__defineGetter__('root_dir', function() {
    return root_dir;
});

exports.__defineSetter__('root_dir', function(value) {
    root_dir = value;
})

exports.reload_conf = function() {
    fx.log('[conf] reloading configuration file');
    c = JSON.parse(fs.readFileSync(conf_file, 'utf8'));

    if(!c) fx.log.error('[conf] error reloading conf file - invalid json');
    else conf = c;
};

/* END EXPORTS */