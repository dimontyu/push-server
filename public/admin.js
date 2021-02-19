
var btn = document.querySelector(".btn");
let registerForm =document.querySelector("#registerForm"); 
let userTitle = document.querySelector("#title");
let userName = document.querySelector("#name");
let userBody = document.querySelector("#msg"); 
var username = userName;
var userbody = userBody;
var usertitle = userTitle;

 function cb(){
	 userName.value = '';
 userBody.value = '';
 userTitle.value = '';	
		
	}
let zstor=localStorage.getItem('name');
let z = document.querySelector("#z");
let zh=z.href+'/'+zstor;
//z.href=zh;
//z.name='pop';
[z.style.textDecoration,z.style.color,z.href,z.name]=['none','red',zh,'pop'];
console.log(zh);
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', 
   
    cache: 'no-cache', 
   
    headers: {
      'Content-Type': 'application/json'
      
    },
   
    body: JSON.stringify(data) 
  }).then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
  //return await response.data; 
}

var a = async function () {
    usertitle = userTitle.value;
    userbody = userBody.value;
	username = userName.value;
	//username = 'ggg';
	var pushid =   userName.getAttribute('name');
var agentname = localStorage.getItem('name');	
	 
postData('/pushevent', {
agent: agentname,	
id: pushid,	
name: username,
title: usertitle,
body: userbody,
icon: '/android-chrome-192x192.png'  }),cb();
 
}
btn.onclick=a;
let pushname = document.querySelectorAll('.menu');
for(let i of pushname)
	i.onclick=function(e){
	var pushid=e.target.getAttribute('id')
  userName.setAttribute('name',pushid);	
	userName.value =e.target.textContent ;	
	}
//для обработки сообщений	
/* navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Received a message from service worker: ', event.data);
  });	 */