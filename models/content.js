

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ContentSchema = new Schema({	
name: String,
header: String,
p: String,
h1: String,
h2: String,
images:[String],
aws:[String]
});






module.exports = mongoose.model('Content', ContentSchema);