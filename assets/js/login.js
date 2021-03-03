var input_fields = document.querySelectorAll(".input");
var login_btn = document.querySelector("#login_btn");
var input_text = document.querySelector("#login");
var input_password = document.querySelector("#password");
let submit = document.getElementById("login_btn");
submit.addEventListener("click", adminValidation)
submit.addEventListener("click", userValidation)
// submit.addEventListener("click", resetFun)
const loginAdminData = [
    { username: "dagmawit", password: "123456789" },
    { username: "luhana", password: "56341234" },
    { username: "nahom", password: "34679999" }


];
const loginUserData = [
    { userID: "atr/3566/11", password: "3333" },
    { userID: "atr/5677/11", password: "5634" },
    { userID: "atr/9087/11", password: "6789" },
    { userID: "atr/7876/11", password: "3786" },
    { userID: "atr/9089/11", password: "5111" },
    { userID: "atr/6432/11", password: "6090" }


];

var db;
var request = window.indexedDB.open("LOGIN", 1);
request.onerror = function (event) {
    console.log("error: ");
};
request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var adminStore = db.createObjectStore("Admin", { keyPath: "username" });
    var userStore = db.createObjectStore("User", { keyPath: "userID" });


    for (var i in loginAdminData) {
        adminStore.add(loginAdminData[i]);
    }
    for (var i in loginUserData) {
        userStore.add(loginUserData[i]);
    }
}


function userValidation(e) {
    e.preventDefault()
    var userStore = db.transaction("User").objectStore("User");
    let request = userStore.openCursor()
    request.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {
            if (input_text.value.toUpperCase().startsWith("ATR/") || input_text.value.toUpperCase().startsWith("ETR/")) {
                
                    if (cursor.key.toUpperCase() == input_text.value.toUpperCase() && cursor.value.password == input_password.value) {

                        location.href = '../news.html'
                        document.getElementById("reset").reset()


                    }
                   
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
                   
                }

            
        
       
       



    };



function adminValidation(e) {
    e.preventDefault()
    var adminStore = db.transaction("Admin").objectStore("Admin");
    let request = adminStore.openCursor()
    request.onsuccess = function (event) {
        let cursor = event.target.result;

        if (cursor) {

            if (cursor.key.toUpperCase() == input_text.value.toUpperCase() && cursor.value.password == input_password.value) {
                location.href = '../index_admin.html'
                document.getElementById("reset").reset()


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

    }

};




