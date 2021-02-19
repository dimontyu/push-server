//УДАЛЕНИЕ ФАЙЛА ИЗ КОРЗИНЫ AWS

require('dotenv').config();
var express = require('express');
var app = express();
const AWS = require('aws-sdk');
var Content = require('../models/content');
var fs = require('fs');



exports.index = (req, res,next) => {
const S3_BUCKET = process.env.S3_BUCKET;



var bucketName =(req.params.bucketname =='dima')?'dimonticad65512f-c9a1-4b1e-91bc-9d2a8d6dad4e':req.params.bucketname+'65512f-c9a1-4b1e-91bc-9d2a8d6dad4e';
// Create name for uploaded object key Создать имя для загруженного ключа объекта
var keyName = req.params.name;

// Create a promise on S3 service object Создать обещание на сервисном объекте S3
//var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
var s3= new AWS.S3({apiVersion: '2006-03-01'});


// Handle promise fulfilled/rejected states Обработка обещаний выполненных / отклоненных состояний


 var options = {
        Bucket    :bucketName ,
        Key    :keyName 
    };
 

s3.deleteObject(options, (err, data) => {
    if (err) {
        console.log(err, err.stack);
    } else {
        console.log(data); 
    }
	
	if (!req.body) return res.sendStatus(400);
	const imag = req.body.aws;
	 const id = req.body.id;
   
    const newContent = { "$pull":{ aws:imag }} ;

    Content.findOneAndUpdate({ _id:id  }, newContent, { new: true }, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
	
   
	
});

}




 