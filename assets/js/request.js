let idbSupported = false
    if ("indexedDB" in window) {
        idbSupported = true;
    }

    if (idbSupported) {
        
        var openRequest = indexedDB.open("test", 3);

        openRequest.onupgradeneeded = function (e) {
            console.log("running onupgradeneeded");
            var thisDB = e.target.result;

           
            // if (!thisDB.objectStoreNames.contains("firstOS")) {
          
            //     thisDB.createObjectStore("secondOS", { autoIncrement:true });
            // }

            if (!thisDB.objectStoreNames.contains("firstOS")) {
                thisDB.createObjectStore("firstOS", { autoIncrement:true });
            }
        }


        openRequest.onsuccess = function (e) {
            console.log("Success!");
           
            db = e.target.result;
            console.log(e.target)
        
            // displayData();
            document.querySelector("#addButton").addEventListener("click", addPerson, false);
        }
        openRequest.onerror = function (e) {
            console.log("Error");
            console.dir(e);
        }
    }

    function addPerson(e) {
        var name = document.querySelector("#studName").value;
        var id = document.querySelector("#studID").value;
        var desc = document.querySelector("#studDesc").value;
        var year = document.querySelector("#studYear").value;
        var dep = document.querySelector("#studDep").value;
        var gen = document.querySelector("#studGen").value;
        var dno = '';
        var camp = '';
        console.log("About to add " + name + "/" + id);

        var transaction = db.transaction(["firstOS"], "readwrite");
        var store = transaction.objectStore("firstOS");

        //Define a person
        var person = {
            name: name,
            id: id,
            desc: desc,
            year: year,
            gen: gen,
            dep: dep,
            dno: dno,
            camp: camp,
            created: new Date()
        }


        //Perform the add
        // (data, key)a
        var request = store.add(person);
        addToDatabase(person)

        request.onerror = function (e) {
            console.warn("Error", e.target.error.name);
            //some type of error handler
        }

        request.onsuccess = function (e) {
            console.log("Woot! Did it");
        }
    }

    function addToDatabase(newCoin)
{
 let listofCoin;
 if(localStorage.getItem('coins') == null)
 {
  listofCoin = [];
 }
 else
 {
  listofCoin = JSON.parse(localStorage.getItem('coins'));
 }
 listofCoin.push(newCoin);
  localStorage.setItem('coins', JSON.stringify(listofCoin));
 
}

    // function displayData() {
    //     var transaction = db.transaction(['firstOS'], "readonly");
    //     var objectStore = transaction.objectStore('firstOS');
        
    //     objectStore.openCursor().onsuccess = function(event) {
    //         var cursor = event.target.result;
    //       if(cursor) {
              
    //         // var listItem = document.createElement('li');
    //         // listItem.innerHTML = cursor.value.name + ', ' + cursor.value.email;
    //         // list.appendChild(listItem);
    //         document.getElementById("cont").innerHTML+=`
    //         <div alt="" class="" ></div><h3 id="name1" class="u-custom-font u-font-oswald ">${cursor.value.name}</h3>
    //           <p class="u-text u-text-palette-2-base u-texts" id="id1">${cursor.value.id}</p>
    //           <p class="" id="desc1">${cursor.value.desc}</p>`;
    //         // document.getElementById("name1").innerHTML=cursor.value.name;
    //         // document.getElementById("id1").innerHTML=cursor.value.id;
    //         // document.getElementById("desc1").innerHTML=cursor.value.desc;
      
    //         cursor.continue();
    //       } else {
    //         console.log('Entries all displayed.');
    //       }
    //     };
    //   }