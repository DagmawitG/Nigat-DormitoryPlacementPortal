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
            document.querySelector("#addButton").addEventListener("click", addPerson);
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
        console.log(person)


        //Perform the add
        // (data, key)a
        if (person.name=="" || person.id=="" || person.gen=="" || person.desc==""){
            return
        }
        else{
        var request = store.add(person);
        }

        request.onerror = function (e) {
            console.warn("Error", e.target.error.name);
            //some type of error handler
        }

        request.onsuccess = function (e) {
            console.log("Woot! Did it");
        }
    }

    
    // function displayData() {
    //     var transaction = db.transaction(['firstOS'], "readonly");
    //     var objectStore = transaction.objectStore('firstOS');
        
    