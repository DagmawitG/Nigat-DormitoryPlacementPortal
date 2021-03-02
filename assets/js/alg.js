const lst = document.getElementById('lst')
// list of students
let students = [
  {
    name: "Nardos",
    id: 3456,
    sex: "F",
    Year: 3,
    department: "mechanical",
    dno: "",
    camp: "",
  },
  {
    name: "Alemu",
    id: 3686,
    sex: "M",
    Year: 2,
    department: "biomedical",
    dno: "",
    camp: "",
  },
  {
    name: "Saron",
    id: 1016,
    sex: "F",
    Year: 2,
    department: "chemical",
    dno: "",
    camp: "",
  },
  {
    name: "Abebe",
    id: 4556,
    sex: "M",
    Year: 1,
    department: "civil",
    dno: "",
    camp: "",
  },
  {
    name: "Lili",
    id: 3009,
    sex: "F",
    Year: 5,
    department: "software",
    dno: "",
    camp: "",
  },
  {
    name: "Chala",
    id: 1056,
    sex: "M",
    Year: 4,
    department: "electrical",
    dno: "",
    camp: "",
  },
  {
    name: "Liya",
    id: 8976,
    sex: "F",
    Year: 4,
    department: "civil",
    dno: "",
    camp: "",
  },
  {
    name: "Kebede",
    id: 4545,
    sex: "M",
    Year: 5,
    department: "software",
    dno: "",
    camp: "",
  },
  {
    name: "Ethiopia",
    id: 7878,
    sex: "M",
    Year: 4,
    department: "software",
    dno: "",
    camp: "",
  },
  {
    name: "Zara",
    id: 1010,
    sex: "F",
    Year: 4,
    department: "biomedical",
    dno: "",
    camp: "",
  },
];

let fkilo = 4; //Number of available dorm spaces in 5-kilo
let skilo = 30; // Number of available dorm spaces in 6-kilo
let fbe = 10; //Number of available dorm spaces in fbe
let fkilopd = 2; //Number of students assigned per dorm at 5-kilo
let skilopd = 2; //Number of students assigned per dorm at 6-kilo
let fbepd = 2; //Number of students assigned per dorm at fbe

// function to sort the list first based on year, then based on their department
function compareNandD(a, b) {
  if (a.Year === b.Year) {
    return b.department - a.department;
  }
  return a.Year > b.Year ? 1 : -1;
}

// //function to sort students  based on their name
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
  if (a.department < b.department) {
    return -1;
  }
  if (a.department > b.department) {
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

students.sort(compareNames); //sort the student list alphabetically

// Filter out students who are 5th year to be assigned to 5-kilo
var fkilo_students = [];
var rStudents = []; //remaining students who haven't been assigned yet
for (var i = 0; i < students.length; i++) {
  if (students[i].Year == 5 && fkilo_students.length < fkilo && students[i].sex == "M") {
    fkilo_students.push(students[i]);
  } else {
    rStudents.push(students[i]);
  }
}

students = cloneArray(rStudents, students);
students.sort(compareNames);
rStudents = [];

// Check if there are spaces left in 5-kilo after 5th years have been assigned
if (fkilo - fkilo_students.length > 0) {
  let spacesLeft = fkilo - fkilo_students.length;
  for (var i = 0; i < students.length; i++) {
    if (spacesLeft > 0) {
      if (students[i].Year == 4 && students[i].sex == "M") {
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
  if (students[i].sex == "M") {
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

var j = 0;
lst.innerHTML=`five Kilo Students<br>`
for (let k = 1; k<=fiveKiloStudents.length; k++){
    lst.innerHTML+=`Dorm No: ${k} <br>`
    for (let i =0; i < fiveKiloStudents[j].length; i++){
        lst.innerHTML+=`${fiveKiloStudents[j][i].name}<br>`
    }
    j++
}

var j = 0;
lst.innerHTML+=`<br><br>FBE Students<br>`
for (let k = 1; k<=fbeStudents.length; k++){
    lst.innerHTML+=`Dorm No: ${k} <br>`
    for (let i =0; i < fbeStudents[j].length; i++){
        lst.innerHTML+=`${fbeStudents[j][i].name}<br>`
    }
    j++
}

var j = 0;
lst.innerHTML+=`<br><br>Six Kilo Students<br>`
for (let k = 1; k<=sixKiloStudents.length; k++){
    lst.innerHTML+=`Dorm No: ${k} <br>`
    for (let i =0; i < sixKiloStudents[j].length; i++){
        lst.innerHTML+=`${sixKiloStudents[j][i].name}<br>`
        // sixKiloStudents[j][i].put
    }
    j++
}


// console.log(fiveKiloStudents.length)
console.log(fiveKiloStudents);

console.log(fbeStudents);
console.log(sixKiloStudents);

//function to assign each student to their dorms
function assign(list, pd) {
  let newArray = [];
  while (list.length) newArray.push(list.splice(0, pd));
  return newArray;
}

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

// display(fiveKiloStudents, "5-kilo campus");
// display(fbeStudents, "FBE campus");
// display(sixKiloStudents, "6-kilo campus");
