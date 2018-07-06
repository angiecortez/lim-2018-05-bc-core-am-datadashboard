let listOfCohorts = document.querySelector('#sedes');
let sectionMainContent = document.getElementById('main-content');
let divContent = document.getElementById('content');

let options = {
  cohort: null,
  cohortData:{
    users: null,
    progress: null,
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: ''
};

//refactorizador que utilizare para hacer el llamado (high order function)
const loadJSON = (str, url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('load', event => {
    if (event.target.readyState === 4 && event.target.status === 200) {
      const response = (JSON.parse(event.target.responseText));
      callback(str, response)
    }
  });
  xhr.send();
  }

const cohortsJSON = (campus, cohortArray) => { //debugger
  options.cohort = cohortArray;
  const cohortsTotal = cohortArray.filter(cohort=> {
    return cohort.id.indexOf(campus) !== -1;
  });
  console.log(cohortsTotal);
  sectionMainContent.innerHTML= '';
  for (cohort of cohortsTotal) {
    sectionMainContent.innerHTML +=
    ` <div>
       <option id='${cohort.id}'>${cohort.id}</option>
     </div> `;
  };
}

const progressJSON = (cohortName, ObjProgress)=> {
  options.cohortData.progress = ObjProgress;
  const arrFinal = processCohortData(options);
  console.log(processCohortData(options));
  // for (const user of arrFinal) {
  //   sectionMainContent.innerHTML = `
  //   <table><tr><th>Nombre</th><th>Porcentaje</th><td>Ejercicios</th><td>Quizzes</th><th>Lecturas</th><td>Prom Quiz</td></tr>
  //   <tr>
  //               <td>${ user.name.toUpperCase()}</td>
  //               <td>${ user.stats.percent + '%'}</td>
  //               <td>${ user.stats.exercices.percent + '%'}</td>
  //               <td>${ user.stats.quizzes.percent + '%'}</td>
  //               <td>${ user.stats.reads.percent + '%'}</td>
  //               <td>${ user.stats.quizzes.scoreAvg + '%'}</td>
  //   </tr>
  // </table>
  //   `
  // }
}

const userJSON = (cohortName, userArray) => {
  options.cohortData.users = userArray;
  loadJSON(cohortName,`../../data/cohorts/${cohortName}/progress.json`, progressJSON);
}

listOfCohorts.addEventListener('click', (event) => {
  event.preventDefault()
  // console.log(event.target.id);
  loadJSON(event.target.id,'../data/cohorts.json', cohortsJSON);
});
//element reasignara el valor de options.cohorts
sectionMainContent.addEventListener('click', event => {
  options.cohort.forEach(element => {
    if (element.id === event.target.id){
      options.cohort = element;
    }
  });
  loadJSON(event.target.id,`../data/cohorts/${event.target.id}/users.json`, userJSON)
});
