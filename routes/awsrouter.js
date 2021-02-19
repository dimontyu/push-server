'use strict';
var express = require('express');
var router = express.Router();
const jsonParser = express.json();

const awscontrollersget = require('../awscontrollers/output')
var politicaws=('../awscontrollers/awspolitics');




router.put('/awsinput/:name/:bucketname',awscontrollersget.index);//DELETE файл aws s3
//router.post('/pushevent', adminController.subscribe);


module.exports=router;