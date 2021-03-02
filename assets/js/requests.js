let students = []

let idbSupported = false
    if ("indexedDB" in window) {
        idbSupported = true;
    }

    if (idbSupported) {
        
        var openRequest = indexedDB.open("test");

        openRequest.onupgradeneeded = function (e) {
            console.log("running onupgradeneeded");
            var thisDB = e.target.result;

            if (!thisDB.objectStoreNames.contains("firstOS"), !thisDB.objectStoreNamescontains("accepted")){
                thisDB.createObjectStore("firstOS", { autoIncrement:true });
                thisDB.createObjectStore("accepted", {autoIncrement:true });
            }
        }


        openRequest.onsuccess = function (e) {
            console.log("Success!");
            
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
            
          if(cursor) {
              
            // data= cursor.value.name
            document.getElementById("cont").innerHTML+=`
            <div class=" u-align-center-xs u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-container-style u-list-item u-repeater-item">
      
            <div class="card mb-4 u-container-layout u-similar-container u-container-layout-1" id="${cursor.key}">
              <div alt="" class="" ></div><h3 class="u-custom-font u-font-oswald ">${cursor.value.name}</h3>
              <p class="u-text u-text-palette-2-base u-texts">${cursor.value.id}</p>
              <p class="">${cursor.value.desc}</p>
              <button class="u-btn          u-btn-5" id="acceptButton" onclick="addList(${cursor.key}, ${cursor.value.id})">Accept</button>
              <button class="u-btn          u-btn-6" id="declineButton" onclick="decline(${cursor.key}, ${cursor.value.id})">Decline</button>
            </div>
          </div>`;
            
            // console.log(n);
            cursor.continue();

          } else {
            console.log('Entries all displayed.');
          }
          
        };


        
      }

      function addList(d, data){

        
        var transaction = db.transaction(["firstOS"], "readwrite");
        var objectStore = transaction.objectStore("firstOS");
        var request = objectStore.get(data);

        

        request.onerror = function(event) {
          // Handle errors!
        };
        request.onsuccess = function(event) {
          // Do something with the request.result!
          
          // console.log("Name for is " + request.result.id);
          students.push(request.result)
          populate(request.result)
          document.getElementById(d).innerHTML=`<h4 class="bg-warning">ID number - ${data} - has been Accepted</h4>`;
          objectStore.delete(data)
        };

       
        console.log('add list initiated')
        
        // console.log(data)
        console.log(students)

        // var transaction2 = db.transaction(["accepted"]);
        // var acceptance = transaction2.objectStore("accepted");
        // var init = acceptance.add(request.result);

        // init.onerror=function(event){};
        // init.onsuccess=function(event){
        //   console.log("succesfully added");
        // }

      }

      function decline(d, data){
        var transaction = db.transaction(["firstOS"], "readwrite");
        var objectStore = transaction.objectStore("firstOS");
        var request = objectStore.get(data);
        request.onerror = function(event) {
          // Handle errors!
        };
        request.onsuccess = function(event) {
          // Do something with the request.result!
        console.log(d)
        document.getElementById(d).innerHTML=`<h4 class="bg-danger">ID number - ${data} - has been Declined</h4>`;
        objectStore.delete(data)
        }
      }
    
      function populate(data){
      var transation2 = db.transaction(["accepted"], "readwrite");
        var accept = transation2.objectStore("accepted");
        var request2 = accept.add(data);

        request2.onerror = function(e){

        }
        request2.onsuccess = function(e){
          console.log("added")
        }
      }