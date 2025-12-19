console.log("JS LOADED");

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* -------- Screen flow -------- */

document.getElementById("enterBtn").addEventListener("click", () => {
  showScreen("screen2");
});

function checkPassword() {
  const pwd = document.getElementById("password").value;
  if (pwd === "c5d9") {
    showScreen("screen3");
  } else {
    alert("Wrong Password ❌");
  }
}

/* -------- Utilities -------- */

function cleanForVoice(text) {
  return text.replace(
    /([\u2700-\u27BF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
    ""
  );
}

function typeText(el, text, speed = 55) {
  el.innerHTML = "";
  el.style.opacity = 1;
  let i = 0;

  return new Promise(resolve => {
    const interval = setInterval(() => {
      el.innerHTML += text.charAt(i);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function fadeOut(el) {
  el.style.opacity = 0;
}

function speak(text, gender, mood = {}) {
  if (!text || text.trim() === ".....") return;

  const utter = new SpeechSynthesisUtterance(cleanForVoice(text));
  const voices = speechSynthesis.getVoices();

  utter.voice =
    gender === "male"
      ? voices[0]
      : voices[1] || voices[0];

  utter.pitch = mood.pitch ?? (gender === "male" ? 0.85 : 1.25);
  utter.rate = mood.rate ?? 0.95;
  utter.volume = mood.volume ?? 1;

  speechSynthesis.speak(utter);
}

/* -------- Conversation -------- */

const conversation = [
  { who:"z1", text:"Hey , pretty 👋🏻" },
  { who:"z2", text:"Hmm." },
  { who:"z1", text:"Happy Birthday my girl 👸🏻🐒💞" },
  { who:"z2", text:"huh , thank you u 🫶🏻💘☺️" },
  { who:"z1", text:"hmmmm 😊🙃" },
  { who:"z2", text:"hmm , will you stay with untill .... ?" },
  { who:"z1", text:"untill ..?" },
  { who:"z1", text:"listen baby girl , im not going anywhere by leaving you" },
  { who:"z1", text:"I'll stay with you forever" },
  { who:"z2", text:"really ?" },
  { who:"z1", text:"Yeah , its my promise. chitti 👸🏻🫳🏻" },
  { who:"z2", text:"....." },
  { who:"z1", text:"I LOVE YOU CHITTI 💓🌹" },
  { who:"z2", text:"I LOVE YOU TOO 💕" },
  { who:"z1", text:"ONCE AGAIN HAPPY BIRTHDAY MY GIRL 💞👸🏻" }
];

async function startConversation() {
  const z1 = document.getElementById("z1");
  const z2 = document.getElementById("z2");
  let last = null;

  for (const msg of conversation) {
    const el = msg.who === "z1" ? z1 : z2;
    const gender = msg.who === "z1" ? "male" : "female";

    if (last && last !== el) fadeOut(last);

    await typeText(el, msg.text);
    speak(msg.text, gender);

    last = el;
    await new Promise(r => setTimeout(r, 1200));
  }
}

/* -------- DOM Ready -------- */

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("passBtn")
    .addEventListener("click", checkPassword);

  document.getElementById("warning")
    .addEventListener("click", () => {
      setTimeout(() => {
        showScreen("screen4");
        startConversation();
      }, 3000);
    });

});
