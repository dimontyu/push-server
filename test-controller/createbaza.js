

var async = require('async');
const fs = require("fs");
var Cites = require('../test-models/city');

var Usser = require('../test-models/user'); 

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
  },
 */

function cityCreate(a,b,c, cb) {
    detail = {id:a,name:b,data:c };
   

    var city = new Cites(detail);

    city.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Author: ' + city);
        
        //cb(null, city)
    });
}

function userCreate(a,b,c,d,e,f, cb) {
	

    detail ={id:a,name:b,city_id:c,groups:[d,e,f]};
   console.log(detail)

    var us = new Usser(detail);

    us.save(function (err) {
        if (err) {
            //cb(err, null)
			console.log(err)
            return
        }
        console.log('New Author: ' + us);
        
       // cb(null,user)
    });
}





function citizen(cb){
fs.readFile("./test-public/data/citizens.json", "utf8", 
            function(error,bigdata){
                
                if(error) throw error; 
                console.log(bigdata);
				for(let data of JSON.parse(bigdata)){
userCreate(data.id,data.name,data.city_id,data.groups[0],data.groups[1],data.groups[2], cb)
//userCreate(data[0],data[1],data[2],data[3], cb)
				}				
});
}


function cites(cb){
fs.readFile("./test-public/data/cites.json", "utf8", 
            function(error,bigdata){
               
                if(error) throw error; 
                console.log(bigdata);
for(let data of JSON.parse(bigdata)){				
cityCreate(data.id,data.name,data.data, cb)
//cityCreate(data[0],data[2],data[3], cb)
	}			
});
}














exports.index_citezen = function (req, res) {

   
   citizen();
      
};




exports.index_cites = function (req, res) {

  
        cites();
       
};




//citizen()
