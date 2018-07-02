function printList(allList) {
    let lista = document.querySelector("#body")
    lista.innerHTML = "";
    allList.forEach((computeUsersStats1) => {
        let listaConStats = `<tr>
        <td class="name">${computeUsersStats1.name}</td>
        <td class="percent">${computeUsersStats1.percent}</td>
        <td class="exercisesCompleted">${computeUsersStats1.stats.exercises.completed} de ${userStats.stats.exercises.total}</td>
        <td class="quizzesCompleted">${computeUsersStats1.stats.quizzes.completed}</td>
        <td class="quizzesScoreAvg">${computeUsersStats1.stats.quizzes.scoreAvg}</td>
        <td class="readsCompleted">${computeUsersStats1.stats.reads.completed}</td>
        </tr>`
        lista.innerHTML += listaConStats
    })
}

let botonCohort = document.getElementById("btn")
botonCohort.addEventListener("click", (event) => {
    printList(computeUsersStats1);
})

let options:{
  cohort: '',
  cohortData:{
    users: '',
    progress:'',
  }
  orderBy:'name',
  orderDirection:'asc',
  search:''
}

const loadJSON = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}

let URLUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
let URLProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
let URLCohorts = '../data/cohorts.json';

loadJSON(URLUsers, (userJSON) => {
  loadJSON(URLProgress, (progressJSON) => {
    options.cohortData.users = userJSON;
    options.cohortData.progress= progressJSON;

    // extraer los ids de los cursos que sean de lima
    let id = 'lim-2018-03-pre-core-pw';
      const computeUsersStats1 = computeUsersStats(userJSON, progressJSON, id);
      console.log(sortUsers(computeUsersStats1, 'asc'));
      // filterUsers(computeUsersStats1, 'search');
    });
 });

loadJSON(URLCohorts, (cohortsJSON)=>{
  let cohort = cohortsJSON.filter((cohort) => cohort.id))

    let lima= cohort.startsWith('lim-')
    let chile = cohort.startsWith('scl-')
    let aqp= cohort.startsWith('aqp-')
    let mex = cohort.startsWith('cdmx') || cohort.startsWith('gdl-')
    let brasil = cohort.startsWith('spl-')

    options.cohort = cohort;


}
