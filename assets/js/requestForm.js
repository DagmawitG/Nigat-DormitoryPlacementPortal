var indexedDB = window.indexedDB ||
                        window.webkitIndexedDB ||
                        window.mozIndexedDB;

        function DB(name) {
            this.init = function(version, upgrade, done) {
                console.log('init');
                var openReq = indexedDB.open(name, version);
                openReq.onsuccess = function(e) {
                    var db = e.target.result;
                    // Chrome 23 still has setVersion so don't upgrade
                    // unless the version is still old.
                    if ('setVersion' in db && db.version < version) {
                        var setVerReq = db.setVersion(version);
                        setVerReq.onsuccess = function(e) {
                            console.log('upgrading');
                            upgrade(e.target.result.db);
                            
                            done();

                        };
                    } else {
                        done();
                    }
                    
                };
                openReq.onupgradeneeded = function(e) {
                    // Never gets raised before Chrome 23.
                    console.log('upgrading');
                    upgrade(e.target.result);
                };
                openReq.onerror = function(e) {
                    console.log('init error');
                };
                openReq.onblocked = function(e) {
                    console.log('init blocked');
                };
            };

            this.read = function(stores, fn, done) {
                return this.transaction('readonly', stores, fn, done);
            };

            this.readWrite = function(stores, fn, done) {
                return this.transaction('readwrite', stores, fn, done);
            };

            this.transaction = function(mode, stores, fn, done) {
                var openReq = indexedDB.open(name);
                openReq.onsuccess = function(e) {
                    var db = e.target.result;
                    var tx = db.transaction(stores, mode);
                    tx.oncomplete = function(e) {
                        if (done) {
                            done();
                        }
                    };
                    tx.onabort = function(e) {
                        console.log('tx abort');
                    };
                    tx.onerror = function(e) {
                        console.log('tx error');
                    };
                    fn(tx);
                };
                openReq.onerror = function(e) {
                    console.log('open tx error');
                };
            };
        }

        DB.deleteDatabase = function(name, done) {
            var delReq = indexedDB.deleteDatabase(name);
            delReq.onsuccess = function(e) {
                // Not triggered before Chrome 23.
                done();
            };
            delReq.onerror = function(e) {
                console.log('delete error');
            };
            delReq.onblocked = function(e) {
                console.log('delete blocked');
            };
        };

var databaseName = 'ContactsDB';
        var contactsStoreName = 'contacts';

        var contactsDB = new DB(databaseName);

        // var contacts = document.getElementById('contacts');

        contactsDB.init(1, function(db) {
            db.createObjectStore(contactsStoreName, {
                autoIncrement: true
            });
        }, function() {
            console.log('ready');

            loadContactsTable();
        });

        function loadContactsTable() {
            contactsDB.read([ contactsStoreName ], function(tx) {
                var cursor = tx.objectStore(contactsStoreName).openCursor();
                cursor.onsuccess = function(e) {
                    if (e.target.result) {
                        // addContactToTable(e.target.result.value);
                        e.target.result.continue();
                    }
                };
                cursor.onerror = function(e) {
                    console.log('cursor error');
                };
            });
        }

        // function addContactToTable(contact) {

        //     var newRow = contacts.insertRow(-1);
        //     var nameCell = newRow.insertCell(-1);
        //     nameCell.textContent = contact.name;
        //     var idCell = newRow.insertCell(-1);
        //     idCell.textContent = contact.id;
        //     var descCell = newRow.insertCell(-1);
        //     descCell.textContent = contact.desc;
        // }

        var studName = document.getElementById('studName');
        var studDep = document.getElementById('studDep');
        var studYear = document.getElementById('studYear');
        var studID = document.getElementById('studID');
        var studDesc = document.getElementById('studDesc');
        

        document.getElementById('addButton').onclick = function(e) {
            e.preventDefault();

            var name = studName.value;
            var id = studID.value;
            var desc = studDesc.value;
            var year = studYear.value;
            var dep = studDep.value;
            var dno = '';
            var camp = '';

            console.log('adding');

            contactsDB.readWrite([ contactsStoreName ], function(tx) {
                var contact = {
                    name: name,
                    id: id,
                    desc: desc,
                    year: year,
                    dep: dep,
                    dno: dno,
                    camp: camp
                };

                tx.objectStore(contactsStoreName).put(contact);

                // addContactToTable(contact);
            }, function() {
                console.log('added');
                let index = objectStore.index("date");
                
                index.openCursor(contactsDB, contactsStoreName).onsuccess = function (e) {
                    // assign the current cursor
                    let cursor = e.target.result;
                    while(cursor){
                        console.log(cursor.value)
                        let cardContent = document.querySelector('#name1');
                        cardContent.innerHTML = (cursor.value.name);
                        cursor.continue()
                    }
                    
                };
           

                studName.value = '';
                studID.value = '';
                studDesc.value = '';

                studName.focus();
            });
           
            
        };
        // document.getElementById("name1").innerHTML = studName.value;
        // document.getElementById('populateButton').onclick = function(e) {
        //     e.preventDefault();

        //     // createFakeContacts();
        // };

        contactsDB.readWrite([ contactsStoreName ], function(tx) {
            var contact = {
                name: name,
                id: id,
                desc: desc
            };

            tx.objectStore(contactsStoreName).put(contact);

            // addContactToTable(contact);    

        });
        
            /* function displayTaskList() {
                // clear the previous task list
                
        
                // create the object store
                let objectStore = DB.transaction('tasks').objectStore('tasks');
        
        
         */
               
                /*     if (cursor) {
                        
                        // Create an li element when the user adds a task 
                        const li = document.createElement('li');
                        //add Attribute for delete 
                        li.setAttribute('data-task-id', cursor.value.id);
                        // Adding a class
                        li.className = 'collection-item';
                        // Create text node and append it 
                        li.appendChild(document.createTextNode(cursor.value.taskname));
                        li.value = cursor.value.date;
                        // Create new element for the link 
                        const link = document.createElement('a');
                        // Add class and the x marker for a 
                        link.className = 'delete-item secondary-content';
                        link.innerHTML = `
                        <i class="fa fa-remove"></i>
                        &nbsp;
                        <a href="edit.html?id=${cursor.value.id}"><i class="fa fa-edit"></i> </a>
                        `;
                        // Append link to li
                        li.appendChild(link);
                        // Append to UL 
                        taskList.appendChild(li);
                        cursor.continue();
                    }
                }
            } */
        // let cardContent = document.getElementById('name1');
        // cardContent.innerHTML =  contactss;
        // let departmentNode = cardContent.nextElementSibling;
        // departmentNode.textContent = "What I found from the DB";
        // let info = departmentNode.nextElementSibling;
        // info.textContent = "What I found from the DB";

        


        // function createFakeContacts() {
        //     console.log('generating fake contacts');

        //     contactsDB.readWrite([ contactsStoreName ], function(tx) {
        //         for (var i = 0, n = 10; i < n; i++) {
        //             var name = Faker.Name.firstName();
        //             var id = name.toLowerCase() +
        //                         Math.round(Math.random() * 1000) +
        //                         '@example.' +
        //                         Faker.Helpers.randomize(definitions.domain_suffix());

        //             var contact = {
        //                 name: name,
        //                 id: id,
        //                 desc:desc
        //             };

        //             tx.objectStore(contactsStoreName).put(contact);

        //             addContactToTable(contact);
        //         }
        //     }, function() {
        //         console.log('done generating fake contacts');
        //     });
        // }

        // document.getElementById('deleteButton').onclick = function(e) {
        //     e.preventDefault();

        //     console.log('deleting');

        //     DB.deleteDatabase(databaseName, function() {
        //         console.log('deleted');
        //     });
        // };
        
