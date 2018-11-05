window.computeUsersStats = (users, progress, courses) => {
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
    return count / courses.length;
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
        percent: exercises.length !== 0 ?  completedExercises / exercises.length * 100 : 0
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
      percent: reads.length !== 0 ? Math.round(completedReads / reads.length * 100) : 0
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
      percent: quizz.length !== 0 ? Math.round(completedQuizzes / quizz.length * 100): 0,
      scoreSum: sumScore,
      scoreAvg: completedQuizzes !== 0 ? Math.round(sumScore/completedQuizzes): 0
    }
  }

  let students = users1.filter((user) => user.role === 'student').map( user => {
    const progressUser = progress1[user.id];
    return ({
      id: user.id,
      stats : {
        name: user.name,
        percent: calculateCompletionPercentage(progressUser),
        exercises: calculateExercises(progressUser),
        reads: calculateReads(progressUser),
        quizzes: calculateQuizess(progressUser),
       }
    });
      // return user;
  });
  return students;
}

// let approved = students.filter(student => student.score >= 11);
window.sortUsers = (users, orderBy, orderDirection)=> {
if(orderBy === 'name' && orderDirection === 'ASC'){
    return users.sort((a, b) => (a.stats.name.toLowerCase() > b.stats.name.toLowerCase() ? 1 : -1));
 }else if(orderBy === 'name' && orderDirection === 'DESC'){
    return users.sort((a, b) => (a.stats.name.toLowerCase() > b.stats.name.toLowerCase() ? -1 : 1)); // el test de los nombres no corre con toLowerCase
}
if(orderBy === 'Porcentaje Completitud Total' && orderDirection === 'ASC'){
   return users.sort((a, b) => (a.stats.percent > b.stats.percent ? 1 : -1));
 }else if (orderBy === 'Porcentaje Completitud Total' && orderDirection === 'DESC') {
   return users.sort((a, b) => (a.stats.percent < b.stats.percent ? 1 : -1));
}
if (orderBy === 'Porcentaje ejercicios completos' && orderDirection === 'ASC') {
   return users.sort((a, b) => (a.stats.exercises.completed > b.stats.exercises.completed ? 1 : -1));
 } else if (orderBy === 'Porcentaje ejercicios completos' && orderDirection === 'DESC') {
   return users.sort((a, b) => (a.stats.exercises.completed < b.stats.exercises.completed ? 1 : -1));
}
if (orderBy === 'Porcentaje Quizzes completos' && orderDirection === 'ASC') {
   return users.sort((a, b) => (a.stats.quizzes.completed > b.stats.quizzes.completed ? 1 : -1));
 } else if (orderBy === 'Porcentaje Quizzes completos' && orderDirection === 'DESC') {
   return users.sort((a, b) => (a.stats.quizzes.completed < b.stats.quizzes.completed ? 1 : -1));
}
if (orderBy === 'Puntuacion promedio en quizzes' && orderDirection === 'ASC') {
   return users.sort((a, b) => (a.stats.quizzes.scoreAvg > b.stats.quizzes.scoreAvg ? 1 : -1));
 } else if (orderBy === 'Puntuacion promedio en quizzes' && orderDirection === 'DESC') {
   return users.sort((a, b) => (a.stats.quizzes.scoreAvg < b.stats.quizzes.scoreAvg ? 1 : -1));
}
if (orderBy === 'Porcentaje de lecturas completadas' && orderDirection === 'ASC') {
   return users.sort((a, b) => (a.stats.reads.completed > b.stats.reads.completed ? 1 : -1));
 } else if (orderBy === 'Porcentaje de lecturas completadas' && orderDirection === 'DESC') {
   return users.sort((a, b) => (a.stats.reads.completed < b.stats.reads.completed ? 1 : -1));
}
  // return users;
}

window.filterUsers = (users, search) => {
  return users.filter(user => (user.stats.name.toUpperCase().indexOf(search.toUpperCase()))!== -1)
}

window.processCohortData = (options)  => {
    const courses = Object.keys(options.cohort.coursesIndex);
    console.log(courses);
    let users = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
    users = sortUsers (users, options.orderBy, options.orderDirection);
    users = options.search ?  filterUsers(users, options.search) : users;
    return users;
  }
