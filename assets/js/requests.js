let students = []

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
            var thatDB = e.target.result;


            if (!thisDB.objectStoreNames.contains("secondOS")) {
                thisDB.createObjectStore("firstOS", { autoIncrement:true });
                thatDB.createObjectStore("accepted", {autoIncrement:true });
            }
        }


        openRequest.onsuccess = function (e) {
            console.log("Success!");
            // 나중에 데이터를 추가하는데 사용되는 db
            db = e.target.result;
            console.log(e.target)
            // 이벤트 등록
            displayData();
            // document.querySelector("#addButton").addEventListener("click", addPerson, false);
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
    }


    function displayData() {
      
        var transaction = db.transaction(['firstOS'], "readonly");
        var objectStore = transaction.objectStore('firstOS');
        
        // var myIndex = objectStore.index('id');
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            let n=0
          if(cursor) {
              
            data= cursor.value.name
            document.getElementById("cont").innerHTML+=`
            <div class=" u-align-center-xs u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-container-style u-list-item u-repeater-item">
      
            <div class="card mb-4 u-container-layout u-similar-container u-container-layout-1" id="${n}">
              <div alt="" class="" ></div><h3 class="u-custom-font u-font-oswald ">${cursor.value.name}</h3>
              <p class="u-text u-text-palette-2-base u-texts">${cursor.value.id}</p>
              <p class="">${cursor.value.desc}</p>
              <button class="u-btn          u-btn-5" id="acceptButton" onclick="addList(${cursor.value.id})">Accept</button>
              <button class="u-btn          u-btn-6" id="declineButton">Decline</button>
            </div>
          </div>`;
            n=n+1
            cursor.continue();

          } else {
            console.log('Entries all displayed.');
          }
          
        };


        
      }

      function addList(data){

        
        var transaction = db.transaction(["firstOS"]);
        var objectStore = transaction.objectStore("firstOS");
        var request = objectStore.get(data);
        request.onerror = function(event) {
          // Handle errors!
        };
        request.onsuccess = function(event) {
          // Do something with the request.result!
          
          console.log("Name for is " + request.result.name);
          students.push(request.result)
        };
        console.log('add list initiated')
        
        // console.log(data)
        console.log(students)
      }

      function me(){
        console.log('me-yaw')
      }