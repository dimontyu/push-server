//файл записывает изображение на AWS S3 используя Buffer end Memory Multer и добавляет в mongodb ссылку на него
'use strict'
require('dotenv').config();
var express = require('express');
var router = express.Router();
const S3_BUCKET = process.env.S3_BUCKET;
var Content = require('./models/content');
const multer = require("multer");

const AWS = require('aws-sdk');
const { Blob } = require('buffer');

//var bucketName ='dimonticad65512f-c9a1-4b1e-91bc-9d2a8d6dad4e';
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

let promt=async function(req,res,x,next){
	var bucketName =(req.params.bucketname =='dima')?'dimonticad65512f-c9a1-4b1e-91bc-9d2a8d6dad4e':req.params.bucketname+'65512f-c9a1-4b1e-91bc-9d2a8d6dad4e';
	var keyName = req.params.name+'.jpg';
	let ss='https://'+bucketName + ".s3.amazonaws.com/" + keyName;
	var uid=req.params.id;
	var bucketPromise = s3.createBucket({Bucket: bucketName}).promise();
	bucketPromise.then(
  function(data){ 
  var objectParams = {Bucket: bucketName, Key: keyName, Body: x}
  var uploadPromise = s3.putObject(objectParams).promise();
   uploadPromise.then(

      function(data) {
		  let	newContent={"$push":{aws:ss}};
		  Content.findOneAndUpdate({ _id:uid  }, newContent, { new: true }, function (err, user) {
        if (err) return console.log(err);
       //res.send(user);
	//res.send();
 	
})
x=null;
//res.end(data);//fix
politicaws(req,res,bucketName);
})
}).catch(
  function(err) {
    console.error(err, err.stack);
});
	
	
// politicaws(bucketName);
	
	}





var storage = multer.memoryStorage({
	buffer:function (req, file, cb) {
    cb(null,file.name );
	
  }
	
})






router.post('/uploadaws/:name/:id/:bucketname',(req, res,next) => {
	var name=req.params.name;

let upload = multer({ storage: storage }).single(name);

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
		
	
		//res.send("<p  style='color:red'>OK</p><script>window.onload = function(){ return history.back()   }  </script>");
	//const x=Buffer.from(req.file.buffer);
	let x=req.file.buffer;
	console.log(x);
	promt(req,res,x);
	req.file.buffer=null;
	})
});
//функция устанавливающая политику корзины
async function politicaws(req,res,bucketName){
	var readOnlyAnonUserPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "AddPerm",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:*",
      Resource: [
        ""
      ]
    }
  ]
};

// create selected bucket resource string for bucket policy
var bucketResource = "arn:aws:s3:::" + bucketName + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;

// convert policy JSON into string and assign into params
var bucketPolicyParams = {Bucket:bucketName , Policy: JSON.stringify(readOnlyAnonUserPolicy)};

// set the new policy on the selected bucket
s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    console.log("Success", data);//res.end(data);
	res.send("<p  style='color:red'>OK</p><script>window.onload = function(){ return history.back()   }  </script>");
  }
});
//next();
}



module.exports = router;

