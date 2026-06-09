// ============================================================
// Extensions: Achievements, Daily Challenge, Comparison, Reasoning
// ============================================================

// ── 1) ACHIEVEMENTS / XP ─────────────────────────────────────
const ACH = (() => {
  const KEY = 'dp252_achievements_v1';
  const XP_KEY = 'dp252_xp_v1';

  function _read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch { return {}; }
  }
  function _save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  function _xp() {
    return parseInt(localStorage.getItem(XP_KEY) || '0', 10);
  }
  function _setXP(v) { localStorage.setItem(XP_KEY, String(v)); }

  function unlocked() { return _read(); }
  function totalXP() { return _xp(); }

  function award(achId) {
    const state = _read();
    if (state[achId]) return false;
    const ach = (window.ACHIEVEMENTS || []).find(a => a.id === achId);
    if (!ach) return false;
    state[achId] = Date.now();
    _save(state);
    _setXP(_xp() + (ach.xp || 0));
    toast(ach);
    return true;
  }

  function toast(ach) {
    const lang = window.LANG || 'ar';
    const el = document.createElement('div');
    el.className = 'ach-toast';
    el.innerHTML = `
      <div class="ach-toast-icon">${ach.icon}</div>
      <div class="ach-toast-body">
        <div class="ach-toast-label">${lang==='ar'?'إنجاز جديد!':'Achievement!'}</div>
        <div class="ach-toast-name">${ach.name[lang] || ach.name.en}</div>
        <div class="ach-toast-desc">${ach.desc[lang] || ach.desc.en}</div>
        <div class="ach-toast-xp">+${ach.xp} XP</div>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 500);
    }, 4500);
    if (window.FX) {
      const r = el.getBoundingClientRect();
      FX.confetti(r.left + r.width / 2, r.top + r.height / 2, 30);
    }
  }

  // Track pattern views
  function trackPatternView(id) {
    const key = 'dp252_viewed';
    const viewed = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    if (viewed.has(id)) return;
    viewed.add(id);
    localStorage.setItem(key, JSON.stringify([...viewed]));
    if (viewed.size === 1) award('first-pattern');
    if (viewed.size === 10) award('explorer');
  }

  function trackDeepDive() { award('deep-thinker'); }
  function trackQuizComplete() { award('quiz-novice'); }
  function trackPerfectQuiz() {
    const k = 'dp252_perfect_quizzes';
    const n = parseInt(localStorage.getItem(k) || '0', 10) + 1;
    localStorage.setItem(k, String(n));
    if (n >= 5) award('quiz-master');
  }
  function trackPracticeComplete() { award('practitioner'); }
  function trackNoteWritten(pid) {
    const key = 'dp252_noted';
    const n = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    n.add(pid);
    localStorage.setItem(key, JSON.stringify([...n]));
    if (n.size >= 3) award('note-taker');
  }
  function trackIdentifierUse() {
    const k = 'dp252_identifier_uses';
    const n = parseInt(localStorage.getItem(k) || '0', 10) + 1;
    localStorage.setItem(k, String(n));
    if (n >= 5) award('identifier-pro');
  }
  function trackTrialComplete() { award('exam-warrior'); }

  return {
    unlocked, totalXP, award, toast,
    trackPatternView, trackDeepDive, trackQuizComplete, trackPerfectQuiz,
    trackPracticeComplete, trackNoteWritten, trackIdentifierUse, trackTrialComplete
  };
})();
window.ACH = ACH;

// ── 2) DAILY CHALLENGE ───────────────────────────────────────
const DailyChallenge = (() => {
  const STREAK_KEY = 'dp252_streak';
  const LAST_KEY = 'dp252_last_dc';
  const SOLVED_KEY = 'dp252_dc_solved';

  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  }
  function isSolvedToday() {
    return localStorage.getItem(SOLVED_KEY) === todayString();
  }
  function streak() { return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10); }

  function markSolved() {
    const today = todayString();
    if (localStorage.getItem(SOLVED_KEY) === today) return;
    const last = localStorage.getItem(LAST_KEY);
    const yesterday = new Date(Date.now() - 86400000);
    const yString = `${yesterday.getFullYear()}-${yesterday.getMonth()+1}-${yesterday.getDate()}`;
    let s = streak();
    if (last === yString) s++; else s = 1;
    localStorage.setItem(STREAK_KEY, String(s));
    localStorage.setItem(LAST_KEY, today);
    localStorage.setItem(SOLVED_KEY, today);
    if (s >= 3) ACH.award('streak-3');
    if (s >= 7) ACH.award('streak-7');
    return s;
  }

  return { todayString, isSolvedToday, streak, markSolved };
})();
window.DailyChallenge = DailyChallenge;

// ── 3) Render the Daily Challenge widget on home ─────────────
function renderDailyChallenge(container) {
  const lang = window.LANG || 'ar';
  const challenge = window.getTodayChallenge ? window.getTodayChallenge() : null;
  if (!challenge || !container) return;
  const solved = DailyChallenge.isSolvedToday();
  const streak = DailyChallenge.streak();
  const t = (k) => (window.T && window.T[lang] && window.T[lang][k]) || k;
  const txt = (o) => o[lang] || o.en || o.ar || '';

  const options = (window.PATTERN_ORDER || []).slice();
  // shuffle deterministically by date
  const seed = new Date().getDate();
  options.sort((a, b) => ((a.charCodeAt(0) + seed) % 7) - ((b.charCodeAt(0) + seed) % 7));

  container.innerHTML = `
    <div class="dc-card">
      <div class="dc-header">
        <div>
          <div class="dc-label">🎯 ${lang==='ar'?'تحدّي اليوم':"Today's Challenge"}</div>
          <div class="dc-streak">${lang==='ar'?'سلسلة':'Streak'}: <span class="dc-streak-num">${streak}</span> 🔥</div>
        </div>
        ${solved?`<div class="dc-solved">${lang==='ar'?'✓ مكتمل اليوم':'✓ Solved today'}</div>`:''}
      </div>
      <div class="dc-scenario">${txt(challenge.scenario)}</div>
      ${!solved?`
        <div class="dc-options" id="dc-options">
          ${options.slice(0, 6).map(id => {
            const p = window.PATTERNS_DATA[id];
            return `<button class="dc-opt" data-answer="${id}">${p.name}</button>`;
          }).join('')}
        </div>`:`
        <div class="dc-revealed">
          ${lang==='ar'?'الإجابة الصحيحة':'Correct answer'}: <strong>${window.PATTERNS_DATA[challenge.answer]?.name}</strong>
        </div>`}
    </div>`;

  container.querySelectorAll('.dc-opt').forEach(b => {
    b.addEventListener('click', () => {
      const correct = b.dataset.answer === challenge.answer;
      container.querySelectorAll('.dc-opt').forEach(x => {
        if (x.dataset.answer === challenge.answer) x.classList.add('dc-correct');
        else if (x === b && !correct) x.classList.add('dc-wrong');
        x.disabled = true;
      });
      if (correct) {
        const newStreak = DailyChallenge.markSolved();
        const msg = document.createElement('div');
        msg.className = 'dc-success';
        msg.textContent = (lang==='ar'?'ممتاز! سلسلة ':'Nice! Streak ') + newStreak + ' 🔥';
        container.querySelector('.dc-card').appendChild(msg);
        if (window.FX) {
          const r = b.getBoundingClientRect();
          FX.confetti(r.left + r.width/2, r.top, 40);
        }
      } else {
        const msg = document.createElement('div');
        msg.className = 'dc-fail';
        msg.textContent = (lang==='ar'?'ليست هذي. الصحيحة: ':'Not quite. Correct: ') + window.PATTERNS_DATA[challenge.answer]?.name;
        container.querySelector('.dc-card').appendChild(msg);
      }
    });
  });
}
window.renderDailyChallenge = renderDailyChallenge;

// ── 4) Comparison page ───────────────────────────────────────
function renderComparison(app, idA, idB) {
  const lang = window.LANG || 'ar';
  const txt = (o) => o[lang] || o.en || o.ar || '';
  const tc = lang==='ar'?'ar':'';
  const dir = lang==='ar'?'rtl':'ltr';

  // find comparison
  let cmp = window.COMPARISONS.find(c =>
    (c.a === idA && c.b === idB) || (c.a === idB && c.b === idA));

  if (!cmp && !idA && !idB) cmp = window.COMPARISONS[0];

  // If swapped, reorder
  if (cmp && cmp.a !== idA && idA) {
    cmp = { ...cmp, a: cmp.b, b: cmp.a, points: cmp.points.map(p => ({ aspect: p.aspect, a: p.b, b: p.a })) };
  }

  const pickerHTML = `
    <div class="cmp-picker">
      <div class="cmp-picker-label">${lang==='ar'?'مقارنات شائعة':'Common Comparisons'}</div>
      <div class="cmp-picker-list">
        ${window.COMPARISONS.map(c => `
          <button class="cmp-pick-btn ${cmp && c.id===cmp.id?'active':''}" data-a="${c.a}" data-b="${c.b}">
            ${window.PATTERNS_DATA[c.a]?.name} ↔ ${window.PATTERNS_DATA[c.b]?.name}
          </button>
        `).join('')}
      </div>
    </div>`;

  if (!cmp) {
    app.innerHTML = `<div class="cmp-wrap">${pickerHTML}<p class="${tc}" style="text-align:center;padding:2rem;color:var(--ink-mid);direction:${dir}">${lang==='ar'?'اختر مقارنة من الأعلى':'Pick a comparison above'}</p></div>`;
    bindPicker();
    return;
  }

  const pA = window.PATTERNS_DATA[cmp.a];
  const pB = window.PATTERNS_DATA[cmp.b];

  app.innerHTML = `
    <div class="cmp-wrap fade-in">
      ${pickerHTML}
      <div class="cmp-title-row">
        <div class="cmp-pname" style="--g:var(--p-${cmp.a});">${pA.name}</div>
        <div class="cmp-vs">vs</div>
        <div class="cmp-pname" style="--g:var(--p-${cmp.b});">${pB.name}</div>
      </div>
      <div class="cmp-summary ${tc}" style="direction:${dir}">${txt(cmp.summary)}</div>
      <div class="cmp-table">
        <div class="cmp-row cmp-row-header">
          <div class="cmp-aspect">${lang==='ar'?'الجانب':'Aspect'}</div>
          <div class="cmp-cell cmp-cell-a">${pA.name}</div>
          <div class="cmp-cell cmp-cell-b">${pB.name}</div>
        </div>
        ${cmp.points.map(pt => `
          <div class="cmp-row">
            <div class="cmp-aspect ${tc}" style="direction:${dir}">${txt(pt.aspect)}</div>
            <div class="cmp-cell ${tc}" style="direction:${dir}">${txt(pt.a)}</div>
            <div class="cmp-cell ${tc}" style="direction:${dir}">${txt(pt.b)}</div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:0.6rem;justify-content:center;margin-top:1.5rem;">
        <button class="btn btn-outline btn-sm" data-goto="pattern/${cmp.a}/deepdive">${lang==='ar'?'تعمّق في':'Deep dive'} ${pA.name}</button>
        <button class="btn btn-outline btn-sm" data-goto="pattern/${cmp.b}/deepdive">${lang==='ar'?'تعمّق في':'Deep dive'} ${pB.name}</button>
      </div>
    </div>`;

  bindPicker();
  app.querySelectorAll('[data-goto]').forEach(el => el.addEventListener('click', () => window.go(el.dataset.goto)));

  function bindPicker() {
    app.querySelectorAll('.cmp-pick-btn').forEach(b => {
      b.addEventListener('click', () => {
        window.location.hash = `compare/${b.dataset.a}/${b.dataset.b}`;
      });
    });
  }
}
window.renderComparison = renderComparison;

// ── 5) Achievements gallery panel ────────────────────────────
function renderAchievements(app) {
  const lang = window.LANG || 'ar';
  const tc = lang==='ar'?'ar':'';
  const dir = lang==='ar'?'rtl':'ltr';
  const txt = (o) => o[lang] || o.en || o.ar || '';
  const unlocked = ACH.unlocked();
  const xp = ACH.totalXP();
  const total = (window.ACHIEVEMENTS || []).length;
  const earnedCount = Object.keys(unlocked).length;

  app.innerHTML = `
    <div class="ach-wrap fade-in">
      <div class="ach-header">
        <div>
          <h1 class="accent-grad" style="font-size:2.4rem;">${lang==='ar'?'إنجازاتي':'My Achievements'}</h1>
          <p style="color:var(--ink-mid);">${earnedCount} / ${total} · <span style="color:var(--accent-2);font-weight:700;">${xp} XP</span></p>
        </div>
        <div class="ach-xp-orb">
          <div class="ach-xp-num">${xp}</div>
          <div class="ach-xp-lbl">XP</div>
        </div>
      </div>
      <div class="ach-grid">
        ${window.ACHIEVEMENTS.map(a => {
          const got = !!unlocked[a.id];
          return `<div class="ach-card ${got?'ach-got':'ach-locked'}">
            <div class="ach-card-icon">${got?a.icon:'🔒'}</div>
            <div class="ach-card-name ${tc}" style="direction:${dir}">${txt(a.name)}</div>
            <div class="ach-card-desc ${tc}" style="direction:${dir}">${txt(a.desc)}</div>
            <div class="ach-card-xp">+${a.xp} XP</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}
window.renderAchievements = renderAchievements;
