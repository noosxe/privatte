/**
  * User model
  *
  * @author coder_
  */

/* BEGIN INCLUDES */

var fx = require('../fx/fx.js');
var mongoose = require('mongoose');

/* END INCLUDES */
//--------------------------------------------------------------------------------
/* BEGIN ACTIONS */

fx.log.act('[db] initialising user model');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var model = new Schema({
    id: ObjectId,
    userName: String,
    passWord: String,
    eMail: String,
    firstName: String,
    lastName: String
});

mongoose.model('user', model);

/* END ACTIONS */