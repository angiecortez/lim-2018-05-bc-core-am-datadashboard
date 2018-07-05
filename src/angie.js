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
  // console.log(options)
  const cohortsTotal = cohortArray.filter(cohort=> {
    return cohort.id.indexOf(campus) !== -1;
  });
  console.log(cohortsTotal);
  sectionMainContent.innerHTML= '';
  for (cohort of cohortsTotal) {
    sectionMainContent.innerHTML +=
    ` <div>
       <p id='${cohort.id}'>${cohort.id}</p>
     </div> `;
  };
}

const progressJSON = (cohortName, ObjProgress)=> {
  options.cohortData.progress = ObjProgress;
  // processCohortData(options);
}

const userJSON = (cohortName, userArray) => {
  options.cohortData.users = userArray;
  console.log(options);
  loadJSON(cohortName,`../../data/cohorts/${cohortName}/progress.json`, progressJSON);
}

listOfCohorts.addEventListener('click', (event) => {
  event.preventDefault()
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
