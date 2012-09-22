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

var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

/* END VARIABLES */

/* BEGIN ACTIONS */

fx.log.act('[http] initialising http');

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.cookieParser('shhhh, very secret'));
	app.use(express.session());
	app.use(express.methodOverride());


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

	app.use('/static', express.static(conf.root_dir + conf.static_dir), { maxAge: oneYear });
	app.use(express.errorHandler());
});

app.use(app.router);

fx.log.act('[http] listening for HTTP requests on ' + conf.http_host + ':' + conf.http_port);
server.listen(conf.http_port);

/* END ACTIONS */

/* BEGIN EXPORTS */

exports.io = io;

exports.get = function(path) {
	fx.log.act('[http] registering get callback for path ' + path);
	app.get.apply(app, arguments);
};

exports.post = function(path) {
	fx.log.act('[http] registering post callback for path ' + path);
	app.post.apply(app, arguments);
};

exports.all = function(path) {
	fx.log.act('[http] registering all callback for path ' + path);
	app.all.apply(app, arguments);
};

exports.on = function() {
	io.sockets.on.apply(io.sockets, arguments);
};

/* END EXPORTS */