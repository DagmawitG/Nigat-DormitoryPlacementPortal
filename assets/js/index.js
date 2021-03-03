// var requests=[]

// var db;
// var request = window.indexedDB.open('Students');

// request.onerror = function (event) {
//     console.log("error: ");
// };
// request.onsuccess = function (event) {
//     db = request.result;
//     console.log("success: " + db);
// };

// request.onupgradeneeded = function (event) {
//     var db = event.target.result;
//     var objectStore = db.createObjectStore("Students", { keyPath: "id" });
//     objectStore.createIndex("id", "id", {unique: true});
//     objectStore.transaction.oncomplete = function(event){

//     }
    
//     }

var openRequest = indexedDB.open("test");

        openRequest.onupgradeneeded = function (e) {
            console.log("running onupgradeneeded");
            var thisDB = e.target.result;

            
                thisDB.createObjectStore("firstOS", { autoIncrement:true });
                thisDB.createObjectStore("accepted", {autoIncrement:true });
                

        }


        openRequest.onsuccess = function (e) {
            console.log("Success!");
            // 나중에 데이터를 추가하는데 사용되는 db
            db = e.target.result;
            console.log(e.target)
            // 이벤트 등록
            // displayData();
            // document.querySelector("#addButton").addEventListener("click", addPerson, false);
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
