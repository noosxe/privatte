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

var http = require('http');
var connect = require('connect');
var app = express();


var cookieParser = express.cookieParser('very secret words');
MongoStore = require('connect-mongo')(express);
var sessionStore = new MongoStore({
	host: conf.db_host,
	port: conf.db_port,
	username: conf.db_user,
	password: conf.db_pass,
	db: conf.db_host
});

/* END VARIABLES */

/* BEGIN ACTIONS */

fx.log.act('[http] initialising http');

app.configure('all', function() {
	app.use(express.bodyParser());
	app.use(cookieParser);
	app.use(express.session({ store: sessionStore }));
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
	app.use(connect.compress());
});

var server = http.createServer(app)
var io = require('socket.io').listen(server);

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
	io.set('log level', 1)
});

app.use(app.router);

var SessionSockets = require('session.socket.io');
var sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

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
	sessionSockets.on.apply(sessionSockets, arguments);
};

/* END EXPORTS */
