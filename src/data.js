// var xhr = new XMLHttpRequest();
// let progress;
// xhr.open("GET", "/data/cohorts/lim-2018-05-bc-core-am-datadashboard/progress.json", true);
// xhr.onload = function (e) {
//   if (xhr.readyState === 4) {
//     if (xhr.status >=200 && xhr.status < 400) {
//         progress = JSON.parse(xhr.responseText);
//         console.log(progress);
//     } else {
//       console.error(xhr.statusText);
//     }
//   }
// };
// xhr.onerror = function (e) {
//   console.error(xhr.statusText);
// }
// xhr.send(null);
function progress_final(){
}
let progress ;
const data = new XMLHttpRequest();
data.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/progress.json", true);
data.onload = function (e) {
 if (data.readyState === 4) {
   if (data.status >= 200 &&  data.status < 400) {
     progress = JSON.parse(data.responseText);
     console.log(progress);
   } else {
     console.error(data.statusText);
   }
 }
};
data.onerror = function (e) {
 console.error(data.statusText);
};
data.send(null);

///
let users;
const xhr = new XMLHttpRequest();
xhr.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/users.json", true);
xhr.onload = function (e) {
 if (xhr.readyState === 4) {
   if (xhr.status >= 200 &&  xhr.status < 400) {
    users = JSON.parse(xhr.responseText);
     console.log(users);
   } else {
     console.error(xhr.statusText);
   }
 }
};
xhr.onerror = function (e) {
 console.error(xhr.statusText);
};
xhr.send(null);

///
let cohorts;
const cohorts_xhr = new XMLHttpRequest();
cohorts_xhr.open("GET", "/data/cohorts.json", true);
cohorts_xhr.onload = function (e) {
 if (cohorts_xhr.readyState === 4) {
   if (cohorts_xhr.status >= 200 &&  cohorts_xhr.status < 400) {
    cohorts = JSON.parse(cohorts_xhr.responseText);
     console.log(cohorts);
   } else {
     console.error(cohorts_xhr.statusText);
   }
 }
};
cohorts_xhr.onerror = function (e) {
 console.error(cohorts_xhr.statusText);
};
cohorts_xhr.send(null);
