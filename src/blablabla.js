window.computeUsersStats = (users, progress, courses) => {
  const users1 = users;
  const progress1 = progress;

  // [ [1, 2, 3], [4, 5, 6] ] -> [1, 2, 3, 4, 5, 6] se usara para concatenar dos arrays que haga en una línea
  const flatArray = (array) => {
    return array.reduce((a, b) => a.concat(b), []);
  }
  const calculateCompletionPercentage = user => {
    let count = 0;
    courses.map(course => user[course]);
    count += user[course]['percent'];
    return count/ courses.length;
  };
  const calculateExercises = user => {
    let units = flatArray(courses.map(course => user.hasOwnProperty[course].units).map(unit => Object.values(unit)));
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
  const calculateReads = user => {
    let units = flatArray(courses.map(course => user.hasOwnProperty[course].units).map(unit => Object.values(unit)));
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
  const calculateQuizess = user => {
    let units = flatArray(courses.map(course => user.hasOwnProperty[course].units).map(unit => Object.values(unit)));
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

  let students = users1.filter((user) => user.signupCohort === courses && user.role === 'student').map( user => {
    const progressUser = progress1[user.id];
    return ({
      id: user.id,
      name: user.name.toUpperCase(),
      stats : {
        percent: calculateCompletionPercentage(progressUser),
        exercises: calculateExercises(progressUser),
        reads: calculateReads(progressUser),
        quizzez: calculateQuizess(progressUser),
       }
    });
    return user;
  });
}

// let approved = students.filter(student => student.score >= 11);
// window.sortUsers = (users, orderBy, orderDirection)=> { //asc y desc
//     const a = users.sort((a, b) => (a.name > b.name ? 1 : -1));
//     console.log(a);
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
// }

// window.filterUsers = (users, search) => {
//   let filterByUsers = users.filter(user => (user.name.toUpperCase().indexOf(search.toUpperCase()) !== -1);
//  return filterByUsers;
// }

window.processCohortData = (options)  => {
    const courses = Object.keys(options.cohort.coursesIndex);
    console.log(courses);
    // let users = computeUsersStats (options.cohortData.users, options.cohortData.progress, courses);
    // users = sortUsers (users, options.orderBy, options.orderDirection);
    // search ? users = filterUsers (users, search) : null
   // return users;
  }
