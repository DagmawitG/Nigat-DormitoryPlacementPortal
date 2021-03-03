const lst = document.getElementById('lst')
const assignButton = document.querySelector('#assignButton')


let students = [];

var openRequest = indexedDB.open("test", 3);

openRequest.onupgradeneeded = function (e) {
    console.log("running onupgradeneeded");
    var thisDB = e.target.result;

   
    if (!thisDB.objectStoreNames.contains("accepted")) {
        thisDB.createObjectStore("accepted", { autoIncrement:true });
    }
    // thisDB.createObjectStore("try", {autoIncrement: true});
}


openRequest.onsuccess = function (e) {
    console.log("Success!");
    
    db = e.target.result;
    console.log(e.target)
    // console.log(finalAssign(students))

    
    
     students=loadfromDB()
    
    console.log(students)
    
  
assignButton.addEventListener('click', Execute);
  
  
    
      
    
    
    function Execute(){
      

    let fkilo = 4; //Number of available dorm spaces in 5-kilo
    let skilo = 20; // Number of available dorm spaces in 6-kilo
    let fbe = 10; //Number of available dorm spaces in fbe
    let fkilopd = 2; //Number of students assigned per dorm at 5-kilo
    let skilopd = 2; //Number of students assigned per dorm at 6-kilo
    let fbepd = 2; //Number of students assigned per dorm at fbe



    students.sort(compareNames); //sort the student list alphabetically

    // Filter out students who are 5th year to be assigned to 5-kilo
    var fkilo_students = [];
    var rStudents = []; //remaining students who haven't been assigned yet
    for (var i = 0; i < students.length; i++) {
      if (students[i].Year == 5 && fkilo_students.length < fkilo) {
        fkilo_students.push(students[i]);
      } else {
        rStudents.push(students[i]);
      }
    }
    
    students = cloneArray(rStudents, students);
    students.sort(compareNames);
    rStudents = []
    
    // Check if there are spaces left in 5-kilo after 5th years have been assigned
    if (fkilo - fkilo_students.length > 0) {
        let spacesLeft = fkilo - fkilo_students.length;
        for (var i = 0; i < students.length; i++) {
          if (spacesLeft > 0) {
            if (students[i].Year == 4) {
              fkilo_students.push(students[i]);
              spacesLeft--;
            } else {
              rStudents.push(students[i]);
            }
          } else {
            rStudents.push(students[i]);
          }
        }
      }
    
      let mStudents = [];
    let fStudents = [];
    students = cloneArray(rStudents, students);
    
    //list out female and male students who aren't assigned yet
    for (var i = 0; i < students.length; i++) {
      if (students[i].gen == "M") {
        mStudents.push(students[i]); //male students assigned to 6-kilo
      } else {
        fStudents.push(students[i]); //female students assigned to FBE
      }
    }
    
    mStudents.sort(compareNandD); // to be assigned at 6-kilo
    fStudents.sort(compareNandD); // to be assigned at fbe
    // console.log(mStudents);
    // console.log(fStudents);
    // console.log(fkilo_students); // 5th year students assigned to 5-kilo dormitory
    
    //assign each students to dorms in 5-kilo
    fiveKiloStudents = assign(fkilo_students, fkilopd);
    fbeStudents = assign(fStudents, fbepd);
    sixKiloStudents = assign(mStudents, skilopd);
    
    console.log(fiveKiloStudents);
    console.log(fbeStudents);
    console.log(sixKiloStudents);
    
    console.log(students);
    display(fiveKiloStudents, "5-kilo campus");
    display(fbeStudents, "FBE campus");
    display(sixKiloStudents, "6-kilo campus");

    export let fiveKiloStudents 

    
      hide()
      // dis()

  }



    // algorithm(students)
    
    // document.querySelector("assignButton").addEventListener("click", finalAssign, false);
    // document.addEventListener('DOMContentLoaded',finalAssign());
    
}
openRequest.onerror = function (e) {
    console.log("Error");
    console.dir(e);
}

// function dis(){
//   var j = 0;
//     lst.innerHTML=`five Kilo Students<br>`
//     console.log('here')
//     for (let k = 1; k<=fks.length; k++){
//         lst.innerHTML+=`Dorm No: ${k} <br>`
//         for (let i =0; i < fks[j].length; i++){
//             lst.innerHTML+=`${fks[j][i].name}<br>`
//         }
//         j++
//     }
    
//     var j = 0;
//     lst.innerHTML=`<br><br>FBE Students<br>`
//     for (let k = 1; k<=fbs.length; k++){
//         lst.innerHTML+=`Dorm No: ${k} <br>`
//         for (let i =0; i < fbs[j].length; i++){
//             lst.innerHTML+=`${fbs[j][i].name}<br>`
//         }
//         j++
//     }
    
//     var j = 0;
//     lst.innerHTML+=`<br><br>Six Kilo Students<br>`
//     for (let k = 1; k<=sks.length; k++){
//         lst.innerHTML+=`Dorm No: ${k} <br>`
//         for (let i =0; i < sks[j].length; i++){
//             lst.innerHTML+=`${sks[j][i].name}<br>`
//             // sks[j][i].put
//         }
//         j++
//     }
// }

function finalAssign(e){


  
  var transaction = db.transaction(["accepted"], "readwrite");
  var stud = transaction.objectStore("accepted");
  var request = stud.getAll();
  

  request.onerror = function(event) {
    // Handle errors!
    console.log('error fetching data');
  };
  request.onsuccess = function(event) {
    // Do something with the request.result!
    // console.log(request.result)
    

     students=request.result
 

    // console.log(typeof(request.result))
    // students.push(request.result)
    
    // console.log(students)
    // console.log(typeof(students))
    // console.log(students)
     return students
   
    }
  
  
}
function loadfromDB()
{
  let listofTasks;
  if(localStorage.getItem('coins') == null)
  {
      false
  }
  else
  {
      listofTasks = JSON.parse(localStorage.getItem('coins'));
      return listofTasks; 
  }
 
}





// let fkilo = 4; //Number of available dorm spaces in 5-kilo
// let skilo = 20; // Number of available dorm spaces in 6-kilo
// let fbe = 10; //Number of available dorm spaces in fbe
// let fkilopd = 2; //Number of students assigned per dorm at 5-kilo
// let skilopd = 2; //Number of students assigned per dorm at 6-kilo
// let fbepd = 2; //Number of students assigned per dorm at fbe

function compareNandD(a, b) {
    if (a.Year === b.Year) {
      return b.dep - a.dep;
    }
    return a.Year > b.Year ? 1 : -1;
  }

  function compareNames(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  
  //function to sort students  based on their department
  function compareDepartment(a, b) {
    if (a.dep < b.dep) {
      return -1;
    }
    if (a.dep > b.dep) {
      return 1;
    }
    return 0;
  }

  //function to clone an Array
function cloneArray(oArray, cArray) {
    cArray = [];
    cArray = oArray.map((a) => Object.assign({}, a));
    return cArray;
  }

// students.sort(compareNames); //sort the student list alphabetically

// // Filter out students who are 5th year to be assigned to 5-kilo
// var fkilo_students = [];
// var rStudents = []; //remaining students who haven't been assigned yet
// for (var i = 0; i < students.length; i++) {
//   if (students[i].Year == 5 && fkilo_students.length < fkilo) {
//     fkilo_students.push(students[i]);
//   } else {
//     rStudents.push(students[i]);
//   }
// }

// students = cloneArray(rStudents, students);
// students.sort(compareNames);
// rStudents = []

// // Check if there are spaces left in 5-kilo after 5th years have been assigned
// if (fkilo - fkilo_students.length > 0) {
//     let spacesLeft = fkilo - fkilo_students.length;
//     for (var i = 0; i < students.length; i++) {
//       if (spacesLeft > 0) {
//         if (students[i].Year == 4) {
//           fkilo_students.push(students[i]);
//           spacesLeft--;
//         } else {
//           rStudents.push(students[i]);
//         }
//       } else {
//         rStudents.push(students[i]);
//       }
//     }
//   }

//   let mStudents = [];
// let fStudents = [];
// students = cloneArray(rStudents, students);

// //list out female and male students who aren't assigned yet
// for (var i = 0; i < students.length; i++) {
//   if (students[i].gen == "M") {
//     mStudents.push(students[i]); //male students assigned to 6-kilo
//   } else {
//     fStudents.push(students[i]); //female students assigned to FBE
//   }
// }

// mStudents.sort(compareNandD); // to be assigned at 6-kilo
// fStudents.sort(compareNandD); // to be assigned at fbe
// console.log(mStudents);
// console.log(fStudents);
// console.log(fkilo_students); // 5th year students assigned to 5-kilo dormitory

// //assign each students to dorms in 5-kilo
// fiveKiloStudents = assign(fkilo_students, fkilopd);
// fbeStudents = assign(fStudents, fbepd);
// sixKiloStudents = assign(mStudents, skilopd);

// console.log(fiveKiloStudents);
// console.log(fbeStudents);
// console.log(sixKiloStudents);

//function to assign each student to their dorms
function assign(list, pd) {
    let newArray = [];
    while (list.length) newArray.push(list.splice(0, pd));
    return newArray;
  }

  // console.log(students);

  //function to display assigned rooms for each student
function display(array, campusName) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        console.log(
          array[i][j].name +
            " has been assigned to dorm number " +
            (parseInt(i) + 1) +
            " at " +
            campusName
        );
      }
    }
  }

  function hide(){
    assignButton.style.display = 'none';
    refreshButton.style.display = 'none';
}
  
  // display(fiveKiloStudents, "5-kilo campus");
  // display(fbeStudents, "FBE campus");
  // display(sixKiloStudents, "6-kilo campus");



  // const accept_btn=document.querySelector('#accept');
  
  // accept_btn.addEventListener('click', assign) 