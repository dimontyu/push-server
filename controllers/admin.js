const Push = require('../models/Push');
const webPush = require('web-push');
const bodyParser = require('body-parser');


exports.index = (req, res) => {
		 Push.find({}, function (err, users){
    res.render('admin',{docs:users});
		 });
};


exports.subscribe = (req, res) => {

    const endpoint = req.body;
 const title =endpoint.title;
  const agent =endpoint.agent;
 const body =endpoint.body;
 const name = endpoint.name;
 const id = endpoint.id;
    Push.findOne({ _id: id }, function (err, user) {
if (err) {
            console.error('error with subscribe', error);
            res.status(500).send('subscription not possible');
            return;
        }
  
   	
    

 const payload = JSON.stringify({
            agent:agent,	 
	        name: name,
            title: title,
            body: body,
            icon: '/android-chrome-192x192.png'
        });
   

       
        const options = {
            TTL: 86400
        };

        
		 const subscription = {
			name:user.name,
            endpoint: user.endpoint,
            keys: {
                p256dh:user.keys.p256dh,
                auth: user.keys.auth
            }
        };
		
        webPush.sendNotification(
            subscription,
            payload,
            options
        ).then(function () {
            console.log("Send welcome push notification");
        }).catch(err => {
			 Push.findByIdAndDelete({_id: id}, function (err, user){
    res.send();
	console.error("Unable to send welcome ПИЗДЕЦ push notification"+user, err);	 });
            
        });
        res.status(200).send('pushevent');
        return;
     });
};



