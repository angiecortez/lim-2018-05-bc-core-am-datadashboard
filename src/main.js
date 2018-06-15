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
