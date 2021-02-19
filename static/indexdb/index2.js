
///////////init tableВ ЭТОМ ФАЙЛЕ МЫ ОТКРЫВАЕМ БАЗУ ДАННЫХ И ЗАПИСЫВАЕМ ФАЙЛЫ ИЗ КОМПА.совмещен с index1.js.
import {displayVideo} from './index1.js'
(function (){

let men=document.querySelector('.men');
	let menp = document.createElement('p')	
	
	
})
const section = document.querySelector('main').querySelector('section');
 
///////forma
let dropArea = document.getElementById("drop-area");
let fileElem=document.getElementById("fileElem");
fileElem.onchange=function(e){handleFiles(e.target.files)};
 function handleFiles(files) {
  files = [...files]
  
  //files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
 
  //reader.readAsDataURL(file)
  reader.readAsArrayBuffer(file)
  reader.onloadend = function() {
	  let blobs=new Blob([reader.result],{type:"image/jpeg"})
	let webmURL = URL.createObjectURL(new Blob([reader.result],{type:"image/jpeg"})) 
	
    let img = document.createElement('img')
	
	
	
    //img.src = reader.result
	console.log(file.name)
img.src =webmURL 
    document.getElementById('gallery').appendChild(img)
  
  let [masswebmURL,j]=[blobs,file.name];
  
  console.log(masswebmURL,j)
  IDBload(masswebmURL,j)
  }
  }
/////
const IDBload =async function(masswebmURL,j  ) {
	let txt = document.querySelector('#storry').value;
	
  // Create constants ;Создаем константы
  const section = document.querySelector('main').querySelector('section');
  //const section = document.querySelector('section');
  const videos = [
    { 'name' : j },
		{'sign':txt}
    
  ];
  // Create an instance of a db object for us to store our database in; Создаем экземпляр объекта db для хранения нашей базы данных в
  let db;
  
  //высветить все картинки
 async function perdit(xx) {
	  let objectStore = db.transaction('videos_os').objectStore('videos_os');
	 

	  
 let ddt= Date.now() ;   console.log(ddt)
	let request = objectStore.get(xx);
	
	 console.log(request)
	request.onsuccess = function(){ 
	
	console.log(request.result.webm,request.result.name);
	
	
return	displayVideo(request.result.webm,request.result.name,request.result.txtindex,5 );

    }

 
 }
async function init() {
 
    let objectStore = db.transaction('videos_os').objectStore('videos_os');
	
    let request = objectStore.get(videos[0].name);
	
    request.onsuccess = function() {
				
    
        console.log('НАЧАТЬ ЗАПИСЬ');
        // Fetch the videos from the network ;Получаем видео из сети
        fetchVideoFromNetwork(videos[0]);
      
    };
  
}

  // Define the fetchVideoFromNetwork() ;function Определяем функцию fetchVideoFromNetwork ()
  function fetchVideoFromNetwork(video) {
    console.log('fetching videos from network');
   
    let webmBlob = masswebmURL;//либо получаем файд из компа или телефона

 
      storeVideo(webmBlob, video.name);
    
  }

  // Define the storeVideo() function Определяем функцию storeVideo ()Добавляем данные в INDEXDB
function storeVideo( webmBlob, name) {
  // Open transaction, get object store; make it a readwrite so we can write to the IDB ;Открытие транзакции, получение хранилища объектов; сделайте это чтение и запись, чтобы мы могли писать в IDB
  let objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
  // Create a record to add to the IDB; Создаем запись для добавления в IDB
  let record = {
   
    webm : webmBlob,
    name : name,
	txtindex:videos[1].sign
  }

  // Add the record to the IDB using add(); Добавляем запись в IDB с помощью add ()
  let request = objectStore.add(record);

  request.onsuccess = function(event) {
    console.log('Record  ЗАПИСЬ  finished',event.target.result);
  perdit(request.result);
  
  }

  request.onerror = function() {
    console.log(request.error);
  }

};


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
    init();//perdit()
  };


};


