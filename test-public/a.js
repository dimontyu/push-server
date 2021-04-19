const w=document.querySelector('#w-main');


const wl=document.querySelector('.wl');//кнопка создать бд из citizen.json
const sl=document.querySelector('.sl');//кнопка создать нового жителя
const ml=document.querySelector('.ml');//кнопка создать бд из citi.json
const wla=document.querySelectorAll('.wla');//кнопка изменить
const wlb=document.querySelector('.wlb');//кнопка редактор


import {html, render,directive} from '../lit-html/lit-html.js';

wl.addEventListener('click',f);
ml.addEventListener('click',ff);


//загружает в монго файл citizen.json
async function f(){

	alert('Уже создана база')
/* var response = await fetch("/test/createbaza", {
            method: 'POST'
            
        });
	
	return response */
	
	
}

async function ff(){
	
	alert('Уже есть база')
/* var response = await fetch("/test/createbaza2", {
            method: 'POST'
            
        });
	
	return response
	return response */
	
	
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
	 
    
       
   
}

/* const a = req.body.ids;
    const b = req.body.name;
	const c = req.body.city_id;
    const d = {type: "city",
        name:req.body.city 
      };
    const e = {
        type: "district",
        name:req.body.district 
      };
    const f = {
        type: "street",
        name:req.body.street 
      } ;
 */






//создать нового
var createx = async function (idx,namex,districtx,streetx,cityx) {

    postData('POST','/test/user/', {
        ids:idx,
        name: namex ,
        city: cityx,
		district: districtx ,
		street: streetx
    })

}





//изменить жителя
var updatex = async function (e,cityx,districtx,streetx,namex,idx) {
var userid=e.target.parentNode;
    
    postData('PUT','/test/user/', {
		id:idx,
        name: namex ,
        city: cityx,
		district: districtx ,
		street: streetx
    }).then((data) => {
	const tspan=e.target.parentNode.querySelectorAll('span');


tspan[1].childNodes[1].textContent=data.groups[1].name;//район
tspan[2].childNodes[1].textContent=data.groups[2].name;//улица
e.target.parentNode.childNodes[0].textContent=data.name;//житель
		});

}


//удалить статью
var xdel = async function (x) {

  
	var response = await fetch('/test/user/'+x, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
            }
        });
	
	
	 
}





for(let i of wla){
i.onclick=function(e){
	console.log(e.target.parentNode.querySelector('.wlb'))
	var ee=e.target;
	let but_update=ee.parentNode.querySelector('.wlb');
	e.target.parentNode.querySelector('.wlb').disabled=false
	e.target.parentNode.querySelector('.wlb').style.opacity='1';
	console.log(e.target.parentNode.childNodes[0].textContent)
const tspan=e.target.parentNode.querySelectorAll('span');
console.log(tspan[0])
const sp1_content=tspan[0].childNodes[1].textContent;
const sp2_content=tspan[1].childNodes[1].textContent;
const sp3_content=tspan[2].childNodes[1].textContent;	
var sp1 = document.createElement("textarea");
var sp2 = document.createElement("textarea");
var sp3 = document.createElement("textarea");
var sp4 = document.createElement("textarea");
var but = document.createElement("button");
var butdel = document.createElement("button");
butdel.textContent='delete';
butdel.style.color='red';
butdel.style.opacity='1';
butdel.setAttribute('data-id',e.target.dataset.id)
e.target.parentNode.appendChild(butdel);
butdel.onclick=fs;
but.textContent='отмена';
but.style.opacity='1';
sp1.value=sp1_content;
sp1.style.backgroundColor='#00b2ff';
sp1.setAttribute('readonly','')
sp2.value=sp2_content;
sp3.value=sp3_content;
sp4.value=e.target.parentNode.childNodes[0].textContent;
	
let a=	e.target.parentNode.replaceChild(sp1,tspan[0]),
	b= e.target.parentNode.replaceChild(sp2,tspan[1]),
	c=e.target.parentNode.replaceChild(sp3,tspan[2]),
	d=e.target.parentNode.appendChild(sp4),
	u=e.target.parentNode.replaceChild(but,e.target);
	
	//отмена действия
	but.onclick=function(e){e.target.parentNode.replaceChild(tspan[0],sp1),
	e.target.parentNode.replaceChild(tspan[1],sp2),
	e.target.parentNode.replaceChild(tspan[2],sp3),
	e.target.parentNode.removeChild(sp4),
	butdel.remove();
	e.target.parentNode.replaceChild(ee,but);
	ee.parentNode.querySelector('.wlb').disabled=true}
	
	console.log(but_update)
	
	
	
	but_update.onclick=function(e){let cityx=sp1.value,//город
	districtx=sp2.value,//район
	streetx=sp3.value,//улица
	namex=sp4.value,//имя
	idx=but_update.dataset.id;//id
		
		updatex(e,cityx,districtx,streetx,namex,idx),e.target.parentNode.replaceChild(tspan[0],sp1),
	e.target.parentNode.replaceChild(tspan[1],sp2),
	e.target.parentNode.replaceChild(tspan[2],sp3),
	e.target.parentNode.removeChild(sp4),
	butdel.remove();
	e.target.parentNode.replaceChild(ee,but);
	e.target.disabled=true
	}
	
	//e.target.style.opacity='1';
	
	}
}
let headerbot=document.querySelector('#headerbot');	
sl.onclick=function(){
let districtx,//район
	streetx,//улица
	namex,//имя
	idx,
	cityx;	
	
	const clickHandler = {
  // handleEvent method is required.
  handleEvent(e) { 
  return render( html`<div class="col-sm-2" style="display:none;"></div>`,headerbot)
  },
  // event listener objects can also define zero or more of the event 
  // listener options: capture, passive, and once.
  capture: true,
};
	
const data1 = {
  handleEvent(e) { 
  console.log(e.target.value)
  namex=e.target.value;
  },
 capture: true,
};
const data2 = {
  handleEvent(e) { 
  console.log(e.target.value);
  idx=e.target.value;cityx=(e.target.value==1)?'Москва':(e.target.value==2)?'Воронеж':'Санкт-Петербург';
  },
 capture: true,
};
const data3 = {
  handleEvent(e) { 
  console.log(e.target.value)
  districtx=e.target.value;
  },
 capture: true,
};
const data4 = {
  handleEvent(e) { 
  console.log(e.target.value)
  streetx=e.target.value;
  },
 capture: true,
};
	
	const clickCreate = {
  handleEvent(e) {
	if (idx==undefined){idx=1;cityx='Москва'} ; 
  createx(idx,namex,districtx,streetx,cityx );
  
  },
 capture: true,
};
	
	return render( html`
 
  
	
	
<div class="col-sm-2" style="display: block;"><i @click=${clickHandler} id="stop" style="display: inline-flex;">+</i>

<div class="form"><label for="title">Имя:</label><input @change=${data1} class="form" id="title" type="text" placeholder="Ваше имя"  required="true" value=""></div>

<select @change=${data2} class="form" id="author" type="select" placeholder="Выберите город"  required="true"><option value=1>Москва</option><option value=2>Воронеж</option><option value=3>Санкт-Петербург</option></select>

<div class="form"><label for="title">Район:</label><input @change=${data3} class="form" id="title" type="text" placeholder="Район" name="title" required="true" value=""></div>

<div class="form"><label for="title">Улица:</label><input @change=${data4} class="form" id="title" type="text" placeholder="Улица"  required="true" value=""></div><div @click=${clickCreate} class='form hform'>загрузить</div>
</div>`
, headerbot)
}


function fs(e){
var userid=e.target.getAttribute('data-id');	
var doc=e.target.parentNode;	
	const clickHandler = {
  // handleEvent method is required.
  handleEvent(e) { 
  return render( html`<div class="col-sm-2" style="display:none;"></div>`,headerbot)
  },
  // event listener objects can also define zero or more of the event 
  // listener options: capture, passive, and once.
  capture: true,
};

const clickDel = {
  // handleEvent method is required.
  handleEvent(e) {
	xdel(userid);
doc.remove();	
  return render( html`<div class="col-sm-2" style="display:none;"></div>`,headerbot);
  },
  // event listener objects can also define zero or more of the event 
  // listener options: capture, passive, and once.
  capture: true,
};
	

	
	
	return render( html`
 
  
	
	
<div class="col-sm-2" style="display: block;"><i @click=${clickHandler} id="stop" style="display: inline-flex;">+</i>
<div class='form'>Вы действительно хотите удалить запись</div><div @click=${clickDel} class='form hform'>ДА</div><div @click=${clickHandler} class='form hform'>НЕТ</div>

</div>`
, headerbot)
}
