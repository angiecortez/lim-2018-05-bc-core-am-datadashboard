let table = document.getElementById('response-container')
let urlProgress = "http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/progress.json"
let urlUsers = "http://127.0.0.1:8887/data/cohorts/lim-2018-03-pre-core-pw/users.json";
let Cohorts1 = "http://127.0.0.1:8887/data/cohorts.json"
let btn = document.getElementById('btn');

// btn.addEventListener('click', ()=>{ })
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let myArr = JSON.parse(xmlhttp.responseText);
      myFunction(myArr);
  }
};
xmlhttp.open("GET", urlUsers, true);
xmlhttp.send();
function myFunction(arr) {
cuerpo.innerHTML = '';

for (let valor of arr){
cuerpo.innerHTML += `
<tr>
   <td>${valor.name}</td>
   <td>${valor.signupCohort}</td>
   <td>${valor.role}</td>
 </tr>
`
}
}

//progress no se ve en pantalla
let xmlhttp1 = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
   if (xmlhttp1.readyState == 4 && xmlhttp1.status == 200) {
       let myArr = JSON.parse(xmlhttp1.responseText);
       myFunction1(myArra);
   }
};
xmlhttp1.open("GET", urlProgress, true);
xmlhttp1.send();

function myFunction1(arra) {
  const ids = Object.key(arra);
  for (let i in ids){
    let dataId = ids[i];
    console.log(dataId);
  }
}
//   // const partsObj = arra[ids[0]].intro.units['01-introduction'].parts;
  //   console.log(partsObj)
  //   const keysParts = Object.keys(partsObj)
  //   console.log(keysParts)
  //   console.log(partsObj[keysParts[0]].duration)
  // //    let count = 0 ;
  //    for (const valor of keysParts) {
  //       count += partsObj[valor].completed;
  //    }
  //    console.log(count)
// }
// var objeto=arra[0];
// var id =(Object.keys(objeto));
// console.log(id[0]);
