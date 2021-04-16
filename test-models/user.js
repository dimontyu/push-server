
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 


 



var UsSchema = new Schema({
    id: { type:Number, required: true },
    city_id: { type:Number, required: true },
    name: { type: String, required: true },
    groups:[{type: {type: String}, name:{type:String} }]
});
	 
module.exports = mongoose.model('Usser', UsSchema);	 
	
	
	
	
/* 	[
  {
    "id": 0,
    "name": "Анна",
    "city_id": 1,
    "groups": [
      {
        "type": "city",
        "name": "Москва г."
      },
      {
        "type": "district",
        "name": "Пресненский р-н"
      },
      {
        "type": "street",
        "name": "Гашека ул."
      }
    ]
  }, */