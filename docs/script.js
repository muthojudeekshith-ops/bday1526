document.addEventListener("DOMContentLoaded", () => {

  function showScreen(id) {
    document.querySelectorAll(".screen")
      .forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // Interface 1
  document.getElementById("enterBtn").onclick = () => {
    showScreen("screen2");
  };

  // Interface 2
  document.getElementById("passBtn").onclick = () => {
    if (document.getElementById("password").value === "c5d9") {
      showScreen("screen3");
    }
  };

  // Interface 3
  document.getElementById("warning").onclick = () => {
    showScreen("screen4");
  };

});

