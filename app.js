
const prompts = [
  "今天你最重要的一件事是什麼？",
  "如果主管問你『現在進度如何？』，你怎麼在 30 秒內回答？",
  "請用三句話介紹你自己。",
  "最近遇到的一個問題是什麼？你建議怎麼處理？",
  "請說明一件你不同意的事情，先講結論。",
  "如果朋友問你『為什麼想做這件事？』，請用 3 句回答。"
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
  promptEl.textContent = "題目：" + p;
});
document.getElementById("clearBtn").addEventListener("click", () => {
  practice.value = "";
  count.textContent = "0";
  localStorage.removeItem("speakClearDraft");
});
document.getElementById("todayBtn").addEventListener("click", () => {
  document.getElementById("practice").scrollIntoView({behavior:"smooth"});
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
