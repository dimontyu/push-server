
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var CitySchema =new Schema({
       id:{ type:Number, required: true } ,
	   name: String,
	   data: String
	   
});
	 
module.exports = mongoose.model('City', CitySchema);	 
	
	
	
/* 	[
  {
    "id": 1,
    "name": "Москва",
    "data": "10000000"
  },
  {
    "id": 2,
    "name": "Воронеж",
    "data": "1000000"
  },
  {
    "id": 3,
    "name": "Санкт-Петербург",
    "data": "3000000"
  }
]
 */