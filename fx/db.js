/**
 * DB Module
 *
 */

/* BEGIN INCLUDES */

var fx = require('../fx/fx.js');
var conf = require('../fx/conf.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

fx.log.act('[db] connecting to mongo');

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

var server = new Server(conf.db_host, conf.db_port, {auto_reconnect: true});
var db = new Db(conf.db_name, server);

db.open(function(err, db) {
	if(!err) {
		console.log("successfully connected to mongo");
	}
});

exports.db = db;

/* END ACTIONS */