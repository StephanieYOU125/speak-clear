const prompts = {
  zh: [
    "今天你最重要的一件事是什麼？",
    "如果主管問你『現在進度如何？』，你怎麼在 30 秒內回答？",
    "請用三句話介紹你自己。",
    "最近遇到的一個問題是什麼？你建議怎麼處理？",
    "請說明一件你不同意的事情，先講結論。"
  ],
  en: [
    "What is the most important thing you need to do today?",
    "Give a 30-second work update.",
    "Introduce yourself in three short sentences.",
    "What problem are you facing now, and what do you suggest?",
    "Why do you want to do this? Answer first, then give two reasons."
  ]
};

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

function activateTab(lang) {
  tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === lang));
  tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === `tab-${lang}`));
  localStorage.setItem('speakClearLanguage', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
}

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

const savedLanguage = localStorage.getItem('speakClearLanguage') || 'zh';
activateTab(savedLanguage);

function setupPractice(lang) {
  const promptEl = document.getElementById(`prompt-${lang}`);
  const practice = document.getElementById(`practice-${lang}`);
  const count = document.getElementById(`charCount-${lang}`);
  const newPrompt = document.getElementById(`newPrompt-${lang}`);
  const clearBtn = document.getElementById(`clearBtn-${lang}`);
  const storageKey = `speakClearDraft-${lang}`;

  const saved = localStorage.getItem(storageKey);
  if (saved) {
    practice.value = saved;
    count.textContent = saved.length;
  }

  practice.addEventListener('input', () => {
    count.textContent = practice.value.length;
    localStorage.setItem(storageKey, practice.value);
  });

  newPrompt.addEventListener('click', () => {
    const p = prompts[lang][Math.floor(Math.random() * prompts[lang].length)];
    promptEl.textContent = lang === 'zh' ? `題目：${p}` : `Prompt: ${p}`;
  });

  clearBtn.addEventListener('click', () => {
    practice.value = '';
    count.textContent = '0';
    localStorage.removeItem(storageKey);
  });
}

setupPractice('zh');
setupPractice('en');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
