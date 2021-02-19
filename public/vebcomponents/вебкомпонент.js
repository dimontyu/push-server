const inn=document.createElement('info-item');
const dtext=inn.setAttribute('data-text','hello dimon');
const innarticl=document.querySelector('#int');
innarticl.appendChild(inn)

 navigator.serviceWorker.addEventListener('message', event => {

var x=event.data.body;	 
function qwqw(x){return x}	 
const lii = document.createElement('p');
lii.textContent=x;
lii.style.width='30px';
innarticl.style.display='flex';
innarticl.appendChild(lii)

class Infoitem extends HTMLElement {
	
	//const inn=document.createElement('info-item');


	
  constructor() { 
    // Always call super f irst in constructor
    super();
	
const liitemTitle = document.createElement('li');


const tm=document.querySelector('#t');


	
	//liitemTitle.textContent=x;
	const wrapper = document.createElement('div');
	
	
	
	
	
	//const inn=document.querySelector('info-item');
//customElements.upgrade(inn)

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    
    wrapper.setAttribute('class', 'wrapper');

    const ulitem = document.createElement('ul');
	ulitem.appendChild(liitemTitle);
    ulitem.setAttribute('class', 'icon');
    

    const liitem = document.createElement('li');
	
	console.log(event.data)
	
    liitem.setAttribute('class', 'info');
var now = new Date();
    
    liitem.textContent = now.toTimeString();
	
	//const tm=document.querySelector('#t');
const tmcontent=document.importNode(tm.content, true);
const tmht=tmcontent.querySelector('h1');
wrapper.appendChild(tmcontent);
    // Insert icon
    let imgUrl;
   
      imgUrl ='https://lh6.googleusercontent.com/XudCHCl8TNGL7_6XPihkAgm7kvV-1CjvcVF5uNu2rH2ohZAYjDsTmzTLPZkt7sv6FbbAb2-HphVgmm35Im6atRdzBrJzaIOaVtQrv9DBttV-DBnepuV_-DzN76jeoOCiUA ';
    

    const img1 = document.createElement('img');
	var img2= document.createElement('img');
	img2.setAttribute('class','img2i')
	img1.setAttribute('class','img1i')
    img1.src = imgUrl;
    liitem.appendChild(img1);
img1.onclick=function(){ 
img2.style.display='block';
img2.onclick=function(){img2.style.display='none';}
  img2.src = imgUrl;
//ar.appendChild(img2)

  }
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = `
      .wrapper {
		  background-color:blue;
		  width:300px;
        height:300px;
      }
	  h1{color:#00ffdcad;}

      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: blue;
        border-radius: 10px;
        opacity: 1;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }

      .img1i {
        width: 100px;
	cursor: zoom-in;
      }
.img2i{
       display:block;
		position: absolute;
		max-width:500px;
		margin-top:-300px;
		    cursor: zoom-out;
}
      
      .icon:hover + .info, .icon:focus + .info {
        opacity: 0;
      }
	  
    `;

    // Attach the created elements to the shadow dom
	
    shadow.appendChild(style);
    console.log(style.isConnected);
	
    shadow.appendChild(wrapper);
    wrapper.appendChild(ulitem);
    wrapper.appendChild(img2);
	ulitem.appendChild(liitem);
	
	//var shadowW = liitemTitle.shadowRoot
	
	shadow.querySelector('li').textContent=qwqw(x)
	
  }
	
	
 }
 
 //customElements.upgrade('info-item')
 let ctor = customElements.get('info-item');
if(ctor){return}else{
customElements.define('info-item', Infoitem);}
customElements.upgrade(inn);
//innarticl.appendChild(inn)

});