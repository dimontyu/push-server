import {qml} from './componentindexdb.js'

//window.onload = function display() {
  // Create constants ;Создаем константы
  const section = document.querySelector('main').querySelector('section');
 
  // Create an instance of a db object for us to store our database in; Создаем экземпляр объекта db для хранения нашей базы данных в
 
  
  
  
  let db;
async function perdit(qq) {
	  let objectStore = db.transaction('videos_os').objectStore('videos_os');
	  
  let Prequest = objectStore.getAllKeys()
  
	Prequest.onsuccess = function b() {   let a=Prequest.result;  for(let i=0;i<=(a.length-1);i++){   
	console.log(a[i]);   let request = objectStore.get(a[i]);
	 console.log(request)
	request.onsuccess = function(){   console.log(request.result.webm,request.result.name);
	displayVideo(request.result.webm,request.result.name,request.result.txtindex,i );
    }
	
 }
 }
 
 }
 
 
 function deletebaza(e){var request = db.transaction(['videos_os'], "readwrite")
                .objectStore('videos_os')
                .delete(e.target.getAttribute('class'));
request.onsuccess = function(event) {
  console.log('deleted')
};
//удаляем родителя кнопки
e.target.parentNode.parentNode.remove()
localStorage.removeItem(e.target.getAttribute('data-text'))}
//отображениеUI DOM API
  // Define the displayVideo() function ; Определяем функцию displayVideo ()
 async function displayVideo( webmBlob, title,txtindex,i) {
    // Create object URLs out of the blobs ; Создание URL-адресов объектов из BLOB-объектов
   
    let webmURL =URL.createObjectURL(webmBlob);

    // Create DOM elements to embed video in the page ; Создаем элементы DOM для встраивания видео на страницу
    const article = document.createElement('article');
    const h2 = document.createElement('span');
    h2.textContent =(txtindex.length == 0)? title: txtindex;
    const video = document.createElement('figure');
	const videobtn = document.createElement('button');
    videobtn.setAttribute('class',title);
	videobtn.setAttribute('data-text','btn'+i)
   videobtn.textContent='DELETE';
   const btn = document.createElement('button');
    btn.setAttribute('class',title)
	btn.setAttribute('data-text','btn'+i)
   btn.textContent='LOAD';
   const ubtn = document.createElement('button');
    ubtn.setAttribute('class',title)
   ubtn.textContent='UPDATE';
   ubtn.addEventListener('click',scrol);
   function scrol(){ var y=document.querySelector('#formElem');
   y.scrollIntoView();}
    const source2 = document.createElement('img');
    source2.src = webmURL;
	source2.setAttribute('id',title)
	const articles = document.createElement('p');
    

    // Embed DOM elements into page ; Встраиваем элементы DOM на страницу
    section.appendChild(article);
    article.appendChild(h2);
    article.appendChild(video);
	article.appendChild(articles)
   
    video.appendChild(source2);
	articles.appendChild(videobtn);
	articles.appendChild(btn);
	articles.appendChild(ubtn);
	//source2.addEventListener('click',deletebaza);
	videobtn.addEventListener('click',deletebaza);
	//устанавливаем ссылки на базу в localStorage()
	let forc=JSON.stringify({
	name:webmURL,
	title:title
		
	})
	localStorage.setItem('btn'+i,forc)
	btn.onclick=function(e){qml(e)};
  }
   

  // Open our database; it is created if it doesn't already exist ;  Открываем нашу базу данных; он создается, если он еще не существует
  // (see onupgradeneeded below) ; (см. необходимость обновления ниже)
  let request = window.indexedDB.open('videos_db', 1);

  // onerror handler signifies that the database didn't open successfully ; обработчик ошибки означает, что база данных не открылась успешно
  request.onerror = function() {
    console.log('Database failed to open');
  };

  // onsuccess handler signifies that the database opened successfully ; обработчик onsuccess означает, что база данных открылась успешно
  request.onsuccess = function() {
    console.log('Database opened succesfully');

    // Store the opened database object in the db variable. This is used a lot below ; Сохраняем открытый объект базы данных в переменной db. Это часто используется ниже
    db = request.result;
	console.log(db.objectStoreNames)
    perdit();
  };
  
  request.onupgradeneeded = function(e) {

    // Grab a reference to the opened database ; Захватываем ссылку на открытую базу данных
    let db = e.target.result;

    // Create an objectStore to store our videos in (basically like a single table)
    // including a auto-incrementing key
	 // Создаем objectStore для хранения наших видео (в основном как одна таблица)
    // включая автоинкрементный ключ
    let objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

    // Define what data items the objectStore will contain ; Определяем, какие элементы данных будет содержать objectStore
    //objectStore.createIndex('mp4', 'mp4', { unique: false });
    objectStore.createIndex('webm', 'webm', { unique: false });
objectStore.createIndex("txtindex", "txtindex", { unique: false });
    console.log('Database setup complete');
  };
  
  export {displayVideo} 
  

 
 