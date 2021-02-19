var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var UserSchema = new Schema({username: String,
password: String,
email: String,
gender: String,
address: String 
});

module.exports = mongoose.model('User', UserSchema);