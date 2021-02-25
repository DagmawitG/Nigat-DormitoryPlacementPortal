

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
        // if (!thisDB.objectStoreNames.contains("firstOS")) {
        //     // 저장소를 만들어줌
        //     thisDB.createObjectStore("secondOS", { autoIncrement:true });
        // }

        if (!thisDB.objectStoreNames.contains("secondOS")) {
            thisDB.createObjectStore("firstOS", { autoIncrement:true });
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

// function addPerson(e) {
//     var name = document.querySelector("#studName").value;
//     var id = document.querySelector("#studID").value;
//     var desc = document.querySelector("#studDesc").value;
//     // var year = document.querySelector("#studYear").value;
//     // var dep = document.querySelector("#studDep").value;
//     // var dno = '';
//     // var camp = '';
//     console.log("About to add " + name + "/" + id);

//     //people 테이블에 데이터 add 선언..
//     var transaction = db.transaction(["firstOS"], "readwrite");
//     var store = transaction.objectStore("firstOS");

//     //Define a person
//     var person = {
//         name: name,
//         id: id,
//         desc: desc,
//         // year: year,
//         // dep: dep,
//         // dno: dno,
//         // camp: camp,
//         created: new Date()
//     }

//     //Perform the add
//     // (data, key)a
//     var request = store.add(person);

//     request.onerror = function (e) {
//         console.warn("Error", e.target.error.name);
//         //some type of error handler
//     }

//     request.onsuccess = function (e) {
//         console.log("Woot! Did it");
//     }
// }

function displayData() {
    
    var transaction = db.transaction(['firstOS'], "readonly");
    var objectStore = transaction.objectStore('firstOS');
    
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
      if(cursor) {
          
        // var listItem = document.createElement('li');
        // listItem.innerHTML = cursor.value.name + ', ' + cursor.value.email;
        // list.appendChild(listItem);
        document.getElementById("cont").innerHTML+=`
        <div class=" u-align-center-xs u-align-left-lg u-align-left-md u-align-left-sm u-align-left-xl u-container-style u-list-item u-repeater-item">
  
        <div class="card mb-4 u-container-layout u-similar-container u-container-layout-1">
          <div alt="" class="" ></div><h3 class="u-custom-font u-font-oswald ">${cursor.value.name}</h3>
          <p class="u-text u-text-palette-2-base u-texts">${cursor.value.id}</p>
          <p class="">${cursor.value.desc}</p>
          <div id='v'></div>
          <a href="#" class="u-btn          u-btn-5" id="acceptButton">Accept</a>
          <a href="#" class="u-btn          u-btn-6" id="declineButton">Decline</a>
        </div>
      </div>`;
        // document.getElementById("name1").innerHTML=cursor.value.name;
        // document.getElementById("id1").innerHTML=cursor.value.id;
        // document.getElementById("desc1").innerHTML=cursor.value.desc;
        
        // console.log(students)
        cursor.continue();
      } else {
        console.log('Entries all displayed.');
      }
      
      
    };
    let students = []
    document.getElementById('acceptButton').addEventListener("click", addList(document.getElementById('v').value, students))
    function addList(data, students){
      console.log('add list initiated')
      students.push(data)
      console.log(students)
    }
  }

  
  
