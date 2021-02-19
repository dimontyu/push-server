var LocalStrategy   = require('passport-local').Strategy;
var User = require('../modelss/user');
var bCrypt = require('bcrypt-nodejs');

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
                        newUser.email = req.param('email');
                        newUser.firstName = req.param('firstName');
                        newUser.lastName = req.param('lastName');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
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