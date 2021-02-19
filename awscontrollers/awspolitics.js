'use strict'
require('dotenv').config();
var express = require('express');
var router = express.Router();
const S3_BUCKET = process.env.S3_BUCKET;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});



//функция устанавливающая политику корзины
let index= function politicaws(req,res){
	let name=req.param('username');;
	var bucketName =(name =='dima')?'dimonticad65512f-c9a1-4b1e-91bc-9d2a8d6dad4e':name+'65512f-c9a1-4b1e-91bc-9d2a8d6dad4e';
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

	
	
	
	
	var bucketPromise = s3.createBucket({Bucket: bucketName}).promise();
	bucketPromise.then(
  function(data){ 
  
  s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
  if (err) {
    // display error message
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
  
  
  
 
res.end(data);
})
.catch(
  function(err) {
    console.error(err, err.stack);
});
	
	
	
	
}


module.exports=index;