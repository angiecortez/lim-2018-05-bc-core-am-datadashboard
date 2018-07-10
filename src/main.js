let listOfCohorts = document.querySelector('#sedes');
let sectionMainContent = document.getElementById('main-content');
let divContent = document.getElementById('content');
let search = document.getElementById('search');
let orderDirection = document.getElementById('orderDirection');
let orderBy = document.getElementById('orderBy');

let options = { //se crea este objeto vacio para almacenar los datos de los cohorts, users y porgress.
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
    `
       <li class= "nuevoScroll" id='${cohort.id}'>${cohort.id}</li>
      `;
  };
}
//se crea este refactorizador para hacer el llenado de la data, se usa un string vacion cuando se creen templates y no demore en cargar los datos
const llenandoData = (array) =>{
  let stringEmpty = '';
  divContent.innerHTML = '';
  for (const user of array) {
  stringEmpty += `
  <div class="porCurso"> <p><strong>Nombre : </strong>${ user.stats.name}</p><br>
                <p><strong>Porcentaje de Completitud :</strong>${ user.stats.percent + '%'}</p><br>
                <p><strong>Ejercicios Completados    :</strong>${ user.stats.exercises.percent + '%'}</p><br>
                <p><strong>Quizzes Completados       :</strong>${ user.stats.quizzes.percent + '%'}</p><br>
                <p><strong>Lecturas Completados      :</strong>${ user.stats.reads.percent + '%'}</p><br>
                <p><strong>Promedio de Quizzes       :</strong>${ user.stats.quizzes.scoreAvg + '%'}</p><br>
  </div>
    `
  }
  divContent.innerHTML = stringEmpty;
}

const progressJSON = (cohortName, ObjProgress)=> {
  options.cohortData.progress = ObjProgress;
  const arrFinal = processCohortData(options);
  console.log(processCohortData(options));
  llenandoData(arrFinal)
  }

const userJSON = (cohortName, userArray) => {
  options.cohortData.users = userArray;
  loadJSON(cohortName,`../data/cohorts/${cohortName}/progress.json`, progressJSON);
}
//de click
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

//dom de filtración
search.addEventListener('input', (event) => {
  valorEscrito = event.target.value;
  options.search = valorEscrito;
  const arrFinal = processCohortData(options);
  divContent.innerHTML = '';
  llenandoData(arrFinal);
})

// dom de ordenamiento
orderDirection.addEventListener('change', (event)=> {
  console.log(event.target.value);
  console.log(options);
  //console.log(options.orderDirection);
  options.orderDirection = orderDirection.value;
  //console.log(orderBy.value);
  const arrFinal = processCohortData(options);
  llenandoData(arrFinal);
  orderBy.addEventListener('change', (event)=>{
    console.log(orderBy.value);
    options.orderBy = orderBy.value;
    const arrFinal = processCohortData(options);
    llenandoData(arrFinal);
  })
})
