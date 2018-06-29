//esta función se usara para refactorizar a las llamadas
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
    // extraer los ids de los cursos que sean de lima
    let id = 'lim-2018-03-pre-core-pw';
      console.log(computeUsersStats(userJSON, progressJSON, id));
      // const computeStas = computeUsersStats(userJSON, progressJSON, id);
      // console.log(sortUsers(computeUsersStats1, 'asc'));


    // usar sólo courses tiene un problema y es que en el JSON de cohorts no hay ningún ID para estos
    // loadJSON(URLCohorts, (cohortsJSON) => {
    //   let cohort = cohortsJSON.filter((cohort) => cohort.id === id)[0];
    //   let courses = Object.keys(cohort.coursesIndex); });
  });
});

const calculateCompletionPercentage = (progress) => {
  let progressElements = Object.values(progress);
  if(progressElements.length === 0) {
    return 0;
  }
  let totalSum = progressElements.reduce((sum, element) => {
    return sum + element.percent;
  }, 0);
  return totalSum / (100 * progressElements.length) * 100; debugger
}

// [ [1, 2, 3], [4, 5, 6] ] -> [1, 2, 3, 4, 5, 6] se usara para concatenar dos arrays que haga en una línea
const flatArray = (array) => {
  return array.reduce((a, b) => a.concat(b), []);
}

const calculateExercises = (progress) => {
  let courses = Object.values(progress);
  let units = flatArray(courses.map(course => course.units).map(unit => Object.values(unit)));
  let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
  let partsWithExercises = parts.filter(part => part.exercises);
  let exercises = flatArray(partsWithExercises.map(part => Object.values(part.exercises)));
  let completedExercises = exercises.filter(e => e.completed === 1).length;

  return {
    total: exercises.length,
    complete: completedExercises,
    percent: completedExercises / exercises.length * 100
  }
}

const calculateReads = (progress) =>{
  let courses = Object.values(progress);
  let units = flatArray(courses.map(course => course.units).map(unit => Object.values(unit)));
  let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
  let partsWithReads = parts.filter(part => part.type === 'read');
  let reads = partsWithReads
  let completedReads =  reads.filter(read => read.completed === 1).length;

  return {
    total:  reads.length,
    complete: completedReads,
    percent: Math.round(completedReads / reads.length * 100)
  }
}


const calculateQuizess = (progress) => {
    let courses = Object.values(progress);
    let units = flatArray(courses.map(course => course.units).map(unit => Object.values(unit)));
    let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
    let partsWithQuizz = flatArray(parts.filter(part => part.type === 'quiz'));
    let quizz = partsWithQuizz
    let completedQuizzes = quizz.filter(quiz => quiz.completed === 1).length;
    let sumScore1 = flatArray(parts.filter(part => part.type === 'quiz' && part.completed === 1));
    let sumScore = sumScore1.reduce((sum, element) => {
      return sum + element.score;
    }, 0);


    return {
      total:  quizz.length,
      complete: completedQuizzes,
      percent: Math.round(completedQuizzes / quizz.length * 100),
      scoreSum: sumScore,
      scoreAvg: Math.round(sumScore/completedQuizzes)
    }
  }


window.computeUsersStats = (users, progress, courses) => {
  return users.filter((user) => user.signupCohort === courses && user.role === 'student').map((user) => {
    user.stats = {
      percent: calculateCompletionPercentage(progress[user.id]),
      exercises: calculateExercises(progress[user.id]),
      reads: calculateReads(progress[user.id]),
      quizzez: calculateQuizess(progress[user.id]),
     };
    return user;
  });
}

// let approved = students.filter(student => student.score >= 11);

//funcion para poner los elementos de mas a menos o de menos a más
// window.sortUsers(users, orderBy, orderDirection){

// if (orderBy  === 'asc'){
//   users.sort((a, b) => (a.name > b.name ? 1 : -1));
// } else {
//   users.sort((a, b) => (a.name < b.name ? 1 : -1));
// }

// const userPercent = users.sort((a, b) => (a.percent > b.percent ? 1 : -1));
// const userExercisesTotal = users.sort((a, b) => (a.stats.exercises.total > b.stats.exercises.total ? 1 : -1));
// const userExercisesCompleted = users.sort((a, b) => (a.stats.exercises.completed > b.stats.exercises.completed ? 1 : -1));
// const userExercisesPercent = users.sort((a, b) => (a.stats.exercises.percent > b.stats.exercises.percent ? 1 : -1));
// const userReadTotal = users.sort((a, b) => (a.stats.reads.total > b.stats.reads.total ? 1 : -1));
// const userReadTotal = users.sort((a, b) => (a.stats.reads.completed > b.stats.reads.completed ? 1 : -1));
// const userReadTotal = users.sort((a, b) => (a.stats.reads.percent > b.stats.reads.percent ? 1 : -1));

//// de mas a menos

// const name = users.sort((a, b) => (a.name < b.name ? 1 : -1));
// const userPercent = users.sort((a, b) => (a.percent < b.percent ? 1 : -1));
// const userExercisesTotal = users.sort((a, b) => (a.stats.exercises.total < b.stats.exercises.total ? 1 : -1));
// const userExercisesCompleted = users.sort((a, b) => (a.stats.exercises.completed < b.stats.exercises.completed ? 1 : -1));
// const userExercisesPercent = users.sort((a, b) => (a.stats.exercises.percent < b.stats.exercises.percent ? 1 : -1));


// }
//funcion para buscar
// window.filterUsers(users, search){
//   let filterByUsers = users.filter(user => {
//     return user.name.toUpperCase().indexOf(search) > -1;
//   });
//   return filterByUsers;
// }

// windowprocessCohortData(options){
//   options:{
//     cohort:
//     cohortData:{
//       users:
//       progress:
//     }
//     orderBy:
//     orderDirection:
//     search:
//   }
// }
