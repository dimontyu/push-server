 
 //node index.js
 let ui=html`<style>
      #int {
		  position:fixed;
		  display:block;
		  background-color:blue;
		max-width:360px;
        height:300px;
		opacity: 1;
		z-index: 1;
		overflow: auto;
		
      }
	  #int i {
    background-color: red;
    float:right;
	margin-right:70px;
}
	#int h1{color:#00ffdcad;
	font-size: 1em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    font-weight: bold;
	
	}
a{font-size:1em;
	text-decoration:none;
	color:white;
	}
	.info:hover{background:#cd66c5e0;}
      .info {
		  display:flex;
        font-size: 0.8rem;
        max-width:360px;
        
        border: 1px solid black;
        padding: 10px;
        background: blue;
        border-radius: 10px;
        opacity: 1;
        transition: 0.6s all;
		
        
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
.space{
display:flex;
max-width:360px;
background:#ffffff75 ;
padding: 20px;
transition: 0.6s all;
}
      .img1i {
        width: 100px;
	cursor: zoom-in;
      }
</style>  `;

var eu=html`<style>
 #ipt i {
	 display:block;
	 position:fixed;
    background-color: red;
    float:right;
	margin-right:70px;
	z-index: 3;
}
</style> `;
 
 let pmsg=document.querySelector('#pmsg');
 let headerbot=document.querySelector('#int');
let he=document.querySelector('#ipt');
import {html, render} from '../lit-html/lit-html.js'


function history(){
	
const clickHandler = {
  // handleEvent method is required.
  handleEvent(e) { 
  headerbot.style.display= 'none';
 he.style.display= 'none'; 
  },
  
  capture: true,
};	
	
	
	
	

	
headerbot.style.display= 'block';
he.style.display= 'block';
var db;
const dbName = "SWdb";
const A=[];

var request = indexedDB.open(dbName);

request.onerror = function(event) {
  alert("ху из ху IndexedDB?!");
};

request.onsuccess = function(event){
	console.log('OK');
	
	
db = request.result;		
let prequest=db.transaction("customers").objectStore("customers").getAllKeys();
prequest.onsuccess = function() {
let items =prequest.result ;
 
      
 for(let i of items){ let request = db.transaction("customers").objectStore("customers").get(i);

 request.onsuccess = function(){
//aa:юсер агент сообщения,bb:заголовок сообщения,ee:тело сообщения,dd:дата сообщения.	 
let [aa,bb,ee,dd]=[request.result.body.agent,request.result.body.title,request.result.body.body,request.result.ssn];
 //console.log(request.result.body.body);    
A.unshift(html`

 <span class="info" >сообщение от :${aa}</span>
 <span class="info">${bb}</span>
 <span class="info">${ee}</span>
 <span class="info">${dd}</span>
 <span class="space"></span>
 `);
 
 return render(html`${ui}<h1>последние сообщения</h1>
 <i @click=${clickHandler}>close</i>
 <img class="icon" src='/img/alt.png'> ${A}`,headerbot)  	}
 };
 
}      
}
}

  if(pmsg!=undefined||pmsg!=null) { pmsg.addEventListener('click',function(){ return history()});}




 
 
 navigator.serviceWorker.addEventListener('message', event => {
 
 
 
headerbot.style.display= 'block';
 var header=(event.data.body);
 var headertitle=(event.data.title);
 var headername=(event.data.agent).toUpperCase();
 
 

  console.log(event.data)
const clickHandler = {
  // handleEvent method is required.
  handleEvent(e) { 
  headerbot.style.display= 'none';  
  },
  
  capture: true,
};





 
 return render( html`
 ${ui}
  
<h1>Вам пришло сообщение от <b style="color:red">${headername}</b> </h1>
<i @click=${clickHandler}>close</i>
<div><i @click=${history} >history 1</i></div>
<span class="icon" tabindex="0">
<img class="img1i" src='/img/alt.png'></span>
<span class="info">${headertitle}</span>
<span class="info">${header}</span>
<span class="info"><a href='/admin#${headername}'>ОТВЕТИТЬ</a></span>
`, headerbot)
});



