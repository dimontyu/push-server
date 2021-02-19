'use strict';
var express = require('express');
var router = express.Router();
var Content = require('../models/content');
const app = express();
const jsonParser = express.json();

/* GET home page. */
router.get('/creator/:name', function (req, res) {
	
	let ename= req.params.name;
	 Content.find({name:ename}, function (err, users){
	
    res.render('creator',{user:req.param('name'),docs:users});
	 });
});


/* router.get('/', function(req, res){
		Content.find({}, function (err, users){
		res.render('lit-el', { docs:users
 });
		});
	}); */


router.get('/', function(req, res){
	
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly; SameSite=Lax');

var f=req.get('sec-ch-ua-mobile');	//если не undefined ||'?0' значит это дектскоп
var fn=req.get( 'user-agent');//обнаружить устройство пользователя и его операционная система
var fm=req.get( 'sec-fetch-user');//если не undefined ||'1' значит это мобильник
		Content.find({}, function (err, users){
		res.render('lit-el', { docs:users});
		});
console.log(req.headers.cookie,f,fn,fm)	});

module.exports = router;
