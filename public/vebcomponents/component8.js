 
 //node index.js
 let ui=html`<style>
      #int {
		  position:fixed;
		  display:block;
		  background-color:blue;
		max-width:300px;
        height:300px;
		opacity: 1;
		z-index: 1;
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
      .info {
		  display:flex;
        font-size: 0.8rem;
        width: 200px;
        
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

      .img1i {
        width: 100px;
	cursor: zoom-in;
      }
</style>  `;
 
 
 
 let headerbot=document.querySelector('#int');

import {html, render} from '../lit-html/lit-html.js'



 
 
 navigator.serviceWorker.addEventListener('message', event => {
headerbot.style.display= 'block';
 var header=(event.data.body)
 var headername=(event.data.agent)
//wigit=(event.data.body)
  //console.log(event.data.msg, event.data.url);
  console.log(event.data)
const clickHandler = {
  // handleEvent method is required.
  handleEvent(e) { 
  headerbot.style.display= 'none';  
  },
  // event listener objects can also define zero or more of the event 
  // listener options: capture, passive, and once.
  capture: true,
};
 
 return render( html`
 ${ui}
  
<h1>ВАМ ПРИШЛО СООБЩЕНИЕ ОТ ${headername} </h1><i  
@click=${clickHandler}>close</i>
<span class="icon" tabindex="0"><img class="img1i" src='/img/alt.png'></span>
<span class="info">${header}</span><span class="info"><a href='/admin'>ОТВЕТИТЬ</a></span>
`, headerbot)
});




