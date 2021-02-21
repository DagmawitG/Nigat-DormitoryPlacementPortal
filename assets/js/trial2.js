
    let idbSupported = false
    if ("indexedDB" in window) {
        idbSupported = true;
    }

    if (idbSupported) {
        // indexedDB 열기
        var openRequest = indexedDB.open("test", 3);

        openRequest.onupgradeneeded = function (e) {
            console.log("running onupgradeneeded");
            var thisDB = e.target.result;

            // firstOS이라는 저장소가 없으면
            if (!thisDB.objectStoreNames.contains("firstOS")) {
                // 저장소를 만들어줌
                thisDB.createObjectStore("firstOS", { autoIncrement:true });
            }

            if (!thisDB.objectStoreNames.contains("secondOS")) {
                thisDB.createObjectStore("secondOS");
            }
        }


        openRequest.onsuccess = function (e) {

            console.log("Success!");
            // 나중에 데이터를 추가하는데 사용되는 db
            db = e.target.result;
            // var transaction = db.transaction(['firstOS'], "readonly");
            // var objectStore = transaction.objectStore('firstOS');
            // document.getElementById("name1").innerHTML=(objectStore.get(2));
            console.log(e.target)
            displayData();
            // 이벤트 등록
            document.querySelector("#addButton").addEventListener("click", addPerson, false);
            
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
    }

    function displayData() {
        var transaction = db.transaction(['firstOS'], "readonly");
        var objectStore = transaction.objectStore('firstOS');
      
        objectStore.openCursor().onsuccess = function(event) {
          var cursor = event.target.result;
          if(cursor) {
            // var listItem = document.createElement('li');
            // listItem.innerHTML = cursor.value.name + ', ' + cursor.value.email;
            // list.appendChild(listItem);
            document.getElementById("name1").innerHTML=cursor.value.name;
      
            cursor.continue();
          } else {
            console.log('Entries all displayed.');
          }
        };
      }
    // function getData() {
    //     // open a read/write db transaction, ready for retrieving the data
    //     var transaction = db.transaction(["firstOS"], "readwrite");
      
    //     // report on the success of the transaction completing, when everything is done
    //     transaction.oncomplete = function(event) {
    //       note.innerHTML += '<li>Transaction completed.</li>';
    //     };
      
    //     transaction.onerror = function(event) {
    //       note.innerHTML += '<li>Transaction not opened due to error: ' + transaction.error + '</li>';
    //     };
      
    //     // create an object store on the transaction
    //     var objectStore = transaction.objectStore("firstOS");
      
    //     // Make a request to get a record by key from the object store
    //     var objectStoreRequest = objectStore.get(1);
      
    //     objectStoreRequest.onsuccess = function(event) {
    //       // report the success of our request
      
    //       var myRecord = objectStoreRequest.result;
    //     };
      
    //   };
    function addPerson(e) {
        var name = document.querySelector("#studName").value;
        var email = document.querySelector("#studID").value;
        console.log("About to add " + name + "/" + email);

        //people 테이블에 데이터 add 선언..
        

        

        //Define a person
        var person = {
            name: name,
            email: email,

            created: new Date()
        }

        //Perform the add
        // (data, key)a
        var request = store.add(person);

        request.onerror = function (e) {
            console.warn("Error", e.target.error.name);
            //some type of error handler
        }

        request.onsuccess = function (e) {
            console.log("Woot! Did it");
        }
    }
