const taskList = document.querySelector('.collection')
const form = document.querySelector('#studName')
var openRequest = indexedDB.open("list", 1);

        openRequest.onupgradeneeded = function (e) {
            console.log("running onupgradeneeded");
            var thisDB = e.target.result;
            thisDB.createObjectStore("accepted", { autoIncrement:true });
        }

            openRequest.onsuccess = function (e) {
              console.log("Success!");
            
              db = e.target.result;
              console.log(e.target)
              displayData();
              
          }
          openRequest.onerror = function (e) {
              console.log("Error");
              console.dir(e);
          }


          function displayData(e){

            // e.preventDefault();
            const li = document.createElement('li');
            // Adding a class
            li.className = 'collection-item';
            // Create text node and append it 
            li.appendChild(document.createTextNode(form.value));
            // Create new element for the link 
            const link = document.createElement('a');
            // Add class and the x marker for a 
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append link to li
            li.appendChild(link);
            // Append to UL 
            taskList.appendChild(li);

          }
          