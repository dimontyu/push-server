var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var bbtn = document.querySelector('#btn');
var overlay = document.querySelector('.overlay');
var bb = document.querySelector('#b');
var body = document.querySelector('body');
/* адрес и количество файлов images */

function registrat(){return (localStorage.getItem('name')!==null)?document.querySelector('#registration').remove():'0';}
registrat();







function callback(urljson,urlimg,n){fn(urljson,urlimg,n)}//все это для для статичного просмотра из кэша
var menu1=document.querySelector("#menu1");
var menu2=document.querySelector("#menu2");
var menu3=document.querySelector("#menu3");//
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


function fsvg(){
   if(menu.style.display='none') { return menu.style.display="block";}
   
 

}

 var client = window.innerWidth;
  function fnsvg(){var cc=menu.style.display; if(cc=='block' && client < "600") { return menu.style.display="none";}
  
 }
 window.addEventListener( 'resize' ,fnbody  );
 
function fnbody(){if(client > "600") return  menu.style.display="block"; }


//Логическое И (&&)

 ////////////////////
 //динамическая часть 
 
 var litext = document.querySelectorAll('li');
 var aside=document.querySelector('aside');
 
 
var rr=document.cookie;




 function m(){
 //var x='dich=dush'
 cy='ddima'; cu='fuu';
 rr=''+cu+''+ '='+''+cy+''+';SameSite=Lax';
//rr=`${x}`
 
 
return  document.cookie= rr;}
 var ccc=rr;
if (document.cookie.split(';').some((item) => item.includes(ccc))) {
	
    console.log('The cookie "reader" has "1" for value')
}
m();



//обновить сервис воркера
var createU=document.querySelector("#create");//регистрируем сервисворкера
var nocreateU=document.querySelector("#nocreate");//удалить сервисворкер

createU.addEventListener('click',crf);
nocreateU.addEventListener('click',crfj);

function crf(e){console.log('i am update');   navigator.serviceWorker.register('sw.js').then(reg => {
	reg.installing; // the installing worker, or undefined
  reg.waiting; // the waiting worker, or undefined
  reg.active;
  // sometime later…
  reg.update();console.log('i am update')
})}
function crfj(e){   navigator.serviceWorker.register('sw.js').then(reg => {
	
  // sometime later…
  reg.unregister();console.log('i am update');
})}
