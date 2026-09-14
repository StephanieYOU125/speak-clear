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

function insertAudienceGuides() {
  const zhPractice = document.getElementById('practice-zh')?.closest('.card');
  const enPractice = document.getElementById('practice-en')?.closest('.card');

  if (zhPractice) {
    const section = document.createElement('section');
    section.className = 'card audience-guide';
    section.innerHTML = `
      <h2>依對象調整：不是每個人都要聽一樣多</h2>
      <p><b>通用 Rule：</b>先想「這個人現在最需要知道什麼？」再決定講多少。不要把你知道的全部倒給對方。</p>
      <details open>
        <summary>朋友｜Rule：先感受，再亮點</summary>
        <p><b>對方最想知道：</b>你好不好玩、值不值得、最有趣的是什麼。<br><b>建議長度：</b>20–40 秒。<br><b>公式：</b>一句總評 → 1–2 個亮點 → 一個推薦。</p>
        <p><b>太長：</b>第一天早上我們先去車站，然後排隊買票，後來又去……<br><b>簡明：</b>這次釜山我覺得很值得去。最喜歡海雲台和智慧城市展。如果你去，我會建議住 BEXCO 附近，移動最方便。</p>
      </details>
      <details>
        <summary>主管｜Rule：先結果，再風險，再下一步</summary>
        <p><b>對方最想知道：</b>現在狀況、會不會出問題、你準備怎麼處理。<br><b>建議長度：</b>15–30 秒。<br><b>公式：</b>結果 → 風險／原因 → 下一步。</p>
        <p><b>簡明：</b>目前進度正常，但對方回覆慢一天。我今天下午會再確認；若仍未回覆，就改用書面通知。</p>
      </details>
      <details>
        <summary>同事｜Rule：先講需要他做什麼</summary>
        <p><b>對方最想知道：</b>要做什麼、為什麼、什麼時候前完成。<br><b>建議長度：</b>10–20 秒。<br><b>公式：</b>請求 → 原因 → 時間。</p>
        <p><b>簡明：</b>可以幫我確認這份名單嗎？下午要送出去，中午前回我就可以。</p>
      </details>
      <details>
        <summary>教授／老師｜Rule：先講進度，再講卡點</summary>
        <p><b>對方最想知道：</b>你做到哪裡、卡在哪裡、你想問什麼。<br><b>建議長度：</b>30–60 秒。<br><b>公式：</b>進度 → 卡點 → 明確問題。</p>
        <p><b>簡明：</b>目前第一版模型已經跑完，但軌跡雜訊還偏高。我想請教下一步應該先調追蹤參數，還是先做資料清理？</p>
      </details>
      <details>
        <summary>家人｜Rule：先讓對方安心</summary>
        <p><b>對方最想知道：</b>你去哪、什麼時候回來、是否安全。<br><b>建議長度：</b>20–40 秒。<br><b>公式：</b>行程 → 時間 → 安全／聯絡。</p>
        <p><b>簡明：</b>我會去釜山四天，主要是看展，週六晚上回台灣。住宿和交通都安排好了，到那邊我會再傳訊息。</p>
      </details>
      <details>
        <summary>伴侶／約會對象｜Rule：先說感受與需求，不要繞圈</summary>
        <p><b>對方最想知道：</b>你怎麼感受、你在意什麼、你希望接下來怎麼做。<br><b>建議長度：</b>30–60 秒；重要議題可以更長，但一次只談一件事。<br><b>公式：</b>感受 → 原因 → 需求／邀請。</p>
        <p><b>太繞：</b>我也不知道是不是我想太多，只是之前好像有一些事情……<br><b>簡明：</b>昨天你很久沒回訊息時，我有點不安。不是要你隨時回，而是如果你很忙，可以先跟我說一聲嗎？</p>
      </details>
      <details>
        <summary>陌生人／櫃台｜Rule：先講目的</summary>
        <p><b>對方最想知道：</b>你要辦什麼、缺什麼資訊。<br><b>建議長度：</b>10–20 秒。<br><b>公式：</b>目的 → 問題 → 必要身分資訊。</p>
        <p><b>簡明：</b>您好，我想辦理報到。請問需要準備哪些文件？我是今年秋季入學的國際學生。</p>
      </details>
      <details>
        <summary>公開發言／面試｜Rule：第一句就讓人知道答案</summary>
        <p><b>對方最想知道：</b>你的立場、能力、證據。<br><b>建議長度：</b>30–90 秒。<br><b>公式：</b>答案 → 2 個理由 → 1 個例子。</p>
        <p><b>簡明：</b>我認為我的優勢是現場判斷與跨單位協調。過去在大型勤務中，我需要在資訊不完整時快速確認風險，並協調不同單位執行。</p>
      </details>
      <p><b>最後一個 Rule：</b>先講 70%。如果對方有興趣，他會追問；被追問不是你沒講完整，而是代表你成功把重點講清楚。</p>
    `;
    zhPractice.insertAdjacentElement('beforebegin', section);
  }

  if (enPractice) {
    const section = document.createElement('section');
    section.className = 'card audience-guide';
    section.innerHTML = `
      <h2>Adjust to the listener</h2>
      <p><b>General rule:</b> Ask yourself, “What does this person need to know first?” Do not give everything you know.</p>
      <details open>
        <summary>Friend｜Rule: feeling first, then highlights</summary>
        <p><b>They want to know:</b> Was it fun? Was it worth it? What was the best part?<br><b>Good length:</b> 20–40 seconds.<br><b>Structure:</b> Overall feeling → 1–2 highlights → one recommendation.</p>
        <p><b>Clear example:</b> Busan was definitely worth the trip. My favorite parts were Haeundae and the smart city expo. If you go, I recommend staying near BEXCO.</p>
      </details>
      <details>
        <summary>Manager｜Rule: result, risk, next step</summary>
        <p><b>They want to know:</b> What is the status? Is there a risk? What will you do next?<br><b>Good length:</b> 15–30 seconds.<br><b>Structure:</b> Result → risk/reason → next step.</p>
        <p><b>Clear example:</b> The work is on track, but the reply is one day late. I will follow up this afternoon. If there is still no response, I will send a written notice.</p>
      </details>
      <details>
        <summary>Coworker｜Rule: say what you need first</summary>
        <p><b>They want to know:</b> What do you need from me, why, and by when?<br><b>Good length:</b> 10–20 seconds.<br><b>Structure:</b> Request → reason → deadline.</p>
        <p><b>Clear example:</b> Could you check this list for me? We need to send it this afternoon. Please send it back by noon.</p>
      </details>
      <details>
        <summary>Professor / Teacher｜Rule: progress, problem, question</summary>
        <p><b>They want to know:</b> What have you done? Where are you stuck? What do you want advice on?<br><b>Good length:</b> 30–60 seconds.<br><b>Structure:</b> Progress → problem → clear question.</p>
        <p><b>Clear example:</b> I finished the first model, but the trajectory noise is still high. Should I tune the tracking parameters first, or clean the data first?</p>
      </details>
      <details>
        <summary>Family｜Rule: reassure first</summary>
        <p><b>They want to know:</b> Where are you going, when will you return, and are you safe?<br><b>Good length:</b> 20–40 seconds.<br><b>Structure:</b> Plan → time → safety/contact.</p>
        <p><b>Clear example:</b> I am going to Busan for four days for an expo. I will be back Saturday night. My hotel and transportation are already arranged.</p>
      </details>
      <details>
        <summary>Partner / Date｜Rule: feeling, reason, need</summary>
        <p><b>They want to know:</b> How do you feel? What matters to you? What would help?<br><b>Good length:</b> 30–60 seconds for one issue.<br><b>Structure:</b> Feeling → reason → request/invitation.</p>
        <p><b>Clear example:</b> I felt a little worried when I did not hear from you yesterday. I do not need an immediate reply, but could you let me know when you are very busy?</p>
      </details>
      <details>
        <summary>Stranger / Service staff｜Rule: purpose first</summary>
        <p><b>They want to know:</b> What are you trying to do, and what information do you need?<br><b>Good length:</b> 10–20 seconds.<br><b>Structure:</b> Purpose → question → necessary background.</p>
        <p><b>Clear example:</b> Hello, I would like to complete my registration. Could you tell me which documents I need? I am an international student entering this fall.</p>
      </details>
      <details>
        <summary>Interview / Presentation｜Rule: answer in the first sentence</summary>
        <p><b>They want to know:</b> Your answer, evidence, and relevance.<br><b>Good length:</b> 30–90 seconds.<br><b>Structure:</b> Answer → two reasons → one example.</p>
        <p><b>Clear example:</b> My main strengths are field judgment and coordination. In large-scale operations, I often had to identify risks quickly and coordinate several teams under pressure.</p>
      </details>
      <p><b>Final rule:</b> Say about 70%, then stop. If the listener wants more, they will ask. A follow-up question is a good sign.</p>
    `;
    enPractice.insertAdjacentElement('beforebegin', section);
  }
}
insertAudienceGuides();

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
  if (!confirm('要還原所有直接編輯的文字嗎？「我的版本」與練習草稿不會被刪除。')) return;
  Object.keys(localStorage).forEach(key => { if (key.startsWith('speakClearFlexible-')) localStorage.removeItem(key); });
  location.reload();
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
