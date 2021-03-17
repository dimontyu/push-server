var usertext = document.querySelector("#user");
var headtext = document.querySelector("#head");
var h1text = document.querySelector("#h1text");
var h2text = document.querySelector("#h2a");
var patext = document.querySelector("#pa");
var postbtn = document.querySelector("#menu0");
var litext = document.querySelectorAll('li');
var putbtn = document.querySelector("#menu1");
var deletebtn = document.querySelector("#menu2");
var clsbtn = document.querySelector("#menu3");
var imgdelete = document.querySelector("#imgdelete");
var imgvalue = document.querySelector("#imgvalue");
let activate = false;


window.onload=function(){   if(litext[0])
{localStorage.setItem('useridd',litext[0].id)}else
	{localStorage.setItem('useridd','undefined')}}
const textB=document.querySelector('.textB');
void function(){ (document.getElementById(localStorage.getItem('useridd')) !==null)?textB.textContent= document.getElementById(localStorage.getItem('useridd')).dataset.descr:textB.textContent='0'}();

//SERVER DELETE IMG

//AWS DELETE IMG
  
function delimgaws(e){ var tumbler =e.target.getAttribute('class');// функция удаляем выбранное изображение
let fd=e.target.getAttribute('name');
   if(tumbler=='images'&& fd== undefined){ e.target.style.width='50%';  e.target.setAttribute('name','big'); 
   imgdelete.addEventListener('click',function(e){return imgdeletedaws(e,uid,classimg,awsurl)});
 var uid = localStorage.getItem('useridd');	
 
var classimg=e.target.getAttribute('id');var awsurl=e.target.getAttribute('aws'); imgdelete.style.display='block'; imgdelete.setAttribute('name',classimg);
}else{e.target.style.width='28%';e.target.removeAttribute('name');imgdelete.style.display='none';}
}
  
 async function imgdeletedaws(e,uid,classimg,awsurl){
let bucketname=localStorage.getItem('name');
 postData('PUT',"/awsinput/"+classimg+"/"+bucketname, {
		id:uid,
         aws:awsurl
    }).then((data)=>{console.log(document.getElementById(classimg)),document.getElementById(classimg).remove()
	let j=document.getElementById(uid);
	j.dataset.descr=j.dataset.descr-1;
	textB.textContent=j.dataset.descr;
	e.target.style.display='none';
	
	
	}//удаляем содержимое и обновляем страницу
	
	);



} 


 for (let i of litext)
i.onclick= async function fun(e) {
activate = true;	
	let targetclass = e.target.getAttribute('class');
	if (targetclass == 'clickmenu'){ return e.preventDefault();
            } else{
				 var imgg=document.querySelectorAll('img');
	for(let i of imgg)
	if(i !==undefined) {i.remove();}
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
		
		for (let iu of json.aws ){
		
			var qui=iu.split('/');
			var zimg=qui[qui.length-1];
			console.log(zimg);
		var imgaws = new Image();
		imgaws.src=iu;
		imgaws.setAttribute('class','images');
		imgaws.setAttribute('id',zimg);
		imgaws.setAttribute('aws',iu);
		imgaws.style.borderColor='blue';imgaws.style.borderWidth='5px';
		document.querySelector('.thumb-bar').appendChild(imgaws);
		imgaws.addEventListener('click',function(e){return delimgaws(e)})
		}
		
        headtext.value = json.header;
		h1text.value = json.h1;
		h2text.value = json.h2;
		patext.value = json.p;
       
		for(let i of litext){if(i !==e.target)
		i.setAttribute('class','menu');
		e.target.setAttribute('class','clickmenu');}//устанавливаем 'class' для preventDefault события на кнопке выбора статьи
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
}

async function postData(xx,url = '', data = {}) {

    // Default options are marked with *
    const response = await fetch(url, {
        method: xx, // *GET, POST, PUT, DELETE, etc.
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(data),
        success: function (data) {
		
            console.log(data)
        }
    })
	return response.json();
	 //let json=await response.json(); console.log('успех',json.h1); УБРАТЬ ОБЕ КОММЕНТИРОВАНИЕ ПОСЛЕ ТЕСТА!!!
    
       
   
}









//создать новую статью
var a = async function () {

    postData('POST','/api/users/', {
        name: usertext.textContent ,
        header: headtext.value,
		h1: h1text.value,
		h2: h2text.value,
		p: patext.value
    }).then(data => {
    window.location.reload(); 
  });

}

//сохранить изменения в статье
var b = async function () {if(activate){
var userid=localStorage.getItem('useridd');// извлекаем id статьи из localStorage и вставляем в put запрос на сервер
    
    postData('PUT','/api/users/', {
		id:userid,
        name: usertext.textContent ,
        header: headtext.value,
		h1: h1text.value,
		h2: h2text.value,
		p: patext.value
    }).then((data) => {
	
     headtext.value=data.header;  //описание содержимого статьи
	 h1text.value=data.h1;  //название статьи
	 patext.value=data.p;	
		});
}else{return}
}

//удалить статью
var c = async function () {if(activate){
var userid=localStorage.getItem('useridd');
  
	var response = await fetch('/api/users/'+userid, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
            }
        });
	
	
	let elem = document.getElementById(userid);
     elem.parentNode.removeChild(elem);
	 clear();
}else{return}	 
}
function clear(){  headtext.value=null;  //описание содержимого статьи
	 h1text.value=null;  //название статьи
	 h2text.value=null; //описание фото
	 patext.value=null; //содержание
	 var img=document.querySelectorAll('img');//удаляем содержимое и обновляем страницу
	
	if(img[0] !==undefined) {img[0].remove();}//удаляем фото
	window.location.reload(); 

}


postbtn.onclick = a; //создать новую статью
putbtn.onclick = b;//сохранить изменения в статье
deletebtn.onclick = c;//удалить статью
clsbtn.addEventListener('click',clear); //кнопка очистить поля

let svg=document.querySelector('svg');
let menu=document.querySelector("#menu");
let close=document.querySelector("#close");
close.addEventListener('click',closed);
function closed (){ return menu.style.display="none";}
svg.addEventListener('click',fsvg);
menu.addEventListener('click',fnsvg);
function fsvg(){var cc=menu.style.display;
   if(cc='none') { return menu.style.display="block";}
 }
 var client = window.innerWidth;
  function fnsvg(){var cc=menu.style.display; if(cc=='block' && client < "600") { return menu.style.display="none";}
  
 }
 window.addEventListener( 'resize' ,fnbody  );//при измннении ширины экрана делаем что-то с меню 
 
function fnbody(){if(client > "600") return  menu.style.display="block"; }

//let inputimg = document.querySelector('#imginput');//инпут элемент с кнопкой submit
let fileElem = document.querySelector('#fileElem');//инпут элемент формы
let myform = document.querySelector('.my-form');//форма

let inputimgname = fileElem.getAttribute('name');
let bucketname=inputimgname;
let myformaction = myform.getAttribute('action');//установить актион формы для записи на сервер файла изображения
 
 //сдесь происходит настройка формы отправки с полями на сервер
 const qwe  =  function(nn){ if(nn !==undefined){
 let nameImg=inputimgname+nn;
 let uid=localStorage.getItem('useridd');
 fileElem.setAttribute('name',nameImg);myform.setAttribute('action',myformaction+nn+'/'+uid+'/'+bucketname)//устанавливаем имя файла отпр img
 }
 }
 
 const antiqwe  =  function(){
 
 let nameImg=inputimgname;
 
 fileElem.setAttribute('name',nameImg);myform.setAttribute('action',myformaction)
 }
 
 
 
 var imgcreate = document.querySelector('#menu4');//кнопка IMGCREATE в меню
 
 var imgpost = async function subm(e) {var userid=localStorage.getItem('useridd');     if(activate&&(userid!=='undefined')){
	 e.preventDefault();

 postData('PUT','/api/images/', {
        id: userid,
		name:usertext.textContent,
        header:headtext.value ,
		h1: h1text.value,
		h2: h2text.value,
		p: patext.value
    }).then(function(data){return f()}); 
 
 } else{e.preventDefault();     f();}
}

function actionpost(e){let x=localStorage.getItem('useridd');    if(x==('undefined'||null)){
e.preventDefault();
e.stopPropagation();
alert("сначала создайте статью ")}else{imgpost}
}


imgvalue.addEventListener('click',imgpost);//отправка изображения из формы

 function submform(e){ e.preventDefault()} //функция нажимающая на кнопку формы изображений

//fileElem.addEventListener('click',function(){return imgvalue.style.display = 'block';});
///////




function f(){
	let uid=localStorage.getItem('useridd');
	if(uid==null||uid=='undefined'){ alert('создайте статью');return;}
	else{
	
	const formData = new FormData(myform);
const photos =fileElem;

const uri=myform.getAttribute('action');


fetch(uri, {
  method: 'POST',
  body: formData,
})
.then(response => response.json())
.then(result => {
	antiqwe();
  console.log('Success:', result);
  myform.reset();
  
 imgvalue.style.display = 'none'; 
   var imgg=document.querySelectorAll('img');
	for(let i of imgg)
	if(i !==undefined) {i.remove();}
	
	
 let j=document.getElementById(uid);console.log(j)
	j.dataset.descr=+j.dataset.descr+1; 
	textB.textContent=j.dataset.descr;

		//изображение из aws
		var aws = result.aws;
		if(activate){
		for (let iu of aws){
		
			let qui=iu.split('/');
			let zimg=qui[qui.length-1];
			console.log(zimg);
		let imgaws = new Image();
		imgaws.src=iu;
		imgaws.setAttribute('class','images');
		imgaws.setAttribute('id',zimg);
		imgaws.setAttribute('aws',iu);
		imgaws.style.borderColor='blue';imgaws.style.borderWidth='5px';
		document.querySelector('.thumb-bar').appendChild(imgaws);
		imgaws.addEventListener('click',function(e){return delimgaws(e)})
		}}else{
			let iu=aws[aws.length-1];
		let qui=iu.split('/');
			let zimg=qui[qui.length-1];
			console.log(zimg);
		let imgaws = new Image();
		imgaws.src=iu;
		imgaws.setAttribute('class','images');
		imgaws.setAttribute('id',zimg);
		imgaws.setAttribute('aws',iu);
		imgaws.style.borderColor='blue';imgaws.style.borderWidth='5px';
		document.querySelector('.thumb-bar').appendChild(imgaws);
		imgaws.addEventListener('click',function(e){return delimgaws(e)})	
			
			
			
		}
		
        headtext.value = result.header;
		h1text.value = result.h1;
		patext.value = result.p;  
  
  })
.catch(error => {
  console.error('Error:', error);
})}}
imgcreate.addEventListener('click',f);











	
	
	