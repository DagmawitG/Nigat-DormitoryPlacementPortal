const myTable = document.querySelector(".table");
const example = document.getElementById("#test");

//created a dummy list to enter into indexedDB 
var student_list = [] ;
// list of students
var students = [
  {
    name: "Nardos",
    id: 3456,
    gender: "F",
    year: 3,
    department: "mechanical",
    campus: "FBE",
    room_number: 2,
  },
  {
    name: "Alemu",
    id: 3686,
    gender: "M",
    year: 2,
    department: "biomedical",
    campus: "6 Kilo",
    room_number: 11,
  },
  {
    name: "Saron",
    id: 1016,
    gender: "F",
    year: 2,
    department: "chemical",
    campus: "FBE",
    room_number: 2,
  },
  {
    name: "Abebe",
    id: 4556,
    gender: "M",
    year: 1,
    department: "civil",
    campus: "6 Kilo",
    room_number: 1,
  },
  {
    name: "Lili",
    id: 3009,
    gender: "F",
    year: 5,
    department: "software",
    campus: "5 Kilo",
    room_number: 1,
  },
]

//error handling 
if(!window.indexedDB){
    console.log("Your browser doesn't support a stable version of IndexedDB.");
}

var db;
var request = indexedDB.open("Dorm Placement" , 1);
request.onerror = function(event){
    var db = event.target.result;
  }
request.onupgradeneeded = function(event){
  // db = event.target.result;
  var db = event.target.result;
  var objectStore = db.createObjectStore("Dorm_Data" , {keyPath : "id"});
  objectStore.createIndex("name" , "name" , {unique : false});
  objectStore.createIndex("gender" , "gender" , {unique : false});
  objectStore.createIndex("year" , "year" , {unique : false});
  objectStore.createIndex("department" , "department" , {unique : false});
  objectStore.createIndex("campus" , "campus" , {unique : false});
  objectStore.createIndex("room_number" , "room_number" ,{unique : false})
  var transaction = objectStore.transaction.oncomplete = function(event){
    var DormObjectStore = db.transaction("Dorm_Data" , "readwrite").objectStore("Dorm_Data");
    students.forEach(student => {
      DormObjectStore.add(student);
    });   
  }
  transaction.onerror = function(event){
    console.log("transaction failed");
  };
  console.log("Upgrade Successful");
    
};