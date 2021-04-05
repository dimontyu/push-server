
var btn = document.querySelector(".btn");
let registerForm =document.querySelector("#registerForm"); 
let userTitle = document.querySelector("#title");
let userName = document.querySelector("#name");
let userBody = document.querySelector("#msg"); 
var username = userName;
var userbody = userBody;
var usertitle = userTitle;
var controll;
var eventpush;
 function cb(){
	 userName.value = '';
 userBody.value = '';
 userTitle.value = '';	
controll=false;		
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
  })
  return response.json();
}

var a = async function () {if(controll){
    usertitle = userTitle.value;
    userbody = userBody.value;
	username = userName.value;
	//username = 'ggg';
	var pushid =   userName.getAttribute('name');
var agentname = localStorage.getItem('name');	
	 
postData('/pushevent', {
agent: agentname,	
id: pushid,	
name: username,//id push
title: usertitle,
body: userbody,
icon: '/android-chrome-192x192.png'  }).then((data) => {
	
    console.log(data);  //описание содержимого статьи
	mps.textContent=(data.body);
	mps.style.color='#00e1ff';
	mps.style.fontSize='1.5em';
	if(data.st=='500'){eventpush.remove() }
	
		}),cb();
}else{mps.textContent='выберите пользователя в списке';
	mps.style.color='white';
	mps.style.fontSize='1.5em';}
}
btn.onclick=a;
let pushname = document.querySelectorAll('.menu');
for(let i of pushname)
	i.addEventListener('click',function(e){
		controll=true;
		eventpush=i;
	var pushid=e.target.getAttribute('id')
  userName.setAttribute('name',pushid);	
	userName.value =e.target.textContent ;	
	})
//для обработки сообщений	
/* navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('Received a message from service worker: ', event.data);
  });	 */
  
 var pushh=document.location.hash;console.log(pushh)
 var pushid;
 let hr;
  pushname.forEach(function(userItem) {
	   hr='#'+userItem.textContent;
 if( hr==pushh.toLowerCase()){userItem.click();
  pushid=userItem.getAttribute('id');
 userName.setAttribute('name',pushid);	
 userName.value =userItem.textContent ;}
 
}) 