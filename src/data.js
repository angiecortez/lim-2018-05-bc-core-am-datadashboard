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