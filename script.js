function showScreen(id) {
  document.querySelectorAll(".screen")
    .forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("enterBtn").onclick = () => {
  showScreen("screen2");
};

function checkPassword() {
  if (password.value === "c5d9") {
    showScreen("screen3");
  }
}

document.getElementById("warning").onclick = () => {
  showScreen("screen4");
};