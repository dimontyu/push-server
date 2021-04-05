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
            console.error('error with subscribe', err);
            res.status(500).send(JSON.stringify ({body:'Пользователь не подписан',st:'500'}));
            return;
        }
	
		
	
else if(user!==null){
   

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
		let data={body:'ok',st:'200'};
        res.status(200).send( JSON.stringify (data) );	
			
			
        }).catch(err => {
			 Push.findByIdAndDelete({_id: id}, function (err, user){
    res.status(400).send( JSON.stringify ({body:'abonent not no',st:'500'}));
	console.error("Unable to send welcome ПИЗДЕЦ push notification"+user.name, err);	 });
            
        });
		/* let data={body:'ok'};
        res.status(200).send( JSON.stringify (data) ); */
		
        return;
}else{console.error('error with subscribe', err);
            res.status(500).send(JSON.stringify ({body:'Пользователь deleted',st:'500'}));
            return;}
			})
};



