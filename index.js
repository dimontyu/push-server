'use strict';

require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webPush = require('web-push');
var compression = require('compression');
const logger = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser'); 
const jsonParser = express.json();
var favicon = require('serve-favicon');
var passport = require('passport');
var session = require('express-session');

app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(session({
  cookie: { name: 'session',value:'qq',   maxAge: 60000000 },
  secret: 'key',
  saveUninitialized: false,
  resave: false
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());
app.use(passport.session());
var flash = require('connect-flash');
app.use(flash());
var initPassport = require('./passport/init');
initPassport(passport);

var proutes = require('./proutes/index')(passport);//маршрутизатор пасспорта
app.use('/', proutes);


//установка открытого и закрытого ключей для пуш уведомлений
webPush.setVapidDetails(
    'mailto:dima.chernyshev.1976@mail.ru',
    '******************' ,
    
	process.env.VAPID_PRIVATE_KEY
);

/**
 * Controllers (route handlers).
 */

const pushController = require('./controllers/push');// подписка на уведомления пользователей с сохранением в базе данных Push и удаление
const adminController = require('./controllers/admin');//маршрут admin.pug и отсылки PUSH уведомлений всем пользователям
const routes = require('./routes/index'); //маршрут к creator.pug
const routesz = require('./routes/users');//маршрутизатор post put delete get запросов к базе данных
const testroutes = require('./test-router/routecontrol');//маршрутизатор post put delete get запросов к базе данных
const gruzchik = require('./gruzik');//загрузчик картинок AWS
/**
 * Connect to MongoDB.
 */

var dev_db_url =process.env.MONGODB_URI;
var mongoDB =  dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

/**
 * Express configuration.
 */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
   //maxAge: '1d', 
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}


app.use(favicon(path.join(__dirname, 'static', 'images/pic1.ico')))
app.use("/", express.static(__dirname + '/public',options));
app.use("/", express.static(__dirname + '/static'));
app.use("/", express.static(__dirname + '/test-public'));
app.use("/", express.static(__dirname + '/node_modules'));

app.use('/',routes );//creator.pug
app.use('/',testroutes );//TEST DOCUMENT

app.use('/',routesz );//post,put,delete,get

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',gruzchik);
/**
 * Primary app routes.
 */
 

app.get('/admin', adminController.index);// рендер admin.pug
app.post('/push/subscribe/:name', pushController.subscribe);//подписаться на Push grom.pug
app.post('/push/unsubscribe', pushController.unsubscribe);//удалить подписку Push grom.pug
app.post('/pushevent', adminController.subscribe);//запрос на отсылку Push пользователям из admin.pug

const awsrouter = require('./routes/awsrouter');//AWS загрузчик

app.use('/',awsrouter );


//app.listen(process.env.PORT ||80);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}
app.listen(port);


module.exports=app;
