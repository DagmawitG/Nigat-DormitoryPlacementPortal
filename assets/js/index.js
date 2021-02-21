var requests=[]

var db;
var request = window.indexedDB.open('Students');

request.onerror = function (event) {
    console.log("error: ");
};
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("Students", { keyPath: "id" });
    objectStore.createIndex("id", "id", {unique: true});
    objectStore.transaction.oncomplete = function(event){

    }
    
    }
