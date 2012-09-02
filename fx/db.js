/**
 * DB Module
 *
 */

/* BEGIN INCLUDES */

var mongoose = require('mongoose');
var fx = require('../fx/fx.js');
var conf = require('../fx/conf.js');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

fx.log.act('[db] connecting to mongo');
//mongoose.connect('mongodb://' + conf.db_user + ':' + conf.db_pass + '@' + conf.db_host + '/' + conf.db_name);

/* END ACTIONS */