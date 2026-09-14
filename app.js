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

function activateTab(tab) {
  tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
  tabPanels.forEach(panel => panel.classList.toggle('active', panel.id === `tab-${tab}`));
  localStorage.setItem('speakClearTab', tab);
  document.documentElement.lang = tab === 'en' ? 'en' : 'zh-Hant';
}

tabButtons.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
activateTab(localStorage.getItem('speakClearTab') || 'zh');

function setupPractice(lang) {
  const promptEl = document.getElementById(`prompt-${lang}`);
  const practice = document.getElementById(`practice-${lang}`);
  const count = document.getElementById(`charCount-${lang}`);
  const newPrompt = document.getElementById(`newPrompt-${lang}`);
  const clearBtn = document.getElementById(`clearBtn-${lang}`);
  const storageKey = `speakClearDraft-${lang}`;
  const saved = localStorage.getItem(storageKey);
  if (saved) { practice.value = saved; count.textContent = saved.length; }
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

document.querySelectorAll('.editable-phrase').forEach(area => {
  const key = `speakClearPhrase-${area.dataset.key}`;
  const saved = localStorage.getItem(key);
  if (saved !== null) area.value = saved;
  area.addEventListener('input', () => localStorage.setItem(key, area.value));
});

const customPhrases = document.getElementById('custom-phrases');
if (customPhrases) {
  const customKey = 'speakClearCustomPhrases';
  const saved = localStorage.getItem(customKey);
  if (saved !== null) customPhrases.value = saved;
  customPhrases.addEventListener('input', () => {
    localStorage.setItem(customKey, customPhrases.value);
    const note = document.getElementById('save-note');
    if (note) {
      note.textContent = '已自動儲存';
      clearTimeout(window.speakClearSaveTimer);
      window.speakClearSaveTimer = setTimeout(() => note.textContent = '內容會自動儲存。', 1200);
    }
  });
}

// Flexible mode: edit almost all guide text without changing code.
const flexBar = document.createElement('div');
flexBar.className = 'flex-toolbar';
flexBar.innerHTML = `
  <button type="button" id="editModeBtn">✏️ 編輯模式</button>
  <button type="button" id="collapseAllBtn">收合全部</button>
  <button type="button" id="expandAllBtn">展開全部</button>
  <button type="button" id="resetEditsBtn" class="danger-lite">還原文字</button>
`;
document.querySelector('.tabs').insertAdjacentElement('afterend', flexBar);

const editableSelector = [
  '.card h2', '.card p', '.card li', '.card summary', '.formula', '.example',
  '.phrase-card h3', '.phrase-card p', '.phrase-card .usage', '.phrase-card .example-box'
].join(',');
const editableNodes = [...document.querySelectorAll(editableSelector)];
editableNodes.forEach((el, index) => {
  const panel = el.closest('.tab-panel');
  const tab = panel ? panel.id.replace('tab-', '') : 'global';
  const key = `speakClearFlexible-${tab}-${index}`;
  el.dataset.flexKey = key;
  const saved = localStorage.getItem(key);
  if (saved !== null) el.innerHTML = saved;
  el.addEventListener('input', () => localStorage.setItem(key, el.innerHTML));
});

let editMode = localStorage.getItem('speakClearEditMode') === 'true';
function applyEditMode() {
  document.body.classList.toggle('edit-mode', editMode);
  editableNodes.forEach(el => el.contentEditable = editMode ? 'true' : 'false');
  const btn = document.getElementById('editModeBtn');
  btn.textContent = editMode ? '✅ 完成編輯' : '✏️ 編輯模式';
  localStorage.setItem('speakClearEditMode', String(editMode));
}
document.getElementById('editModeBtn').addEventListener('click', () => {
  editMode = !editMode;
  applyEditMode();
});
applyEditMode();

// Each major card can be collapsed independently.
const collapsibleCards = [...document.querySelectorAll('.card, .phrase-card')];
collapsibleCards.forEach((card, index) => {
  const heading = card.querySelector('h2, h3');
  if (!heading) return;
  const key = `speakClearCollapsed-${index}`;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'collapse-btn';
  toggle.textContent = '收合';
  heading.insertAdjacentElement('afterend', toggle);
  const originalChildren = [...card.children].filter(child => child !== heading && child !== toggle);
  function setCollapsed(collapsed) {
    card.classList.toggle('collapsed', collapsed);
    originalChildren.forEach(child => child.hidden = collapsed);
    toggle.textContent = collapsed ? '展開' : '收合';
    localStorage.setItem(key, String(collapsed));
  }
  setCollapsed(localStorage.getItem(key) === 'true');
  toggle.addEventListener('click', () => setCollapsed(!card.classList.contains('collapsed')));
});

document.getElementById('collapseAllBtn').addEventListener('click', () => {
  document.querySelectorAll('.collapse-btn').forEach(btn => {
    if (btn.textContent === '收合') btn.click();
  });
});
document.getElementById('expandAllBtn').addEventListener('click', () => {
  document.querySelectorAll('.collapse-btn').forEach(btn => {
    if (btn.textContent === '展開') btn.click();
  });
});

document.getElementById('resetEditsBtn').addEventListener('click', () => {
  if (!confirm('要還原所有直接編輯的文字嗎？「我的版本」與練習草稿不會被刪除。')) return;
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('speakClearFlexible-')) localStorage.removeItem(key);
  });
  location.reload();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
