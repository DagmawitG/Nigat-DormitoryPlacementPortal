var input_fields = document.querySelectorAll(".input");
var login_btn = document.querySelector("#login_btn");
var input_text = document.querySelector("#login");
var input_password = document.querySelector("#password");
let submit = document.getElementById("login_btn");
submit.addEventListener("click", validation)
const loginData = [
    { username: "dagmawit", password: "123456789" },
    { username: "luhana", password: "56341234" },
    { username: "nahom", password: "34679999" }
    

];
var db;
var request = window.indexedDB.open("LOGIN_ADMIN", 1);
request.onerror = function (event) {
    console.log("error: ");
};
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("Admin", { keyPath: "username" });

    for (var i in loginData) {
        objectStore.add(loginData[i]);
    }
}


function validation(e) {
    e.preventDefault()
    var objectStore = db.transaction("Admin").objectStore("Admin");
    let request = objectStore.openCursor()
    request.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            if (input_password.value.length >= 8){
            if (cursor.key.toUpperCase() == input_text.value.toUpperCase() && cursor.value.password == input_password.value) {
                redirect(input_text.value)
            }
            else {
                cursor.continue();
            }
        }
        else{
            let output = ""
            output +=
            `<p>Password must be greater or equal to 8 characters</p
            ` 
            document.getElementById("char").innerHTML = output           
        }

        }
        else {
           
            let output = ""
            output +=
            `<p>Incorrect Username/Password.<br>Please try again.</p
            ` 
            document.getElementById("incorrect").innerHTML = output           
        }
    };
}
function redirect(user) {
    
    location.href = "../index_admin.html"
}
