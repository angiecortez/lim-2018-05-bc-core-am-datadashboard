window.computeUsersStats = (users, progress, courses) => {
  //console.log(courses);
  const users1 = users;
  const progress1 = progress;

  // [ [1, 2, 3], [4, 5, 6] ] -> [1, 2, 3, 4, 5, 6] se usara para concatenar dos arrays que haga en una línea
  const flatArray = (array) => {
    return array.reduce((a, b) => a.concat(b), []);
  }
  const calculateCompletionPercentage = user => {
    let count = 0;
    courses.map(course => {
      if (user[course]) {
        count += user[course]['percent'];
      }
    });
    return count/ courses.length;
  };
  const calculateExercises = user => {
    let units = courses.reduce((accum, c) => user[c] && user[c].units && [...accum, ...Object.values(user[c].units)], []) || [];
    // console.log('hola', units)
    let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
    let partsWithExercises = parts.filter(part => part.exercises);
    let exercises = flatArray(partsWithExercises.map(part => Object.values(part.exercises)));
    let completedExercises = exercises.filter(e => e.completed === 1).length;

      return {
        total: exercises.length,
        completed: completedExercises,
        percent: completedExercises / exercises.length * 100
      }
    }
  const calculateReads = user => {
    let units = courses.reduce((accum, c) => user[c] && user[c].units && [...accum, ...Object.values(user[c].units)], []) || [];
    let parts = flatArray(units.map(unit => unit.parts).map(part => Object.values(part)));
    let partsWithReads = parts.filter(part => part.type === 'read');
    let reads = partsWithReads
    let completedReads =  reads.filter(read => read.completed === 1).length;

    return {
      total:  reads.length,
      completed: completedReads,
      percent: Math.round(completedReads / reads.length * 100)
      }
    }
  const calculateQuizess = user => {
    let units = courses.reduce((accum, c) => user[c] && user[c].units && [...accum, ...Object.values(user[c].units)], []) || [];
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
      completed: completedQuizzes,
      percent: Math.round(completedQuizzes / quizz.length * 100),
      scoreSum: sumScore,
      scoreAvg: Math.round(sumScore/completedQuizzes)
    }
  }

  let students = users1.filter((user) => user.role === 'student').map( user => {
    const progressUser = progress1[user.id];
    return ({
      id: user.id,
      name: user.name,
      stats : {
        percent: calculateCompletionPercentage(progressUser),
        exercises: calculateExercises(progressUser),
        reads: calculateReads(progressUser),
        quizzes: calculateQuizess(progressUser),
       }
    });
    return user;
  });
  return students;
}

// let approved = students.filter(student => student.score >= 11);
window.sortUsers = (users, orderBy, orderDirection)=> { //asc y desc
 if(orderBy === 'name' && orderDirection === 'ASC'){
    const name = users.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    return name;
 }else if(orderBy === 'name' && orderDirection === 'DESC'){
    const name = users.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1));
}
if(orderBy === 'Porcentaje Completitud Total' && orderDirection === 'ASC'){
   const userPercent = users.sort((a, b) => (a.stats.percent > b.stats.percent ? 1 : -1));
 }else if (orderBy === 'Porcentaje Completitud Total' && orderDirection === 'DESC') {
   const userPercent = users.sort((a, b) => (a.stats.percent < b.stats.percent ? 1 : -1));
}
if (orderBy === 'Porcentaje ejercicios completos' && orderDirection === 'ASC') {
   const userExercisesCompleted = users.sort((a, b) => (a.stats.exercises.completed > b.stats.exercises.completed ? 1 : -1));
 } else if (orderBy === 'Porcentaje ejercicios completos' && orderDirection === 'DESC') {
   const userExercisesCompleted = users.sort((a, b) => (a.stats.exercises.completed < b.stats.exercises.completed ? 1 : -1));
}
if (orderBy === 'Porcentaje Quizzes completos' && orderDirection === 'ASC') {
   const userReadTotal = users.sort((a, b) => (a.stats.quizzes.completed > b.stats.quizzes.completed ? 1 : -1));
 } else if (orderBy === 'Porcentaje Quizzes completos' && orderDirection === 'DESC') {
   const userReadTotal = users.sort((a, b) => (a.stats.quizzes.completed < b.stats.quizzes.completed ? 1 : -1));
}
if (orderBy === 'Puntuacion promedio en quizzes' && orderDirection === 'ASC') {
   const scoreSum = users.sort((a, b) => (a.stats.quizzes.scoreSum > b.stats.quizzes.scoreSum ? 1 : -1));
 } else if (orderBy === 'Puntuacion promedio en quizzes' && orderDirection === 'DESC') {
   const scoreSum = users.sort((a, b) => (a.stats.quizzes.scoreSum < b.stats.quizzes.scoreSum ? 1 : -1));
return scoreSum;
}
if (orderBy === 'Porcentaje de lecturas completadas' && orderDirection === 'ASC') {
   const userReadTotal = users.sort((a, b) => (a.stats.reads.completed > b.stats.reads.completed ? 1 : -1));
 } else if (orderBy === 'Porcentaje de lecturas completadas' && orderDirection === 'DESC') {
   const userReadTotal = users.sort((a, b) => (a.stats.reads.completed < b.stats.reads.completed ? 1 : -1));
}
  return users;
}

window.filterUsers = (users, search) => {
//   let filterByUsers = users.filter(user => (user.name.toUpperCase().indexOf(search.toUpperCase()) !== -1)
//     return filterByUsers
}

window.processCohortData = (options)  => {
    const courses = Object.keys(options.cohort.coursesIndex);
    let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    users = sortUsers (users, options.orderBy, options.orderDirection);
    // search ? users = filterUsers (users, search) : null
   return users;
  }
