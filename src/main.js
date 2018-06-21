const btnContinue = document.getElementById("btnLogin");
btnContinue.addEventListener("click", () => {
  const hidden = document.getElementById("container-login");
  const show = document.getElementById("container-lab-view");
  hidden.style.display = "none";
  show.style.display = "block";
});





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
  // userPush(users)
}
xhrProgress.send();
};
xhrHttp.send();
};
xhrCohorts.send();

function computeUsersStats(myUsers, myProgress, myCohorts){
  for(let cohort of myCohorts){
    const idCohorts = cohort.id
    console.log(idCohorts);
  }
}
