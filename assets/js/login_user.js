var input_fields = document.querySelectorAll(".input");
var loginuser_btn = document.querySelector("#loginuser_btn");
var input_text = document.querySelector("#loginuser");
var input_password = document.querySelector("#passworduser");

let submit = document.getElementById("loginuser_btn");
submit.addEventListener("click", validation)
const loginData = [
    { userID: "atr/3566/11", password: "3333" },
    { userID: "atr/5677/11", password: "5634" },
    { userID: "atr/9087/11", password: "6789" },
    { userID: "atr/7876/11", password: "3786" },
    { userID: "atr/9089/11", password: "5111" },
    { userID: "atr/6432/11", password: "6090" }

];
var db;
var request = window.indexedDB.open("LOGIN_USER", 1);
request.onerror = function (event) {
    console.log("error: ");
};
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("User", { keyPath: "userID" });

    for (var i in loginData) {
        objectStore.add(loginData[i]);
    }
}


function validation(e) {
    e.preventDefault()
    var objectStore = db.transaction("User").objectStore("User");
    let request = objectStore.openCursor()
    request.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            if (cursor.key.toUpperCase() == input_text.value.toUpperCase() && cursor.value.password == input_password.value) {
                redirect(input_text.value)
            }
            else {
                cursor.continue();
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
   
    location.href = "../news.html"
}