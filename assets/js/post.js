// // import fiveKiloStudents from './algorithm.js'

const post = document.querySelector('#post')
let st = loadfromDB();

let fkilo = 4; //Number of available dorm spaces in 5-kilo
let skilo = 20; // Number of available dorm spaces in 6-kilo
let fbe = 10; //Number of available dorm spaces in fbe
let fkilopd = 2; //Number of students assigned per dorm at 5-kilo
let skilopd = 2; //Number of students assigned per dorm at 6-kilo
let fbepd = 2; //Number of students assigned per dorm at fbe



st.sort(compareNames); //sort the student list alphabetically

// Filter out students who are 5th year to be assigned to 5-kilo
var fkilo_students = [];
var rStudents = []; //remaining students who haven't been assigned yet
for (var i = 0; i < st.length; i++) {
  if (st[i].Year == 5 && fkilo_students.length < fkilo) {
    fkilo_students.push(st[i]);
  } else {
    rStudents.push(st[i]);
  }
}

st = cloneArray(rStudents, st);
st.sort(compareNames);
rStudents = []

// Check if there are spaces left in 5-kilo after 5th years have been assigned
if (fkilo - fkilo_students.length > 0) {
    let spacesLeft = fkilo - fkilo_students.length;
    for (var i = 0; i < st.length; i++) {
      if (spacesLeft > 0) {
        if (st[i].Year == 4) {
          fkilo_students.push(st[i]);
          spacesLeft--;
        } else {
          rStudents.push(st[i]);
        }
      } else {
        rStudents.push(st[i]);
      }
    }
  }

  let mStudents = [];
let fStudents = [];
st = cloneArray(rStudents, st);

//list out female and male students who aren't assigned yet
for (var i = 0; i < st.length; i++) {
  if (st[i].gen == "M") {
    mStudents.push(st[i]); //male students assigned to 6-kilo
  } else {
    fStudents.push(st[i]); //female students assigned to FBE
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

// console.log(fiveKiloStudents);
// console.log(fbeStudents);
// console.log(sixKiloStudents);

console.log(st);

display(fiveKiloStudents, "5-kilo campus");
display(fbeStudents, "FBE campus");
display(sixKiloStudents, "6-kilo campus");

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
       
          array[i][j].dno = (parseInt(i) + 1) 
      
        post.innerHTML+=`<div class="card" style="padding:8px;">
        <p class="strong">${array[i][j].name.toUpperCase()}</p>` + ` has been assigned to dorm number ` + `${(parseInt(i) + 1)}` + ` at ` + `${campusName}</div><br>`
      }
    }
  };
// // dis()
// function dis(){
//     var j = 0;
//       lst.innerHTML=`five Kilo Students<br>`
//       console.log('here')
//       for (let k = 1; k<=fiveKiloStudents.length; k++){
//           lst.innerHTML+=`Dorm No: ${k} <br>`
//           for (let i =0; i < fks[j].length; i++){
//               lst.innerHTML+=`${fks[j][i].name}<br>`
//           }
//           j++
//       }
      
//       var j = 0;
//       lst.innerHTML=`<br><br>FBE Students<br>`
//       for (let k = 1; k<=fbeStudents.length; k++){
//           lst.innerHTML+=`Dorm No: ${k} <br>`
//           for (let i =0; i < fbs[j].length; i++){
//               lst.innerHTML+=`${fbs[j][i].name}<br>`
//           }
//           j++
//       }
      
//       var j = 0;
//       lst.innerHTML+=`<br><br>Six Kilo Students<br>`
//       for (let k = 1; k<=sixKiloStudents.length; k++){
//           lst.innerHTML+=`Dorm No: ${k} <br>`
//           for (let i =0; i < sks[j].length; i++){
//               lst.innerHTML+=`${sks[j][i].name}<br>`
//               // sks[j][i].put
//           }
//           j++
//       }
//   }