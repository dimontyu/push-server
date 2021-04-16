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
        //res.render('a', { error: err, users: results.users,citys:results.citys });
		res.render('a', { error: err, users1: res1,users2: res2,users3: res3,citys:results.citys });
    });
};












// Display list of all Authors.
/* exports.author_list = function (req, res, next) {

    Author.find()
        .sort()
        .exec(function (err, list_authors) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('a', { title: 'Author List', author_list: list_authors });
        })

}; */

// Display detail page for a specific Author.
/* exports.author_detail = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });

};

// Display Author create form on GET.
exports.author_create_get = function (req, res, next) {
    res.render('author_form', { title: 'Create Author' });
};

// Handle Author create on POST.
 */