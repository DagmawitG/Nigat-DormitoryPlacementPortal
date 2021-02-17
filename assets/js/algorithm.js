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