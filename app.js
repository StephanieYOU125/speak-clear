const prompts = [
  "中文：今天你最重要的一件事是什麼？",
  "中文：如果主管問你『現在進度如何？』，你怎麼在 30 秒內回答？",
  "中文：請用三句話介紹你自己。",
  "English: What is the most important thing you need to do today?",
  "English: Give a 30-second work update.",
  "English: Introduce yourself in three short sentences.",
  "English: What problem are you facing now, and what do you suggest?",
  "English: Why do you want to do this? Answer first, then give two reasons.",
  "English: Tell your manager one thing that needs attention. Keep it under 30 seconds."
];

const promptEl = document.getElementById("prompt");
const practice = document.getElementById("practice");
const count = document.getElementById("charCount");

practice.addEventListener("input", () => {
  count.textContent = practice.value.length;
  localStorage.setItem("speakClearDraft", practice.value);
});

document.getElementById("newPrompt").addEventListener("click", () => {
  const p = prompts[Math.floor(Math.random() * prompts.length)];
  promptEl.textContent = "題目 / Prompt：" + p;
});

document.getElementById("clearBtn").addEventListener("click", () => {
  practice.value = "";
  count.textContent = "0";
  localStorage.removeItem("speakClearDraft");
});

document.getElementById("todayBtn").addEventListener("click", () => {
  document.getElementById("practice").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => practice.focus(), 500);
});

const saved = localStorage.getItem("speakClearDraft");
if (saved) {
  practice.value = saved;
  count.textContent = saved.length;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
