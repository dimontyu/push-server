var Cites = require('../test-models/city');
var async = require('async');
var Usser = require('../test-models/user');


//вывести весь список жителей
exports.index = function (req, res) {

    async.parallel({
        users: function (callback) {
            Usser.find({})
			.exec(callback)
        },
        citys: function (callback) {
            Cites.find({})
			.exec(callback)
        },
       
    }, function (err, results) {
		const res1=(results.users).filter(index =>index.id<=1)
		const res2=(results.users).filter(index =>index.id==2);
		const res3=(results.users).filter(index =>index.id==3);
		//const res1=(results.users).filter(index =>index.id<3);
		
		
		console.log(results.citys);
        //забыл добавить err in pug
		res.render('a', { error: err, users1: res1,users2: res2,users3: res3,citys:results.citys });
    });
};


//создать жителя
exports.index_post=function (req, res) {
	

    if (!req.body) return res.sendStatus(400);
   const a = req.body.ids;
    const b = req.body.name;
	const c = 1;
    const d = {type: "city",
        name:req.body.city 
      };
    const e = {
        type: "district",
        name:req.body.district 
      };
    const f = {
        type: "street",
        name:req.body.street 
      } ;
    const user = new Usser({id:a,name:b,city_id:c,groups:[d,e,f]  });

    user.save(function (err) {
        if (err) return console.log(err);
		console.log('create');
        res.send(user);
    });
};

//удалить жителя
exports.index_delete=function (req, res) {

    const id = req.params.id;
    Usser.findByIdAndDelete( id, function (err, user) {

        if (err) return console.log(err);
		console.log('delete');
        res.send(user);
    });
};

//изменить жителя
exports.index_put= function (req, res) {

    if (!req.body) return res.sendStatus(400);
	const id=req.body.id;
	// const a = req.body.ids;
    const b = req.body.name;
	//const c = req.body.city_id;
    const d = {type: "city",
        name:req.body.city 
      };
    const e = {
        type: "district",
        name:req.body.district 
      };
    const f = {
        type: "street",
        name:req.body.street 
      } ;
    //const newContent = { id:a,name:b,city_id:c,groups:[d,e,f] } ;
	const newContent = { name:b,groups:[d,e,f] } ;

    Usser.findOneAndUpdate({ _id:id  }, newContent, { new: true }, function (err, user) {
        if (err) return console.log(err);
		console.log('update');
        res.send(user);
    });
};









