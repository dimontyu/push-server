
const path = require('path');
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
//const Schema = mongoose.Schema;
var Content = require('../models/content');
const app = express();
const jsonParser = express.json();
var router = express.Router();


//const userScheme = new Schema({ name: String, name1: String, age: String,        
//username: String,password: String,email: String,gender: String,address: String }, { versionKey: false });
//const User = mongoose.model("User", userScheme);
app.use(express.static(__dirname+path));


router.get("/api/users",jsonParser, function (req, res) {

    Content.find({}, function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });
});

router.get("/api/users/:id", function (req, res) {
const x=(req.params.id!==null||req.params.id!==undefined)?req.params.id:'5ea01f0232072b2b94160de8';
    const id =x;
    Content.findOne({ _id: id }, function (err, user) {

        if (err) return console.log(err);
        res.send(user);console.log(user);
    });
});

router.post("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userHeader = req.body.header;
    const userP = req.body.p;
	const userH1 = req.body.h1;
	const userH2 = req.body.h2;
    const user = new Content({ name: userName, header: userHeader, p: userP, h1: userH1, h2: userH2 });

    user.save(function (err) {
        if (err) return console.log(err);
        res.send(user);
    });
});

router.delete("/api/users/:id", function (req, res) {

    const id = req.params.id;
    Content.findByIdAndDelete( id, function (err, user) {

        if (err) return console.log(err);
        res.send(user);
    });
});

router.put("/api/users", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
	 const id = req.body.id;
    const userName = req.body.name;
	const userHeader = req.body.header;
    const userP = req.body.p;
    const userH1 = req.body.h1;
    const userH2 = req.body.h2;
    const newContent = { name: userName, header: userHeader, p: userP, h1: userH1, h2: userH2 } ;

    Content.findOneAndUpdate({ _id:id  }, newContent, { new: true }, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
});
//закоментировал добавление ссылки на изображение из файловой системы
router.put("/api/images", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
	//const imag = req.body.images;
	 const id = req.body.id;
    const userName = req.body.name;
	const userHeader = req.body.header;
    const userP = req.body.p;
    const userH1 = req.body.h1;
    const userH2 = req.body.h2;
   // const newContent = { name: userName, header: userHeader, p: userP, h1: userH1, h2: userH2,"$push":{ images:imag }} ;
	 const newContent = { name: userName, header: userHeader, p: userP, h1: userH1, h2: userH2} 

    Content.findOneAndUpdate({ _id:id  }, newContent, { new: true }, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
});



module.exports = router;



