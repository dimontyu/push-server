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


const s3 = new AWS.S3({apiVersion: '2006-03-01'});


 
 let promt=async function(req,res,x,next){
	 
	let bucketName =(req.params.bucketname =='dima')?'dimonticad65512f-c9a1-4b1e-91bc-9d2a8d6dad4e':req.params.bucketname+'65512f-c9a1-4b1e-91bc-9d2a8d6dad4e';
	//let keyName = req.params.name+'.jpg';
	//let ss='https://'+bucketName + ".s3.amazonaws.com/" + req.params.name+'.jpg';
	//let uid=req.params.id;
	//var bucketPromise = s3.createBucket({Bucket: bucketName}).promise();
	
  
 let objectParams = {Bucket: bucketName, Key: (req.params.name), Body: x}
  let uploadPromise = s3.putObject(objectParams).promise();
  

      
uploadPromise.then(	(data)=>	 {    let	newContent={"$push":{aws:('https://'+bucketName + ".s3.amazonaws.com/" + req.params.name)}};
		  Content.findOneAndUpdate({ _id:(req.params.id)  }, newContent, { new: true }, function (err, user) {
        if (err){return console.log(err);}
       console.log(user.aws[user.aws.length-1]);  let pix=(user.aws[1]!==undefined);
 	politicaws(req,res,bucketName,pix,user);
})}).catch(
  function(err) {var bucketPromise = s3.createBucket({Bucket: bucketName}).promise();
    console.error(err, err.stack);
});
 }




var storage = multer.memoryStorage({
	buffer:function (req, file, cb) {
    cb(null,file.name );
	
  }
	
})






router.post('/uploadaws/:name/:id/:bucketname',(req, res) => {
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
		
	
		
	const x=Buffer.from(req.file.buffer);
	
	console.log(x.length);
	promt(req,res,x);
	
	
	})
});
//функция устанавливающая политику корзины
async function politicaws(req,res,bucketName,pix,user){
	
	if(pix==true) {res.send(user);}
	else{
	
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
	res.send(user);
  }
});
	}
}



module.exports = router;

