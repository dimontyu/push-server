
"use strict";
function storePush(notificationData ) {
console.log(notificationData.body)	
	
var db;
const dbName = "SWdb";

function store(notificationData ) {
	
  // Open transaction, get object store; make it a readwrite so we can write to the IDB ;Открытие транзакции, получение хранилища объектов; сделайте это чтение и запись, чтобы мы могли писать в IDB
  let objectStore = db.transaction('customers', 'readwrite').objectStore('customers');
  // Create a record to add to the IDB; Создаем запись для добавления в IDB
  let record = {
	  ssn:new Date(),
      body:notificationData
}

  // Add the record to the IDB using add(); Добавляем запись в IDB с помощью add ()
  let request = objectStore.add(record);

  request.onsuccess = function(event) {
    console.log('Record  ЗАПИСЬ  finished',event.target.result);
 
  
  }

  request.onerror = function() {
    console.log(request.error);
  }

};


var request = indexedDB.open(dbName);










request.onupgradeneeded = function(event) {
  db = event.target.result;

 
  var objectStore = db.createObjectStore("customers", { autoIncrement : true });

  
 
  objectStore.createIndex("body", "body", { unique: false });
  objectStore.createIndex("ssn", "ssn", { unique: false });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  /* objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
 store(notificationData ); 
  }; */
  
  
};


request.onerror = function(event) {
  console.log("ху из ху IndexedDB?!");
};
request.onsuccess = function(event) {
	db = request.result;
  console.log("успех IndexedDB!");
  store(notificationData );
  let prequest=db.transaction("customers").objectStore("customers").getAllKeys();
 prequest.onsuccess = function() {
  let a=prequest.result;  let areslength=a.length;
 let ares=a[0];
if(a.length>10){
 db.transaction(["customers"], "readwrite").objectStore("customers").delete(ares ).onsuccess = function(e) {
  console.log("DELETE RESULTAT ");
}; 
};  
};
  
};

}