let urlProgress = "../data/cohorts/lim-2018-03-pre-core-pw/progress.json"
let urlUsers = "../data/cohorts/lim-2018-03-pre-core-pw/users.json";
let Cohorts1 = "../data/cohorts.json"

//estoy creando una funcion en donde guardare a los dos parametros, users y progress
// function ProgressList(){
const xhrCohort = new XMLHttpRequest();
xhrCohort.open("GET", Cohorts1, true);
xhrCohort.onload = ()=>{
  let myCohorts = JSON.parse(xhrCohort.responseText);
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
  computeUsersStats(myUsers, myProgress, myCohorts);
  cohortspaamostrar(myCohorts)
  // userPush(users)
}
xhrProgress.send();
};
xhrHttp.send();
};
xhrCohorts.send();

function computeUsersStats(myUsers, myProgress){
  const userStat = myUsers.map(usuario =>{
    const ejercicios = ()=>{
      let total = [];

      Object.keys(myProgress[usuario.id]).map(intros =>{
        Object.keys(myProgress[usuario.id][intros].units).map()
      })
    }
  })
}
