const Push = require('../models/Push');
const webPush = require('web-push');
/**
 * POST /
 * Subscribe user.
 */
 //exports.registr=(reg,res)=>{
	// const name =req.body;
 //}
 
 
 
exports.subscribe = (req, res) => {
const name = req.params.name;

/* Push.findOne({ name:name }, function (err, user) {
return user
})     
   
if(user){
 Push.findOneAndDelete( {name:user}, function (err, p) {

        if (err) return console.log(err);
        res.send(p);
});}  */


    const endpoint = req.body;
	
	

    const push = new Push({
		name: name,
        endpoint: endpoint.endpoint,
        keys: {
            p256dh: endpoint.keys.p256dh,
            auth: endpoint.keys.auth
        }
    });

    push.save(function (err, push) {
        if (err) {
            console.error('error with subscribe', error);
            res.status(500).send('subscription not possible');
            return;
        }

        const payload = JSON.stringify({
            title: 'Welcome'+' '+name,
            body: 'Thank you for enabling push notifications',
            icon: '/android-chrome-192x192.png'
        });

        const options = {
            TTL: 86400
        };

        const subscription = {
			name:push.name,
            endpoint: push.endpoint,
            keys: {
                p256dh: push.keys.p256dh,
                auth: push.keys.auth
            }
        };

        webPush.sendNotification(
            subscription,
            payload,
            options
        ).then(function () {
            console.log("Send welcome push notification");
        }).catch(err => {
            console.error("Unable to send welcome push notification", err);
        });
        res.status(200).send('subscribe');
        return;
    });
};

/**
 * POST /
 * Unsubscribe user.
 */
exports.unsubscribe = (req, res) => {

    const endpoint = req.body.endpoint;

    Push.findOneAndRemove({ endpoint: endpoint }, function (err, data) {
        if (err) {
            console.error('error with unsubscribe', error);
            res.status(500).send('unsubscription not possible');
        }
        console.log('unsubscribed');
        res.status(200).send('unsubscribe');
    });
};