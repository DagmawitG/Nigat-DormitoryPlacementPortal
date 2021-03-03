// import fiveKiloStudents from './algorithm.js'

// dis()
function dis(){
    var j = 0;
      lst.innerHTML=`five Kilo Students<br>`
      console.log('here')
      for (let k = 1; k<=fiveKiloStudents.length; k++){
          lst.innerHTML+=`Dorm No: ${k} <br>`
          for (let i =0; i < fks[j].length; i++){
              lst.innerHTML+=`${fks[j][i].name}<br>`
          }
          j++
      }
      
      var j = 0;
      lst.innerHTML=`<br><br>FBE Students<br>`
      for (let k = 1; k<=fbeStudents.length; k++){
          lst.innerHTML+=`Dorm No: ${k} <br>`
          for (let i =0; i < fbs[j].length; i++){
              lst.innerHTML+=`${fbs[j][i].name}<br>`
          }
          j++
      }
      
      var j = 0;
      lst.innerHTML+=`<br><br>Six Kilo Students<br>`
      for (let k = 1; k<=sixKiloStudents.length; k++){
          lst.innerHTML+=`Dorm No: ${k} <br>`
          for (let i =0; i < sks[j].length; i++){
              lst.innerHTML+=`${sks[j][i].name}<br>`
              // sks[j][i].put
          }
          j++
      }
  }