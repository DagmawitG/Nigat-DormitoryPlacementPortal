
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
                thisDB.createObjectStore("secondOS", { autoIncrement:true });
            }

            if (!thisDB.objectStoreNames.contains("secondOS")) {
                thisDB.createObjectStore("firstOS");
            }
        }


        openRequest.onsuccess = function (e) {
            console.log("Success!");
            // 나중에 데이터를 추가하는데 사용되는 db
            db = e.target.result;
            console.log(e.target)
            // 이벤트 등록
            displayData();
            document.querySelector("#addButton").addEventListener("click", addPerson, false);
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
    }

    function addPerson(e) {
        var name = document.querySelector("#studName").value;
        var email = document.querySelector("#studID").value;
        console.log("About to add " + name + "/" + email);

        //people 테이블에 데이터 add 선언..
        var transaction = db.transaction(["firstOS"], "readwrite");
        var store = transaction.objectStore("firstOS");

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

    function displayData() {
        var transaction = db.transaction(['firstOS'], "readonly");
        var objectStore = transaction.objectStore('firstOS');
        
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
          if(cursor) {
            // var listItem = document.createElement('li');
            // listItem.innerHTML = cursor.value.name + ', ' + cursor.value.email;
            // list.appendChild(listItem);
            count1=1;
            document.getElementById("name"+count1).innerHTML=cursor.value.name;
            document.getElementById("dep").innerHTML=cursor.value.email;
            count+=1;
      
            cursor.continue();
          } else {
            console.log('Entries all displayed.');
          }
        };
      }