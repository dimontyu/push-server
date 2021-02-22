"use strict";

const VERSION = 'v0.0.5';


self.addEventListener('install', function (event) {
	self.skipWaiting();
	event.waitUntil(
		caches.open(VERSION).then(function (cache) {
			return cache.addAll([
			'/',
				'/grom',
				'/manifest.json',
				'/grid.css',
				 '/content.json',
				'/content1.json',
				'/content2.json',
				'images/wood.jpg',
				'images/cam.jpg',
				'images/pic1.ico',
				'/images1/default.jpg',
				'/main.js',
				'/script/push.js',			
				"vebcomponents/style/lit-el.css",
				"vebcomponents/style/target.css",
				"vebcomponents/lit-el.js",
				"vebcomponents/component.mjs",
				
				"vebcomponents/cmp.mjs",
				
				"vebcomponents/component8.js",
				'../lit-html/lit-html.js',
				'../lit-html/lib/default-template-processor.js',
				'../lit-html/lib/directive.js',
				'../lit-html/lib/dom.js',
				'../lit-html/lib/part.js',
				'../lit-html/lib/parts.js',
				'../lit-html/lib/render.js',
				'../lit-html/lib/template-factory.js',
				'../lit-html/lib/template-instance.js',
				'../lit-html/lib/template-result.js',
				'../lit-html/lib/template.js',			
				'/api/users/5ffc5a880cb93c2608038507',				
	'/indexdb/componentindexdb.js',
	'/indexdb/componentindexdb.css',	
	'/indexdb/index1.html',
	'/indexdb/index2.js',
	'/indexdb/index1.js',	
	'/indexdb/style1.css',
	'/images/g1.JPG',
	 'img/alt.png',
	 '/android-chrome-192x192.png',
	 "/maskable_icon.png",
	 "/android-chrome-512x512.png"
				])
		})
	);
});

 function redir (url) {
	
	
    caches.open(VERSION).then(function (cache) {
      return fetch(url).then(function (response) {
        cache.put(url, response);
        return ;
      });
    })
  
	
};








//раздвоение стратегии выборки файлов в зависимости navigator.onLine состояния сети
 self.addEventListener('fetch', function (event) {
	 if(navigator.onLine ==false){
	 let request = new Request('/');
	request = event.request;
	let rr=request.url;


	/////////////
	let requestH =request.destination ;

	if (request.method !== 'GET') return;

	event.respondWith(
		caches.match(request).then(function (response) {
			
			return response ||fetch(event.request);
		}).catch(function (err,response) {
			console.log(err,requestH)
			if(requestH=='object'||requestH==undefined||requestH=='')
			{return caches.match('/api/users/5ffc5a880cb93c2608038507')}
		else if(requestH=='image')
			{return caches.match('/images/cam.jpg');}
			else{return caches.match('/')}
			
			
		})
	);
	
	
	 }else{let request = event.request; let rr=request.url;  if (  request.method !== 'GET') return;  event.respondWith(
    caches.match(event.request).then(function (response) {
		
		return response=(!response||(request.url==('https://shielded-journey-11426.herokuapp.com/grom')||('https://shielded-journey-11426.herokuapp.com/')))?fetch(event.request):response ; 
    }).catch(function (response) {
			
			return caches.match(event.request)||caches.match('/images1/default.jpg');
			
		}),
  )}
  }); 
	

	
	
	
//////////////


//////////
self.addEventListener('activate', function (event) {
	
	event.waitUntil(
		caches
			.keys()
			.then(function (keys) {
				return Promise.all(
					keys
						.filter(function (key) {
							return !key.startsWith(VERSION);
						})
						.map(function (key) {
							return caches.delete(key);
						})
				);
			})
			.then(function () {
				console.log('new service worker version registered', VERSION);
			}).catch(function (error) {
				console.error('error registering new service worker version', error);
			})
	);
});




var notificationData = {};



self.addEventListener('push', function (event) {

	//let notificationData = {};

	try {
		notificationData = event.data.json();
		//qrq = event.data.json();
		//console.log(notificationData)
	 event.waitUntil(async function() {
    const allClients = await clients.matchAll({
      includeUncontrolled: true
    });

    let chatClient;

    // Let's see if we already have a chat window open:
    for (const client of allClients) {
      const url = new URL(client.url);

      if (url.pathname == '/'||url.pathname == '/grom'||url.pathname == '/admin'||url.pathname=='/indexdb/index1.html') {
        // Excellent, let's use it!
        //client.focus();
		
        chatClient = client;
		var myFocused =chatClient.focused;
        break;
      }
    }

    // If we didn't find an existing chat window,
    // open a new one:
   

    // Message the client:
	console.log(myFocused)
  if(myFocused) { chatClient.postMessage(notificationData);}return;
  }());	
		
		
		
		
		
		
		
	} catch (e) {
		notificationData = {
			title: 'Default title',
			body: 'Default message',
			icon: '/default-icon.png'
		};
	}

	event.waitUntil(
		self.registration.showNotification(notificationData.title, {
			body: notificationData.body,
			icon: notificationData.icon
		})
	);

});


self.addEventListener('notificationclick', function (event) {
	
	// close the notification
	event.notification.close();	// otherwise open new tab
	event.waitUntil(

		self.clients.matchAll().then(function (clientList) {

			if (clientList.length > 0) {
				return clientList[0].focus();
			}
			

			return self.clients.openWindow('/').then(function(windowClient){
				
				//console.log(windowClient);
			if(windowClient)windowClient.postMessage(notificationData);}).catch(function (error,windowClient) {
					let ddDat={title:'pizdec',body:'error',agent:'urod'};
					windowClient.postMessage(ddDat);
				console.error('error registering new service worker version', error);
			});//при щелчке на уведомление открыть окно вебстраницы

		})
	);
});

