let urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json"
let urlUsers = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
let Cohorts1 = "../data/cohorts.json"
//estoy creando una funcion en donde guardare a los dos parametros, users y progress
// function ProgressList(){
  const xhrHttp = new XMLHttpRequest();
  xhrHttp.open("GET", urlUsers, true)
  xhrHttp.onload = function() {
  let myUsers = JSON.parse(xhrHttp.responseText);
  // console.log(myUsers);
  const xhrProgress = new XMLHttpRequest();
  xhrProgress.open("GET", urlProgress, true);
  xhrProgress.onload = function(event){
    let myProgress = JSON.parse(xhrProgress.responseText);
    // console.log(myProgress);
    computeUsersStats(myUsers, myProgress);
    // userPush(users)
  }
  xhrProgress.send();
};
xhrHttp.send();
// }

function computeUsersStats(myUsers, myProgress){
  const ids = Object.keys(myProgress);
  for (let valor of myUsers){
   const idUsers = valor.id
   const idNames = valor.name
      for(const idProgress of ids){
        if(idUsers === idProgress){
          // console.log(myProgress[idUsers].intro);
          console.log([idNames],myProgress[idProgress].intro);
          // const id2 = Object.keys(idNames,myProgress[idProgress].intro)
          // console.log(id2);
        }
      }
  // console.log(idUsers);
}
}