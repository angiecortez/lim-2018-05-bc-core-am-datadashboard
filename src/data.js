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
    options.cohortData.users = userJSON;
    options.cohortData.progress= progressJSON;

    // extraer los ids de los cursos que sean de lima
    let id = 'lim-2018-03-pre-core-pw';
      const computeUsersStats1 = computeUsersStats(userJSON, progressJSON, id);
      console.log(sortUsers(computeUsersStats1, 'asc'));
      // filterUsers(computeUsersStats1, 'search');


    // usar sólo courses tiene un problema y es que en el JSON de cohorts no hay ningún ID para estos
    // loadJSON(URLCohorts, (cohortsJSON) => {
    //   let cohort = cohortsJSON.filter((cohort) => cohort.id === id)[0];
      // let courses = Object.keys(cohort.coursesIndex);

     });
  });
// });


//empieza// let id = 'lim-2018-03-pre-core-pw';
// const listCohorts = (id) => {
//     selectCohorts.innerHTML = "";
//     let cohortsJsonVariable = [];
//     //const traerJson = () => {
//         loadJSON(URLCohorts, (cohortsJSON) => {
//           let cohort = cohortsJSON.map((cohort)=> cohort.id === id);
//           selectCohorts.innerHTML += "<option value='" + cohort + "'>" + cohort + "</option>"
//         })
// }//termina

// Añadir comentarioContraer 

const calculateCompletionPercentage = (progress) => {
  let progressElements = Object.values(progress);
  if(progressElements.length === 0) {
    return 0;
  }
  let totalSum = progressElements.reduce((sum, element) => {
    return sum + element.percent;
  }, 0);
  return totalSum / (100 * progressElements.length) * 100;
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

//refactorizador que hara la funcion de menos a mas
const ascendent = (words) => {
  return array.sort((a,b) => a > b ? 1: -1)
}
//refactorizador que hara la funcion de mas a menos
const descendent = (words) => {
  return array.sort((a,b) => a < b ? 1: -1)
}

// let approved = students.filter(student => student.score >= 11);
window.sortUsers = (users, orderBy, orderDirection)=> { //asc y desc
    const users = users.sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log(a);
//  if(orderBy === 'name' && orderDirection === 'asc'){
//     users.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
//  }else if(orderBy === 'name' && orderDirection === 'desc'){
//     users.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));
// }
// if(orderBy === 'porcentaje completitud total' orderDirection === 'asc'){
//    const userPercent = users.sort((a, b) => (a.percent > b.percent ? 1 : -1));
//  }else if (orderBy === 'porcentaje completitud total' orderDirection === 'desc') {
//    const userPercent = users.sort((a, b) => (a.percent < b.percent ? 1 : -1));
// }
// if (orderBy === 'completedExercises' orderDirection === 'asc') {
//    const userExercisesCompleted = users.sort((a, b) => (a.stats.exercises.completed > b.stats.exercises.completed ? 1 : -1));
//  } else if (orderBy === 'completedExercises' orderDirection === 'desc') {
//    const userExercisesCompleted = users.sort((a, b) => (a.stats.exercises.completed < b.stats.exercises.completed ? 1 : -1));
// }
// if (orderBy === 'completedQuizzes' orderDirection === 'asc') {
//    const userReadTotal = users.sort((a, b) => (a.stats.quizzes.completed > b.stats.quizzes.completed ? 1 : -1));
//  } else if (orderBy === 'completedQuizzes' orderDirection === 'desc') {
//    const userReadTotal = users.sort((a, b) => (a.stats.quizzes.completed < b.stats.quizzes.completed ? 1 : -1));
// }
// if (orderBy === 'Promedio de quizzes' orderDirection === 'asc') {
//    const scoreSum = users.sort((a, b) => (a.stats.quizzes.scoreSum > b.stats.quizzes.scoreSum ? 1 : -1));
//  } else if (orderBy === 'Promedio de quizzes' orderDirection === 'desc') {
//    const scoreSum = users.sort((a, b) => (a.stats.quizzes.scoreSum < b.stats.quizzes.scoreSum ? 1 : -1));
// }
// if (orderBy === 'completedReads' orderDirection === 'asc') {
//    const userReadTotal = users.sort((a, b) => (a.stats.reads.completed > b.stats.reads.completed ? 1 : -1));
//  } else if (orderBy === 'completedReads' orderDirection === 'desc') {
//    const userReadTotal = users.sort((a, b) => (a.stats.reads.completed < b.stats.reads.completed ? 1 : -1));
// }
//  return users;
}

// window.filterUsers = (users, search) => {
//   let filterByUsers = users.filter(user => (user.name.toUpperCase().indexOf(search.toUpperCase()) !== -1);
//  return filterByUsers;
// }

// window.processCohortData = (options)  => {
//    let users = computeUsersStats (options.cohortData.users, options.cohortData.progress, options.cohort.coursesIndex);
//    users = sortUsers (users, options.orderBy, options.orderDirection);
//    if (options.search !== '') {
//     filterUsers (users, options.search);
//     };
//    return users;
//   }
