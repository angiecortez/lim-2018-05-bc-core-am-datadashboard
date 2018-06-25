//esta función se usara para refactorizar a las llamadas
function loadJSON(url, callback) {
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
    computeUsersStats(userJSON, progressJSON, id);

    // usar sólo courses tiene un problema y es que en el JSON de cohorts no
    // hay ningún ID para estos
    // loadJSON(URLCohorts, (cohortsJSON) => {
    //   let cohort = cohortsJSON.filter((cohort) => cohort.id === id)[0];
    //   let courses = Object.keys(cohort.coursesIndex);
    // });
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
  return totalSum / (100 * progressElements.length) * 100;
}

// [ [1, 2, 3], [4, 5, 6] ] -> [1, 2, 3, 4, 5, 6] // se usara para concatenar dos arrays que haga en una línea
function flatArray(array) {
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

const calculateReads = (progress) => {
  let courses = Object.values(progress);
  let units = flatArray(courses.map(course => course.units).map(unit => Object.values(unit)));
  let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
  let partsWithReads = parts.filter(part => part.type === 'read');
  let reads = partsWithReads
  let completedReads =  reads.filter(read => read.completed === 1).length;

  return {
    total:  reads.length,
    complete: completedReads,
    percent: completedReads / reads.length * 100
  }
}

const calculateQuizess = (progress) => {
  let courses = Object.values(progress);
  let units = flatArray(courses.map(course => course.units).map(unit => Object.values(unit)));
  let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
  let partsWithQuizz = flatArray(parts.filter(part => part.type === 'quiz'));
  let quizz = partsWithQuizz
  let completedQuizzes = quizz.filter(quiz => quiz.completed === 1).length;
  let sumScore = quizz.filter(quiz => quiz.score === 1);

  return {
    total:  quizz.length,
    complete: completedQuizzes,
    percent: completedQuizzes / quizz.length * 100,
    // scoreSum:
    // scoreAvg:
  }
}

function computeUsersStats(users, progress, cohort) {
  return users.filter((user) => user.signupCohort === cohort).map((user) => {
    user.stats = {
      percent: calculateCompletionPercentage(progress[user.id]),
      exercises: calculateExercises(progress[user.id]),
      
    };
    return user;
  });
}
