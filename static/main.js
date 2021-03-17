var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var bbtn = document.querySelector('#btn');
var overlay = document.querySelector('.overlay');
//var bb = document.querySelector('#b');
var body = document.querySelector('body');
/* адрес и количество файлов images */

//УСТАНОВКИ ПЕРВОНАЧАЛЬНОГО КОНТЕНТА ПРИ ЗАГРУЗКЕ
window.onload=function fmu(inputname){if(inputname == undefined){return ;}else{localStorage.setItem("k",f=0);let names=localStorage.getItem('name');// name береться из push.js
inputname.textContent =names;}};
 


function displayImage(imgSrc) {
  displayedImage.setAttribute('src', imgSrc);
}

/* увеличение картинки */

bbtn.onclick = function() {

  var btnClass = bbtn.getAttribute('class'); 
  if(btnClass === 'dark') {
    bbtn.setAttribute('class','light');
    bbtn.textContent = 'уменьшить';
var ul=	displayedImage.getAttribute('src');
    overlay.style.backgroundImage='url('+ul+')';
	overlay.style.display = 'block';
  } else {
    bbtn.setAttribute('class','dark');
    bbtn.textContent = 'увеличить';
    overlay.style.display = 'none';
  }
}




let header=document.querySelector('#headera');
let h1=document.querySelector('#h1a');
let h2=document.querySelector('#h2a');
let svg=document.querySelector('svg');
let p=document.querySelector('#pa');
let img=document.querySelector("img");
let menu=document.querySelector("#menu");
let next=document.querySelector(".next");
let prev=document.querySelector(".prev");


 
svg.addEventListener('click',fsvg);
menu.addEventListener('click',fnsvg);
let close=document.querySelector("#close");
close.addEventListener('click',closed);
function closed (){ return menu.style.display="none";}

function fsvg(){//var cc=menu.style.display;
   if(menu.style.display='none') { return menu.style.display="block";}
   
 

}

 var client = window.innerWidth;
  function fnsvg(){var cc=menu.style.display; if(cc=='block' && client < "600") { return menu.style.display="none";}
  
 }
 window.addEventListener( 'resize' ,fnbody  );
 
function fnbody(){if(client > "600") return  menu.style.display="block"; }



 //динамическая часть 
 
 var litext = document.querySelectorAll('li');
 var aside=document.querySelector('aside');
 
  for (let ie of litext)
ie.onclick= async function fun(e) {
	
	let targetclass = e.target.getAttribute('class');
	if (targetclass == 'clickmenu'){ return e.preventDefault();
            } else{
				 var imgg=aside.querySelectorAll('img');
	for(let i of imgg)
	if(i !==undefined&& i.className !=='displayed-img') {i.remove();}
var uid = e.target.getAttribute('id');  //устанавливаем в локалсторадже id пользователя статьи
localStorage.setItem('useridd',uid);	

    var url = '/api/users/'+uid;  

    try {
        var response = await fetch(url, {
            method: 'GET', // или 'PUT'
            headers: {
                'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
            }
        });
        var json = await response.json();
        var zhead = json.header;
        var zh1 = json.h1;
		var zh2 = json.h2;
        var zp = json.p;
		var mimg = json.aws;
		var fu = mimg[0];
		for (let i of mimg){
		//var zimg = json.images[i];
		var zimg = i;
		var img = new Image();
		
		
		img.src = zimg ;
		displayedImage.setAttribute('src',fu);
		//var thumbbar = document.querySelector('.thumb-bar');
		img.setAttribute('id',zimg);
		img.setAttribute('class','images');
		
		
		thumbBar.appendChild(img);
		img.addEventListener('click',function(e){    var imgSrc = e.target.getAttribute('src');
      displayedImage.setAttribute('src', imgSrc);})//событие выьрать  изображение
		}
        header.textContent = zhead;
		h1.textContent = zh1;
		h2.textContent = zh2;
		p.textContent = zp;
       // console.log('Успех:');
		for(let i of litext){if(i !==e.target)
		i.setAttribute('class','menu');
		e.target.setAttribute('class','clickmenu');}//устанавливаем 'class' для preventDefault события на кнопке выбора статьи
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
}
///////////

//   СТАВИМ КНОПКУ "УСТАНОВКИ ПРИЛОЖЕНИЯ"
var pageVisibility = document.visibilityState;

// subscribe to visibility change events
document.addEventListener('visibilitychange', function() {
  // fires when user switches tabs, apps, goes to homescreen, etc.
    if (document.visibilityState == 'hidden') {console.log('ПИЗДЕЦ')}

    // fires when app transitions from prerender, user returns to the app / tab.
    if (document.visibilityState == 'visible') {console.log(pageVisibility)}
});





 
var buttonInstall=menu1;
var kill;
menu1.setAttribute('hidden','')
 kill=menu1.hidden;

let deferredPrompt;
function showInstallPromotion(){menu1.removeAttribute('hidden','')}

window.addEventListener('beforeinstallprompt', (e) => { //событие предлагающее установить приложение (+)
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});

buttonInstall.addEventListener('click', (e) => {
  // Hide the app provided install promotion
  //hideMyInstallPromotion();
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  });
});
window.addEventListener('appinstalled', (evt) => {   //событие запускаеться если прирожение установленно
kill='true'
	//menu1.setAttribute('hidden','');
  // Log install to analytics
  console.log('INSTALL: Success');
});


