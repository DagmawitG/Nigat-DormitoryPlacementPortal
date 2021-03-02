const example = document.querySelector("#example");
var student_list = [] ;
// list of students
var students = [
  {
    firstName: "Nardos",
    lastName:"Tibebu",
    id: 3456,
    gender: "F",
    year: 3,
    department: "mechanical",
    campus: "FBE",
    room_number: 2,
  },
  {
    firstName: "Alemu",
    lastName:"Angaw",
    id: 3686,
    gender: "M",
    year: 2,
    department: "biomedical",
    campus: "6 Kilo",
    room_number: 11,
  },
  {
    firstName: "Saron",
    lastName:"Yibabe",
    id: 1016,
    gender: "F",
    year: 2,
    department: "chemical",
    campus: "FBE",
    room_number: 2,
  },
  {
    firstName: "Abebe",
    lastName:"Hailu",
    id: 4556,
    gender: "M",
    year: 1,
    department: "civil",
    campus: "6 Kilo",
    room_number: 1,
  },
  {
    firstName: "Lili",
    lastName:"Kebede",
    id: 3009,
    gender: "F",
    year: 5,
    department: "software",
    campus: "5 Kilo",
    room_number: 1,
  },
]



if(!window.indexedDB){
    console.log("Your browser doesn't support a stable version of IndexedDB.");
}

var db;
var request = indexedDB.open("Dorm Placement" , 1);
request.onerror = function(event){
    var db = event.target.result;
}

request.onupgradeneeded = function(event){
  var db = event.target.result;
  var objectStore = db.createObjectStore("Dorm_Data" , {keyPath : "id"});
  objectStore.createIndex("firstName" , "firstName" , {unique : false});
  objectStore.createIndex("lastName" , "lastName" , {unique : false});
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
request.onsuccess = function(event){
    console.log("hello");
    addToList(event)

}
   

function addToList(event){
  var header = ["First Name" , "Last Name" , "ID" , "Gender","Year","Department","Campus","Room Number"];
  var db = event.target.result;
  var transaction = db.transaction(['Dorm_Data']);
  var objectStore = transaction.objectStore("Dorm_Data");
  
  objectStore.openCursor().onsuccess= (event) => {
    var cursor = event.target.result;
    if (cursor){
        example.innerHTML += `
        <tbody class = "table">
        <tr>
        <td>${cursor.value.firstName}</td>
        <td>${cursor.value.lastName}</td>
        <td>${cursor.value.id}</td>
        <td>${cursor.value.gender}</td>
        <td>${cursor.value.year}</td>
        <td>${cursor.value.department}</td>
        <td>${cursor.value.campus}</td>
        <td>${cursor.value.room_number}</td>
        </tr>
        </tbody>
        `
      cursor.continue();
    }else{
      console.log("Welcome");

    }
  }
}

// This was for the filter but is not working
// $(document).ready(function() {
//     // Setup - add a text input to each footer cell
//     $('#example thead tr').clone(true).appendTo( '#example thead' );
//     $('#example thead tr:eq(1) th').each( function (i) {
//         var title = $(this).text();
//         $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
 
//         $( 'input', this ).on( 'keyup change', function () {
//             if ( table.column(i).search() !== this.value ) {
//                 table
//                     .column(i)
//                     .search( this.value )
//                     .draw();
//             }
//         } );
//     } );
 
//     var table = $('#example').DataTable( {
//         orderCellsTop: true,
//         fixedHeader: true
//     } );
// } );
