var login = require('./login');
var signup = require('./signup');
var User = require('../modelss/user');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	
//Паспорт должен иметь возможность сериализации и десериализации пользователей для поддержки постоянных сеансов входа в систему.
	
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
		
      User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });   
            
      
		
    })

    // Setting up Passport Strategies for Login and SignUp/Registration
	//Настройка стратегии паспорта для входа в систему и регистрации  
    login(passport);
    signup(passport);

}