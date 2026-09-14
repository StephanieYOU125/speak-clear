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
    "Give a concise work update.",
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

function insertAudienceGuides() {
  const zhPractice = document.getElementById('practice-zh')?.closest('.card');
  const enPractice = document.getElementById('practice-en')?.closest('.card');

  if (zhPractice) {
    const section = document.createElement('section');
    section.className = 'card audience-guide';
    section.innerHTML = `
      <h2>依對象調整：不是每個人都要聽一樣多</h2>
      <p><b>通用 Rule：</b>先想「這個人現在最需要知道什麼？」再決定講多少。不要把你知道的全部倒給對方。</p>
      <details open><summary>朋友｜Rule：先感受，再亮點</summary><p><b>對方最想知道：</b>你好不好玩、值不值得、最有趣的是什麼。<br><b>建議長度：</b>20–40 秒。<br><b>公式：</b>一句總評 → 1–2 個亮點 → 一個推薦。</p><p><b>簡明：</b>這次釜山我覺得很值得去。最喜歡海雲台和智慧城市展。如果你去，我會建議住 BEXCO 附近，移動最方便。</p></details>
      <details><summary>主管｜Rule：先結果，再風險，再下一步</summary><p><b>對方最想知道：</b>現在狀況、會不會出問題、你準備怎麼處理。<br><b>建議長度：</b>15–30 秒。<br><b>公式：</b>結果 → 風險／原因 → 下一步。</p></details>
      <details><summary>同事｜Rule：先講需要他做什麼</summary><p><b>建議長度：</b>10–20 秒。<br><b>公式：</b>請求 → 原因 → 時間。</p></details>
      <details><summary>教授／老師｜Rule：先講進度，再講卡點</summary><p><b>建議長度：</b>30–60 秒。<br><b>公式：</b>進度 → 卡點 → 明確問題。</p></details>
      <details><summary>家人｜Rule：先讓對方安心</summary><p><b>建議長度：</b>20–40 秒。<br><b>公式：</b>行程 → 時間 → 安全／聯絡。</p></details>
      <details><summary>伴侶／約會對象｜Rule：先說感受與需求，不要繞圈</summary><p><b>建議長度：</b>視情況，不需硬限時間。重要議題一次只談一件事。<br><b>公式：</b>感受 → 原因 → 需求／邀請。</p></details>
      <details><summary>陌生人／櫃台｜Rule：先講目的</summary><p><b>建議長度：</b>10–20 秒。<br><b>公式：</b>目的 → 問題 → 必要身分資訊。</p></details>
      <details><summary>公開發言／面試｜Rule：第一句就讓人知道答案</summary><p><b>建議長度：</b>30–90 秒。<br><b>公式：</b>答案 → 2 個理由 → 1 個例子。</p></details>
      <p><b>最後一個 Rule：</b>長度不是目的，清楚才是。能 15 秒說完就不要硬講到 60 秒。</p>
    `;
    zhPractice.insertAdjacentElement('beforebegin', section);
  }

  if (enPractice) {
    const section = document.createElement('section');
    section.className = 'card audience-guide';
    section.innerHTML = `
      <h2>Adjust to the listener</h2>
      <p><b>General rule:</b> Ask, “What does this person need to know first?” Do not give everything you know.</p>
      <details open><summary>Friend｜Rule: feeling first, then highlights</summary><p><b>Good length:</b> 20–40 seconds.<br><b>Structure:</b> Overall feeling → 1–2 highlights → one recommendation.</p></details>
      <details><summary>Manager｜Rule: result, risk, next step</summary><p><b>Good length:</b> 15–30 seconds.<br><b>Structure:</b> Result → risk/reason → next step.</p></details>
      <details><summary>Coworker｜Rule: say what you need first</summary><p><b>Good length:</b> 10–20 seconds.<br><b>Structure:</b> Request → reason → deadline.</p></details>
      <details><summary>Professor / Teacher｜Rule: progress, problem, question</summary><p><b>Good length:</b> 30–60 seconds.<br><b>Structure:</b> Progress → problem → clear question.</p></details>
      <details><summary>Family｜Rule: reassure first</summary><p><b>Good length:</b> 20–40 seconds.<br><b>Structure:</b> Plan → time → safety/contact.</p></details>
      <details><summary>Partner / Date｜Rule: feeling, reason, need</summary><p><b>Good length:</b> No fixed limit. For important topics, discuss one issue at a time.<br><b>Structure:</b> Feeling → reason → request/invitation.</p></details>
      <details><summary>Stranger / Service staff｜Rule: purpose first</summary><p><b>Good length:</b> 10–20 seconds.<br><b>Structure:</b> Purpose → question → necessary background.</p></details>
      <details><summary>Interview / Presentation｜Rule: answer in the first sentence</summary><p><b>Good length:</b> 30–90 seconds.<br><b>Structure:</b> Answer → two reasons → one example.</p></details>
      <p><b>Final rule:</b> Time is not the goal. Clarity is. If 15 seconds is enough, stop at 15 seconds.</p>
    `;
    enPractice.insertAdjacentElement('beforebegin', section);
  }
}
insertAudienceGuides();

function enhancePractice(lang) {
  const practice = document.getElementById(`practice-${lang}`);
  const card = practice?.closest('.card');
  const promptEl = document.getElementById(`prompt-${lang}`);
  if (!practice || !card || !promptEl) return;

  const heading = card.querySelector('h2');
  if (heading) heading.textContent = lang === 'zh' ? '簡明回答練習' : 'Concise answer practice';

  const controls = document.createElement('div');
  controls.className = 'practice-options';
  controls.innerHTML = lang === 'zh' ? `
    <label class="option-label">目標長度
      <select id="length-${lang}">
        <option value="10">10 秒｜一句結論</option>
        <option value="30" selected>30 秒｜結論＋理由</option>
        <option value="60">60 秒｜再加例子</option>
        <option value="free">不限時間｜依情境</option>
      </select>
    </label>
    <div class="length-tip" id="lengthTip-${lang}">30 秒：先講結論，再補 1–2 個理由。</div>
  ` : `
    <label class="option-label">Target length
      <select id="length-${lang}">
        <option value="10">10 sec｜answer only</option>
        <option value="30" selected>30 sec｜answer + reasons</option>
        <option value="60">60 sec｜add one example</option>
        <option value="free">No limit｜fit the situation</option>
      </select>
    </label>
    <div class="length-tip" id="lengthTip-${lang}">30 sec: answer first, then give 1–2 reasons.</div>
  `;
  promptEl.insertAdjacentElement('beforebegin', controls);

  const select = document.getElementById(`length-${lang}`);
  const tip = document.getElementById(`lengthTip-${lang}`);
  const lengthKey = `speakClearLength-${lang}`;
  const savedLength = localStorage.getItem(lengthKey);
  if (savedLength) select.value = savedLength;

  const tips = lang === 'zh' ? {
    '10': '10 秒：只講一句結論。適合快速回答。',
    '30': '30 秒：先講結論，再補 1–2 個理由。',
    '60': '60 秒：結論＋理由＋一個例子。',
    'free': '不限時間：依對象與情境決定，清楚就停。'
  } : {
    '10': '10 sec: give only the main answer.',
    '30': '30 sec: answer first, then give 1–2 reasons.',
    '60': '60 sec: answer + reasons + one example.',
    'free': 'No limit: match the listener and stop when the point is clear.'
  };
  function updateTip() {
    tip.textContent = tips[select.value];
    localStorage.setItem(lengthKey, select.value);
  }
  select.addEventListener('change', updateTip);
  updateTip();

  const saveBar = document.createElement('div');
  saveBar.className = 'answer-save-bar';
  saveBar.innerHTML = lang === 'zh' ? `
    <button type="button" id="saveAnswer-${lang}">儲存這次回答</button>
    <button type="button" id="showHistory-${lang}">查看已儲存</button>
    <span id="saveStatus-${lang}" class="save-status"></span>
  ` : `
    <button type="button" id="saveAnswer-${lang}">Save this answer</button>
    <button type="button" id="showHistory-${lang}">Saved answers</button>
    <span id="saveStatus-${lang}" class="save-status"></span>
  `;
  card.appendChild(saveBar);

  const historyBox = document.createElement('div');
  historyBox.className = 'answer-history';
  historyBox.id = `history-${lang}`;
  historyBox.hidden = true;
  card.appendChild(historyBox);

  const historyKey = `speakClearAnswerHistory-${lang}`;
  function getHistory() {
    try { return JSON.parse(localStorage.getItem(historyKey) || '[]'); }
    catch { return []; }
  }
  function renderHistory() {
    const items = getHistory();
    historyBox.innerHTML = '';
    if (!items.length) {
      historyBox.textContent = lang === 'zh' ? '還沒有已儲存的回答。' : 'No saved answers yet.';
      return;
    }
    items.slice().reverse().forEach((item, reverseIndex) => {
      const realIndex = items.length - 1 - reverseIndex;
      const wrap = document.createElement('div');
      wrap.className = 'saved-answer';
      const meta = document.createElement('div');
      meta.className = 'saved-meta';
      meta.textContent = `${item.date} · ${item.lengthLabel}`;
      const q = document.createElement('div');
      q.className = 'saved-question';
      q.textContent = item.prompt;
      const a = document.createElement('div');
      a.className = 'saved-text';
      a.textContent = item.answer;
      const actions = document.createElement('div');
      actions.className = 'saved-actions';
      const loadBtn = document.createElement('button');
      loadBtn.type = 'button';
      loadBtn.textContent = lang === 'zh' ? '載入修改' : 'Load & edit';
      loadBtn.addEventListener('click', () => {
        practice.value = item.answer;
        practice.dispatchEvent(new Event('input'));
        historyBox.hidden = true;
      });
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.textContent = lang === 'zh' ? '刪除' : 'Delete';
      delBtn.addEventListener('click', () => {
        const next = getHistory();
        next.splice(realIndex, 1);
        localStorage.setItem(historyKey, JSON.stringify(next));
        renderHistory();
      });
      actions.append(loadBtn, delBtn);
      wrap.append(meta, q, a, actions);
      historyBox.appendChild(wrap);
    });
  }

  document.getElementById(`saveAnswer-${lang}`).addEventListener('click', () => {
    const answer = practice.value.trim();
    const status = document.getElementById(`saveStatus-${lang}`);
    if (!answer) {
      status.textContent = lang === 'zh' ? '請先寫回答。' : 'Write an answer first.';
      return;
    }
    const history = getHistory();
    const lengthLabel = select.options[select.selectedIndex].textContent;
    history.push({
      prompt: promptEl.textContent,
      answer,
      length: select.value,
      lengthLabel,
      date: new Date().toLocaleString(lang === 'zh' ? 'zh-TW' : 'en-US', { hour12: false })
    });
    localStorage.setItem(historyKey, JSON.stringify(history.slice(-50)));
    status.textContent = lang === 'zh' ? '已儲存。' : 'Saved.';
    setTimeout(() => status.textContent = '', 1500);
  });

  document.getElementById(`showHistory-${lang}`).addEventListener('click', () => {
    renderHistory();
    historyBox.hidden = !historyBox.hidden;
  });
}

enhancePractice('zh');
enhancePractice('en');

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
document.getElementById('editModeBtn').addEventListener('click', () => { editMode = !editMode; applyEditMode(); });
applyEditMode();

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
  document.querySelectorAll('.collapse-btn').forEach(btn => { if (btn.textContent === '收合') btn.click(); });
});
document.getElementById('expandAllBtn').addEventListener('click', () => {
  document.querySelectorAll('.collapse-btn').forEach(btn => { if (btn.textContent === '展開') btn.click(); });
});

document.getElementById('resetEditsBtn').addEventListener('click', () => {
  if (!confirm('要還原所有直接編輯的文字嗎？「我的版本」、練習草稿與已儲存回答不會被刪除。')) return;
  Object.keys(localStorage).forEach(key => { if (key.startsWith('speakClearFlexible-')) localStorage.removeItem(key); });
  location.reload();
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
