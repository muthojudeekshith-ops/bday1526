document.addEventListener("DOMContentLoaded", () => {

  /* ================= SCREEN FLOW ================= */

  const screens = document.querySelectorAll(".screen");

  function showScreen(id) {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // Interface 1 → 2
  document.getElementById("enterBtn").addEventListener("click", () => {
    showScreen("screen2");
  });

  // Interface 2 → 3
  document.getElementById("passBtn").addEventListener("click", () => {
    const pwd = document.getElementById("password").value;
    if (pwd === "c5d9") {
      showScreen("screen3");
    } else {
      alert("Wrong Password ❌");
    }
  });

  // Interface 3 → 4
  document.getElementById("warning").addEventListener("click", () => {
    setTimeout(() => {
      showScreen("screen4");
      startConversation();
    }, 3000);
  });

  /* ================= CONVERSATION DATA ================= */

  const conversation = [
    { who:"z1", audio:"audio/z1/1.mp3", text:"Hey pretty 👋🏻 .." },
    { who:"z2", audio:"audio/z2/1.mp3", text:"Hmm" },

    { who:"z1", audio:"audio/z1/2.mp3", text:"Happy Birthday my girl 👸🏻🐒💞" },
    { who:"z2", audio:"audio/z2/2.mp3", text:"Thank you 🫶🏻💘☺️" },

    { who:"z1", audio:"audio/z1/3.mp3", text:"hmmmm .." },
    { who:"z2", audio:"audio/z2/3.mp3", text:"hmm, Will you stay with me, until.." },

    { who:"z1", audio:"audio/z1/4.mp3", text:"Until ..? 😏" },
    { who:"z1", audio:"audio/z1/5.mp3", text:"Listen baby girl , I am not going anywhere by leaving you 🔐" },
    { who:"z1", audio:"audio/z1/6.mp3", text:"I'll stay withh you forever 💯" },

    { who:"z2", audio:"audio/z2/4.mp3", text:"Really .. ?" },

    { who:"z1", audio:"audio/z1/7.mp3", text:"Yeahh,  it is my promise chitti 👸🏻🫳🏻" },
    { who:"z2", audio:"audio/z2/5.mp3", text:"..☺️😘🙃..." },

    { who:"z1", audio:"audio/z1/8.mp3", text:"I love you chitti 💓🌹" },
    { who:"z2", audio:"audio/z2/6.mp3", text:"I love you too 💕" },

    { who:"z1", audio:"audio/z1/9.mp3", text:"Once again , happy birthday my girl 💞👸🏻" }
  ];

  /* ================= TYPE SYNC WITH AUDIO ================= */

  function typeWithAudio(el, text, audioPath) {
    el.innerHTML = "";
    el.style.opacity = 1;

    const words = text.split(" ");
    let index = 0;
    const audio = new Audio(audioPath);

    return new Promise(resolve => {
      audio.onloadedmetadata = () => {
        const totalTime = audio.duration * 1000;
        const delay = totalTime / words.length;

        audio.play();

        function nextWord() {
          if (index >= words.length) {
            resolve();
            return;
          }

          el.innerHTML += (index === 0 ? "" : " ") + words[index];
          index++;

          setTimeout(nextWord, delay);
        }

        nextWord();
      };
    });
  }

  function fadeOut(el) {
    el.style.opacity = 0;
  }

  /* ================= SEQUENTIAL ENGINE ================= */

  async function startConversation() {
    const z1 = document.getElementById("z1");
    const z2 = document.getElementById("z2");

    let lastEl = null;

    for (const msg of conversation) {
      const el = msg.who === "z1" ? z1 : z2;

      if (lastEl && lastEl !== el) {
        fadeOut(lastEl);
      }

      await typeWithAudio(el, msg.text, msg.audio);
      lastEl = el;

      // ⏱ gap between messages (1 second)
      await new Promise(r => setTimeout(r, 1000));
    }
  }

});

