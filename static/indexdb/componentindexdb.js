 
 //node index.js
 
 
 
 
 let headerbot=document.querySelector('#int');

import {html, render} from '../lit-html/lit-html.js'





 async function qml (e)  {
	 console.log(e.target.parentNode.parentNode.childNodes[1].childNodes[0])
 var xx=localStorage.getItem(e.target.getAttribute('data-text'))
var x= JSON.parse(xx)
console.log(x.title)	 
	 
headerbot.style.display= 'block';
 var header=x.title
 var headername=x.title
let blobs=e.target.parentNode.parentNode.childNodes[1].childNodes[0].src
 var lob = new Blob([blobs], {type :"image/jpeg" })
 var fileb = new File([lob], "foo.jpg", {
 type: "image/jpeg",
}); 
 let User = JSON.stringify({ userName:'for' , userAge: 'mat', comment: 'comment' });
  
  let uzer=localStorage.getItem('name');
  
 

  


  
 
  


 
//загрузить файл из indexdb в аппарат
const clickFetchimg=async function(e){
 const a = document.createElement('a');
  a.download = x.title.toLowerCase();//имя файла
  a.href = blobs;//записать файл 
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();

 }  
  //скрыть окно
const clickHandler = {
  // handleEvent method is required.
  handleEvent(e) { 
  headerbot.style.display= 'none';  
  },
  // event listener objects can also define zero or more of the event 
  // listener options: capture, passive, and once.
  capture: true,
};
 
 
 //форма записывает файл в gridfs mongodb
 return render( html`
 
  
<h1>ВЫБЕРИТЕ КУДА ОТПРАВИТЬ ${headername}</h1>
<i @click=${clickHandler}>close</i>
<span class="icon" tabindex="0"><img class="img1i" src=${blobs}></span>


<p @click=${clickFetchimg}>Сохранить на телефон</p>

`, headerbot)
}


export {qml}

