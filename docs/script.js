console.log("FINAL CONVERSATION JS LOADED");

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------- SCREEN FLOW ---------- */

document.getElementById("enterBtn").onclick = () => {
  showScreen("screen2");
};

function checkPassword() {
  const pwd = document.getElementById("password").value;
  if (pwd === "c5d9") {
    showScreen("screen3");
  } else {
    alert("Wrong Password ❌");
  }
}

document.getElementById("warning").onclick = () => {
  setTimeout(() => {
    showScreen("screen4");
    startConversation();
  }, 3000);
};

/* ---------- UTILITIES ---------- */

// remove emojis + symbols for voice only
function cleanForVoice(text) {
  return text.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
    ""
  ).trim();
}

// typing effect
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

// fade out
function fadeOut(el) {
  el.style.opacity = 0;
}

// speak
function speak(text, gender, mood = {}) {
  if (!text || text.trim() === ".....") return;

  const utter = new SpeechSynthesisUtterance(cleanForVoice(text));
  const voices = speechSynthesis.getVoices();

  if (gender === "male") {
    utter.voice = voices.find(v =>
      v.name.toLowerCase().includes("male")
    ) || voices[0];

    utter.pitch = 0.85;
    utter.rate = 0.95;
  } else {
    utter.voice = voices.find(v =>
      v.name.toLowerCase().includes("female")
    ) || voices[1];

    utter.pitch = mood.pitch ?? 1.2;
    utter.rate = mood.rate ?? 0.95;
  }

  utter.volume = mood.volume ?? 1;
  speechSynthesis.speak(utter);
}

/* ---------- CONVERSATION DATA ---------- */

const conversation = [
  { who: "z1", text: "Hey , pretty 👋🏻" },
  { who: "z2", text: "Hmm." },

  { who: "z1", text: "Happy Birthday my girl 👸🏻🐒💞" },
  { who: "z2", text: "huh , thank  you u 🫶🏻💘☺️", mood:{ pitch:1.35 } },

  { who: "z1", text: "hmmmm 😊🙃" },

  { who: "z2", text: "hmm , will you stay with untill .... ?", mood:{ rate:0.85, volume:0.85 } },

  { who: "z1", text: "untill ..?" },

  { who: "z1", text: "listen baby girl , im not going anywhere by leaving you" },

  { who: "z1", text: "I'll stay with you forever" },

  { who: "z2", text: "really ?", mood:{ pitch:1.4 } },

  { who: "z1", text: "Yeah , its my promise. chitti 👸🏻🫳🏻" },

  { who: "z2", text: "....." }, // silence

  { who: "z1", text: "I LOVE YOU CHITTI 💓🌹" },

  { who: "z2", text: "I LOVE YOU TOO 💕", mood:{ pitch:1.45, rate:0.85 } },

  { who: "z1", text: "ONCE AGAIN HAPPY BIRTHDAY MY GIRL 💞👸🏻" }
];

/* ---------- SEQUENTIAL ENGINE ---------- */

async function startConversation() {
 console.log("Conversation started");
 const z1 = document.getElementById("z1");
  const z2 = document.getElementById("z2");

  let lastEl = null;

  for (let i = 0; i < conversation.length; i++) {
    const msg = conversation[i];
    const el = msg.who === "z1" ? z1 : z2;
    const gender = msg.who === "z1" ? "male" : "female";

    if (lastEl && lastEl !== el) {
      fadeOut(lastEl);
    }

    await typeText(el, msg.text);
    speak(msg.text, gender, msg.mood);

    lastEl = el;
    await new Promise(r => setTimeout(r, 1200));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("passBtn").addEventListener("click", checkPassword);
});
