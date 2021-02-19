
var express = require('express');
var router = express.Router();
var Content = require('../models/content');


var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects .если пользователь аутентифицирован в сеансе, вызовите next () для вызова обработчика следующего запроса
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	//если пользователь не аутентифицирован, перенаправьте его на страницу входа
	res.redirect('/input');
}

module.exports = function(passport){

	/* GET login page.   
ПОЛУЧИТЬ страницу входа */
	router.get('/input', function(req, res) {
    	// Display the Login page with any flash message, if any
		//Отображение страницы входа с любым флэш-сообщением
		res.render('pindex', { message: req.flash('message') });
	});

	/* Handle Login POST  Дескриптор входа POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/grom',
		failureRedirect: '/input',
		failureFlash : true  
	}));

	/* GET Registration Page  ПОЛУЧИТЬ страницу регистрации */
	router.get('/signup', function(req, res){
		res.render('pregister',{message: req.flash('message')});
	});

	/* Handle Registration POST * дескриптор  регистрации POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/grom',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/grom', isAuthenticated, function(req, res){
		Content.find({}, function (err, users){
		res.render('grom', { user: req.user.username,docs:users
 });
		});
	});
	router.get('/creator/:name' ,isAuthenticated, function(req, res,next){
		let param=req.params.name;
		if(req.user.username==param)
		return next();
		res.redirect('/input');
	});	
	
router.post("/api/users" ,isAuthenticated, function(req, res,next){
		return next()
	});	
	router.post('/uploadaws/:name/:id/:bucketname' ,isAuthenticated, function(req, res,next){
		return next()
	});	
	router.put( "/api/imagesdel",isAuthenticated, function(req, res,next){
		return next()
	});	
	
	router.put( "/api/users",isAuthenticated, function(req, res,next){
		return next()
	});
	router.put( '/awsinput/:name/:bucketname',isAuthenticated, function(req, res,next){
		return next()
	});
	
	router.delete("/api/users/:id", isAuthenticated, function(req, res,next){
		return next()
	});
	
	

	/* Handle Logout  дескрипт выхода*/
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/input');
	});

	return router;
}





