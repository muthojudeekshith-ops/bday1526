/* ================= SCREEN FLOW ================= */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("enterBtn").onclick = () => {
  showScreen("screen2");
};

document.getElementById("passBtn").onclick = () => {
  const pwd = document.getElementById("password").value;
  if (pwd === "c5d9") {
    showScreen("screen3");
  } else {
    alert("Wrong Password ❌");
  }
};

document.getElementById("warning").onclick = () => {
  setTimeout(() => {
    showScreen("screen4");
    startConversation();
  }, 3000);
};

/* ================= VOICE SETUP (MOBILE SAFE) ================= */

let maleVoice = null;
let femaleVoice = null;

function loadVoices() {
  const voices = speechSynthesis.getVoices();

  maleVoice =
    voices.find(v =>
      v.lang.startsWith("en") &&
      (v.name.toLowerCase().includes("male") ||
       v.name.toLowerCase().includes("google"))
    ) || voices[0];

  femaleVoice =
    voices.find(v =>
      v.lang.startsWith("en") &&
      (v.name.toLowerCase().includes("female") ||
       v.name.toLowerCase().includes("google"))
    ) || voices[1] || voices[0];
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

/* ================= TEXT CLEANER ================= */

function cleanForVoice(text) {
  return text
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

/* ================= SPEAK WORD ================= */

function speakWord(word, gender) {
  const clean = cleanForVoice(word);
  if (!clean) return;

  const utter = new SpeechSynthesisUtterance(clean);

  if (gender === "male") {
    utter.voice = maleVoice;
    utter.pitch = 0.78;
    utter.rate = 0.75;
  } else {
    utter.voice = femaleVoice;
    utter.pitch = 1.1;
    utter.rate = 0.78;
  }

  utter.volume = 0.95;
  speechSynthesis.speak(utter);
}

/* ================= TYPE + VOICE WITH PAUSES ================= */

function typeText(el, text, gender) {
  el.innerHTML = "";
  el.style.opacity = 1;

  const tokens = text.split(" ");
  let i = 0;

  return new Promise(resolve => {
    function nextToken() {
      if (i >= tokens.length) {
        resolve();
        return;
      }

      let token = tokens[i];
      el.innerHTML += (i === 0 ? "" : " ") + token;

      speakWord(token, gender);

      let delay = 450; // base slow speed

      if (token.includes(",")) delay = 1000; // comma pause
      if (token.includes("...") || token.includes("..")) delay = 2000; // dots pause

      i++;
      setTimeout(nextToken, delay);
    }

    nextToken();
  });
}

function fadeOut(el) {
  el.style.opacity = 0;
}

/* ================= CONVERSATION ================= */

const conversation = [
  { who: "z1", text: "Hey, pretty 👋🏻" },
  { who: "z2", text: "Hmm" },

  { who: "z1", text: "Happy Birthday, my girl 👸🏻🐒💞" },
  { who: "z2", text: "huh, thank you u 🫶🏻💘☺️" },

  { who: "z1", text: "hmmmm" },

  { who: "z2", text: "hmm, will you stay with untill ... ?" },

  { who: "z1", text: "untill ..?" },

  { who: "z1", text: "listen baby girl, im not going anywhere by leaving you" },

  { who: "z1", text: "Ill stay with you forever" },

  { who: "z2", text: "really ?" },

  { who: "z1", text: "Yeah, its my promise chitti 👸🏻🫳🏻" },

  { who: "z2", text: "....." },

  { who: "z1", text: "I LOVE YOU CHITTI 💓🌹" },

  { who: "z2", text: "I LOVE YOU TOO 💕" },

  { who: "z1", text: "ONCE AGAIN, HAPPY BIRTHDAY MY GIRL 💞👸🏻" }
];

/* ================= SEQUENTIAL ENGINE ================= */

async function startConversation() {
  const z1 = document.getElementById("z1");
  const z2 = document.getElementById("z2");

  let lastEl = null;

  for (const msg of conversation) {
    const el = msg.who === "z1" ? z1 : z2;
    const gender = msg.who === "z1" ? "male" : "female";

    if (lastEl && lastEl !== el) fadeOut(lastEl);

    await typeText(el, msg.text, gender);
    lastEl = el;

    await new Promise(r => setTimeout(r, 1300));
  }
    }
