/**
 * Http server module
 *
 */

/* BEGIN INCLUDES */

var express = require('express');
var fx = require('../fx/fx.js');
var conf = require('../fx/conf.js');

/* END INCLUDES */

/* BEGIN VARIABLES */

var app = express.createServer();
//var RedisStore = require('connect-redis')(express);
var io = require('socket.io').listen(app);

/* END VARIABLES */

/* BEGIN ACTIONS */

fx.log.act('[http] initialising http');

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "keyboard cat"}));

    app.set('views', conf.root_dir + conf.views_dir);
    app.set('view engine', 'jade');
    app.set('view options', {
        layout: false
    });
});

app.configure('development', function() {
    app.use('/static', express.static(conf.root_dir + conf.static_dir));

    app.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

app.configure('production', function() {
    var oneYear = 31557600000;

    app.use('/static/*', express.static(conf.root_dir + conf.static_dir), { maxAge: oneYear });

    app.use(express.errorHandler());
});

fx.log.act('[http] listening for HTTP requests on ' + conf.http_host + ':' + conf.http_port);
app.listen(conf.http_port);

/* END ACTIONS */

/* BEGIN EXPORTS */

exports.get = function(path, callback) {
    fx.log.act('[http] registering get callback for path ' + path);
    app.get(path, callback);
}

exports.post = function(path, callback) {
    fx.log.act('[http] registering post callback for path ' + path);
    app.post(path, callback);
}

exports.all = function(path, callback) {
    fx.log.act('[http] registering all callback for path ' + path);
    app.all(path, callback);
}

/* END EXPORTS */