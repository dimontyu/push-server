var LocalStrategy   = require('passport-local').Strategy;
var User = require('../modelss/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({   //стратегия входа в приложение
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            // check in mongo if a user with username exists or not 

//проверьте в монго, существует ли пользователь с именем пользователя или нет			
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method .В случае любой ошибки вернитесь, используя метод done
                    if (err)
                        return done(err);
   // Username does not exist, log the error and redirect back .Имя пользователя не существует, зарегистрируйте ошибку и перенаправьте обратно
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
    // User exists but wrong password, log the error .Пользователь существует, но неверный пароль, зарегистрируйте ошибку
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
   // User and password both match, return user from done method . Пользователь и пароль совпадают, верните пользователя из готового метода
       // which will be treated like success  . который будет рассматриваться как успех
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}