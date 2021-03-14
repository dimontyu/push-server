
require('dotenv').config();
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../modelss/user');
var bCrypt = require('bcrypt-nodejs');
const S3_BUCKET = process.env.S3_BUCKET;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});



let index= function politicaws(m){
	
	
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
var bucketResource = "arn:aws:s3:::" + m + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;

// convert policy JSON into string and assign into params
var bucketPolicyParams = {Bucket:m , Policy: JSON.stringify(readOnlyAnonUserPolicy)};

	
	
	
	
	var bucketPromise = s3.createBucket({Bucket: m}).promise();
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

})
.catch(
  function(err) {
    console.error(err, err.stack);
});
	
	
	
	
}

  













module.exports = function(passport){


	passport.use('signup', new LocalStrategy({
            passReqToCallback : true //позволяет нам вернуть весь запрос к обратному вызову
        },
        function(req, username, password, done) {    //стратегия для регистрации

            findOrCreateUser = function(){
                // найти пользователя в Монго с указанным именем
                User.findOne({ 'username' :  username }, function(err, user) {
                    // В случае любой ошибки вернитесь, используя метод done
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists уже существует
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email  .  если нет пользователя с таким адресом электронной почты
                        // создаем пользователя
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials . установить локальные учетные данные пользователя
                        newUser.username = username;
                        newUser.password = createHash(password);
                       /*  newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName'); */
						newUser.email = req.params.email;
                        newUser.firstName = req.params.firstName;
                        newUser.lastName = req.params.lastName;
                        
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
						let m=username+'65512f-c9a1-4b1e-91bc-9d2a8d6dad4e'
						index(m);
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method . Задержка выполнения findOrCreateUser и выполнение метода
            // в следующем тике цикла событий
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}