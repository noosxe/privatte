module.exports = function(mongoose) {

  var userSchema = new mongoose.Schema({
    email:      { type: String, index: { unique: true, dropDups: true } },
    password:     String,
    firstName:    String,
    lastName:     String,
    birthDate:    Date,
    registered:   { type: Date, default: Date.now },
    status:       Number,
    permissions: [String]
  });

  mongoose.model('User', userSchema);
};
