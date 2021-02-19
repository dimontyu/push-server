//аякс запрос с отображением списка медиа


let headerbot=document.querySelector('#hui');
let headerbotv=document.querySelector('#v');
import {html, render} from '../lit-html/lit-html.js'


function getimg(e){
	if(localStorage.getItem('useridd')==null||localStorage.getItem('useridd')==undefined){return 0}else{
let	urljson='/api/users/'+localStorage.getItem('useridd');	
	fetch(urljson).then(function(response) {
		/* let request=event.request; */
		console.log(urljson)
   return  response.json().then(function(json) {
let items = json.aws;
 let zp = json.p;
 var zh1 = json.h1;
		var zh2 = json.h2;
 var a=[];     
 for(let i of items){ a.push( html`<img  src='${i}'><p>${zh2}</p>`)	}	 return render( html`
  
    ${a}
<div id='hui5'>
    ${zp}
  </div>
`, headerbot),render ( html`
  <div>
    ${zh1}
  </div>
`, p)
        });
})
let i;
for( i of litext){if(i !==e.target)//litex список всех <li> ,ul.

		i.setAttribute('class','menu');
		
		
		e.target.setAttribute('class','clickmenu')
		
		}

  }
}




   for (let ie of litext)
ie.addEventListener('click',function(e){
let targetclass = e.target.getAttribute('class');
let namtag=ie.querySelector('button').tagName;

console.log(namtag.toLowerCase());
	if (targetclass == 'clickmenu'||targetclass == 'dblclickmenu'){ return e.preventDefault();
            } else{
				
var uid = (e.target.getAttribute('id')==undefined||e.target.getAttribute('id')==null)?"5ea9a060cbea340a4cfc8258":e.target.getAttribute('id');  //устанавливаем в локалсторадже id пользователя статьи
localStorage.setItem('useridd',uid);	

	
return getimg(e);}})


