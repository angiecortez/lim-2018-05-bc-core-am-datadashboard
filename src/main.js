
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

    let lima= cohort.startsWith('lim-');
    let chile = cohort.startsWith('scl-');
    let aqp= cohort.startsWith('aqp-');
    let mex = cohort.startsWith('cdmx') || cohort.startsWith('gdl-');
    let brasil = cohort.startsWith('spl-');
    options.cohort = cohort;
}
