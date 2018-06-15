<<<<<<< HEAD
let table = document.getElementById('response-container')


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       let myArr = JSON.parse(xmlhttp.responseText);
       myFunction(myArr);
   }
};
xmlhttp.open("GET", urlUsers, true);
xmlhttp.send();
function myFunction(arr) {

for (let i in arr){

// infoContainer. = '<p> ' + arr[i].name +  '</p>';
  console.log(arr[i].id);
}

}
=======
const btnContinue = document.getElementById("btnLogin"); 
btnContinue.addEventListener("click", () => {
  const hidden = document.getElementById("container-login");
  const show = document.getElementById("container-lab-view");
  hidden.style.display = "none";
  show.style.display = "block";
});
>>>>>>> 00a84f2b0053072eed55b4d49d8e70e7133ee4d4
