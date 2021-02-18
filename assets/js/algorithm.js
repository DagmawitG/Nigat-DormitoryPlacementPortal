let students = [
    {
      name: "Nardos",
      id: 3456,
      sex: "F",
      Year: 3,
      department: "mechanical",
    },
    {
      name: "Yonathan",
      id: 3686,
      sex: "M",
      Year: 2,
      department: "biomedical",
    },
    {
      name: "Saron",
      id: 1016,
      sex: "F",
      Year: 2,
      department: "chemical",
    },
    {
      name: "Abebe",
      id: 4556,
      sex: "M",
      Year: 1,
      department: "civil",
    },
    {
      name: "Lili",
      id: 3009,
      sex: "F",
      Year: 5,
      department: "software",
    },
    {
      name: "Chala",
      id: 1056,
      sex: "M",
      Year: 4,
      department: "electrical",
    },
    {
      name: "Liya",
      id: 8976,
      sex: "F",
      Year: 4,
      department: "civil",
    },
    {
      name: "Kebede",
      id: 4545,
      sex: "M",
      Year: 5,
      department: "software",
    },
    {
      name: "Ethiopia",
      id: 7878,
      sex: "M",
      Year: 4,
      department: "software",
    },
    {
      name: "Zara",
      id: 1010,
      sex: "F",
      Year: 4,
      department: "biomedical",
    },
  ];

let fkilo = 4; //Number of available dorm spaces in 5-kilo
let skilo = 30; // Number of available dorm spaces in 6-kilo
let fbe = 10; //Number of available dorm spaces in fbe
let fkilopd = 2; //Number of students assigned per dorm at 5-kilo
let skilopd = 2; //Number of students assigned per dorm at 6-kilo
let fbepd = 2; //Number of students assigned per dorm at fbe

function compareNandD(a, b) {
    if (a.Year === b.Year) {
      return b.department - a.department;
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