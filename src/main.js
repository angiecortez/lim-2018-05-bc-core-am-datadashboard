const btnContinue = document.getElementById("btnLogin"); 
btnContinue.addEventListener("click", () => {
  const hidden = document.getElementById("container-login");
  const show = document.getElementById("container-lab-view");
  hidden.style.display = "none";
  show.style.display = "block";
});
