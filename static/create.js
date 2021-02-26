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

//SERVER DELETE IMG
function delimg(e){ var tumbler =e.target.getAttribute('class');// функция удаляем выбранное изображение
var f=e.target.getAttribute('name');
   if(tumbler=='images'&& f== undefined){ e.target.style.width='50%';  e.target.setAttribute('name','big'); 
   imgdelete.addEventListener('click',function(e){return imgdeleted(uid,classimg)});
 var uid = localStorage.getItem('useridd');	
 
var classimg=e.target.getAttribute('id'); imgdelete.style.display='block'; imgdelete.setAttribute('name',classimg);
}else{e.target.style.width='28%';e.target.removeAttribute('name');imgdelete.style.display='none';}
}
  
 async function imgdeleted(uid,classimg){//alert(uid+'  ' +classimg)

 postData('PUT',"/api/imagesdel", {
		id:uid,
         images:classimg
    });



} 
//AWS DELETE IMG
  
function delimgaws(e){ var tumbler =e.target.getAttribute('class');// функция удаляем выбранное изображение
var f=e.target.getAttribute('name');
   if(tumbler=='images'&& f== undefined){ e.target.style.width='50%';  e.target.setAttribute('name','big'); 
   imgdelete.addEventListener('click',function(e){return imgdeletedaws(uid,classimg,awsurl)});
 var uid = localStorage.getItem('useridd');	
 
var classimg=e.target.getAttribute('id');var awsurl=e.target.getAttribute('aws'); imgdelete.style.display='block'; imgdelete.setAttribute('name',classimg);
}else{e.target.style.width='28%';e.target.removeAttribute('name');imgdelete.style.display='none';}
}
  
 async function imgdeletedaws(uid,classimg,awsurl){//alert(uid+'  ' +classimg)
let bucketname=localStorage.getItem('name');
 postData('PUT',"/awsinput/"+classimg+"/"+bucketname, {
		id:uid,
         aws:awsurl
    });



} 


 for (let i of litext)
i.onclick= async function fun(e) {
	
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
        var zhead = json.header;
        var zh1 = json.h1;
		var zh2 = json.h2;
        var zp = json.p;
		var mimg = json.images;//изображение из aws
		var aws = json.aws;
		for (let iu of aws){
		
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
		for (let i of mimg){
		//var zimg = json.images[i];
		var zimg = i;
		var img = new Image();
		
		
		img.src ='/images/'+ zimg ;
		var thumbbar = document.querySelector('.thumb-bar');
		img.setAttribute('id',zimg);
		img.setAttribute('class','images');
		
		
		thumbbar.appendChild(img);
		img.addEventListener('click',function(e){return delimg(e)})//событие выьрать и удалить изображение^| fynction delimg()
		}
        headtext.value = zhead;
		h1text.value = zh1;
		h2text.value = zh2;
		patext.value = zp;
       // console.log('Успех:');
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
	.then((data) => { console.log('успех');clear(); //УБРАТЬ ОБЕ КОММЕНТИРОВАНИЕ ПОСЛЕ ТЕСТА!!!
        
       });
   
}
var a = async function () {

    usertexti = usertext.textContent;  //имя автора
    headtexti = headtext.value;  //описание содержимого статьи
	h1texti = h1text.value;  //название статьи
	h2texti = h2text.value; //описание фото
	patexti = patext.value; //содержание статьи
    postData('POST','/api/users/', {
        name: usertexti,
        header: headtexti,
		h1: h1texti,
		h2: h2texti,
		p: patexti
    });
       // .then((data) => {
        //    p.textContent = data; // JSON data parsed by `response.json()` call
      //  });
}


var b = async function () {
var userid=localStorage.getItem('useridd');// извлекаем id статьи из localStorage и вставляем в put запрос на сервер
    usertexti = usertext.textContent;  //имя автора
    headtexti = headtext.value;  //описание содержимого статьи
	h1texti = h1text.value;  //название статьи
	h2texti = h2text.value; //описание фото
	patexti = patext.value; //содержание статьи
    postData('PUT','/api/users/', {
		id:userid,
        name: usertexti,
        header: headtexti,
		h1: h1texti,
		h2: h2texti,
		p: patexti
    });
       // .then((data) => {
        //    p.textContent = data; // JSON data parsed by `response.json()` call
      //  });
}
var c = async function () {
var userid=localStorage.getItem('useridd');
  
    postData('DELETE','/api/users/'+userid );
	let elem = document.getElementById(userid);
     elem.parentNode.removeChild(elem); 
}
function clear(){  headtext.value=null;  //описание содержимого статьи
	 h1text.value=null;  //название статьи
	 h2text.value=null; //описание фото
	 patext.value=null; //содержание
	 var img=document.querySelectorAll('img');//удаляем содержимое и обновляем страницу
	
	if(img[0] !==undefined) {img[0].remove();}//удаляем фото
	window.location.reload(); 
}


postbtn.onclick = a; 
putbtn.onclick = b;
deletebtn.onclick = c;
clsbtn.addEventListener('click',clear); //кнопка очистить поля

let svg=document.querySelector('svg');
let menu=document.querySelector("#menu");
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

let inputimg = document.querySelector('#imginput');//инпут элемент с кнопкой submit
let fileElem = document.querySelector('#fileElem');//инпут элемент формы
let myform = document.querySelector('.my-form');//форма

let inputimgname = fileElem.getAttribute('name');
let bucketname=inputimgname;
let myformaction = myform.getAttribute('action');//установить актион формы для записи на сервер файла изображения
 //h2text.onchange 
 //сдесь происходит настройка формы отправки с полями на сервер
 const qwe  =  function(){ if(h2text.value !==undefined){localStorage.setItem('inputimgname',inputimgname+h2text.value);
 let nameImg = localStorage.getItem('inputimgname');
 let uid=localStorage.getItem('useridd');
 fileElem.setAttribute('name',nameImg);myform.setAttribute('action',myformaction+h2text.value+'/'+uid+'/'+bucketname)//устанавливаем имя файла отпр img
 }
 }
 
 
 var imgcreate = document.querySelector('#menu4');//кнопка IMGCREATE в меню
 
 var imgpost = async function subm(e) {
	 e.preventDefault();
//let gallery = document.querySelector('#gallery');
//if(gallery.src !==undefined)


	 //отправляет изображение в статью 
	 //submform();//эмуляция нажатия кнопки формы
var userid=localStorage.getItem('useridd');
 usertexti = usertext.textContent;  //имя автора
    headtexti = headtext.value;  //описание содержимого статьи
	h1texti = h1text.value;  //название статьи
	h2texti = h2text.value; //описание фото
	patexti = patext.value; //содержание статьи 
	//nameImg = localStorage.getItem('inputimgname');//имя и путь к файлу img
    postData('PUT','/api/images/', {
        id: userid,
       // images: '/'+nameImg+'.jpg',
		        name: usertexti,
        header: headtexti,
		h1: h1texti,
		h2: h2texti,
		p: patexti
    }).then(function(data){return submform()}); 
 
   //setTimeout(submform, 3000);   //submform();
}

imgcreate.addEventListener('click', imgpost);//событие отправки изображения из меню
imgvalue.addEventListener('click', imgpost);//отправка изображения из формы

 function submform(){ return inputimg.click();} //функция нажимающая на кнопку формы изображений

fileElem.addEventListener('click',function(){return imgvalue.style.display = 'block';});



//window.onload=function(){return clsbtn.click();}
	
	
	