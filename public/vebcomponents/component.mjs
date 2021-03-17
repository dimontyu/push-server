"use strict";

var w=localStorage.getItem('info');
var b=document.querySelector('#h');//create button
var c=[];//массив для гиперссылок изображений
 var can=document.querySelector('#can');
for (let ie of litext){
		

ie.querySelector('button').addEventListener('click',function(e){
	
	
 var arr=e.target.getAttribute('data-images');var myArray =arr.split(','); c=myArray; return ggg(e,c),ie.querySelector('button').setAttribute('class','clickmenu')})}

function imas(x){return x};


 //создаем селектор '<info-i>'
  function ggg(e,c){
	  for (let ie of litext){if(ie.querySelector('button')!==e.target)
	  ie.querySelector('button').setAttribute('class','dblclickmenu');
	  
	  
	  }
	 
	  
	console.log(c);
 
   
//can.setAttribute('style', `opacity:0;`);
  const inn=document.querySelector('info-i');
  inn.removeAttribute('hidden');
 // const inn=document.createElement('info-i');// создаем пользовательский элемент<info-i>
  const dtext=inn.setAttribute('data-text',e.target.parentNode.childNodes[2].textContent);
  //var arw=can.querySelectorAll('info-i');
   //if(arw[0]){ can.childNodes[1].remove();can.childNodes[0].remove();};
  inn.setAttribute('class','ar');
  var ii=can.querySelector('i');
  ii.removeAttribute('hidden');
 //can.appendChild(ii);
 ii.textContent='close'; 
  //can.appendChild(inn);
  

  
 ii.onclick=function(){ii.setAttribute('hidden',''),inn.setAttribute('hidden','');  } ;
 
 
if(w!=='info')  {customElements.define('info-i', Info); }
  } 
  
  
  //КОНСТРУКТОР ВЕБКОМПОНЕНТА
 class Info extends HTMLElement {
	 //устанавливаем наблюдатель за изменениями аттрибутами
 static get observedAttributes() {
    return ['data-text'];
  }	 
	 
	 
  constructor() {
    // Always call super first in constructor
    super();
	
	

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // Create spans
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
const wrapperB = document.createElement('button');
    wrapperB.setAttribute('class', 'wrapperB');
	wrapperB.textContent='->';
	const wrapperBL = document.createElement('button');
    wrapperBL.setAttribute('class', 'wrapperBL');
	wrapperBL.textContent='<-';
const textB = document.createElement('p');
    textB.setAttribute('class', 'textB');
	textB.textContent=c.length;	
    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', 0);

    const info = document.createElement('span');
    info.setAttribute('class', 'info');


    const img1 = document.createElement('img');
	var img2= document.createElement('img');
	img2.setAttribute('class','img2');
	img1.setAttribute('class','img1');
	img1.setAttribute('decoding','async');
    //img1.src = imgUrl;
    icon.appendChild(img1);
img1.onclick=function(){ 
img2.style.display='block';
img2.onclick=function(){img2.style.display='none';}
  img2.src = img1.src;
//ar.appendChild(img2)

  }
  let qtext=textB.textContent;
  //стрелка в право
 function wrapperBF(){let uu=img1.src; for (let i=0;i<=(c.length-1);i++)
 {if(uu==c[i]&&c[i]!==c[c.length-1])
 return [img1.src=c[i+1],textB.textContent=i+1];
 else if(uu==c[i]&&c[i]==c[c.length-1]) [img1.src=c[0],textB.textContent='0'];
 else{img1.src='/images/cam.jpg';} }} ;
 //стрелка в лево
 function wrapperBFL(){let uu=img1.src; for (let i=0;i<=(c.length-1);i++)
 {if(uu==c[i]&&c[i]!==c[0])
 return [img1.src=c[i-1],textB.textContent=i-1]
 else if(uu==c[0]) [img1.src=c[c.length-1],textB.textContent=c.length-1];
 else{img1.src='/images/cam.jpg';} }} 
  
    // Create some CSS to apply to the shadow dom
  
   
	
	//другой способ использования подключения стилей
	
	const linkElem = document.createElement('link');
linkElem.setAttribute('rel', 'stylesheet');
linkElem.setAttribute('href',"/vebcomponents/style/target.css");


shadow.appendChild(linkElem);//connect style

 
  
    shadow.appendChild(wrapper);
	shadow.appendChild(wrapperB);
	shadow.appendChild(wrapperBL);
	shadow.appendChild(textB);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
	shadow.appendChild(img2);
	 console.log(wrapper.isConnected);
	 wrapperB.addEventListener('click',wrapperBF);
	 wrapperBL.addEventListener('click',wrapperBFL);
	 
	} 

	
	
	
	
	
	
	connectedCallback(){
		 w='info';
	console.log(this.shadowRoot.querySelector('.img1').isConnected);	
    /* alert(this.shadowRoot.childNodes[1].childNodes[0].childNodes[0].tagName); */
	const root=this.shadowRoot;
	const ti=this;
ssd(root,ti);
	
 };
 disconnectedCallback(){w=''; can.removeAttribute('style'); console.log('я отключен');};
 
attributeChangedCallback(name, oldValue, newValue) {
    console.log('элемент аттрибута изменился');
    //updateStyle(this); 
	const root=this.shadowRoot;
	const ti=this;
 ssd(root,ti);
 
 }
 }
 
 
let ssd=function(x,y){let iconimg=x.querySelector('.img1');
   iconimg.src=((c[0].length!==0))?imas(c[0]):'/images1/default.jpg';

let info= x.querySelector('.info');
info.style.color='white';
var now = new Date();
    const text = y.getAttribute('data-text');
	var rf=text+':'+"  "+now.toDateString();
	
    info.textContent=rf;
  can.setAttribute('style', `opacity:1;`);
  x.querySelector('.textB').textContent=c.length;
  
  
  }	


//customElements.define('info-i', Info);












window.onload=function(){localStorage.setItem('info','')}