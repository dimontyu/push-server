
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var UserSchema =new Schema({
       name: String,
	   name1: String,
	   age: String,
username: String,	   
password: String,
email: String ,
firstName: String,
lastName: String 	   
});
	 
module.exports = mongoose.model('User', UserSchema);	 
	