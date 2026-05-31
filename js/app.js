// ============================================================
// CPIT 252 — Design Patterns Reference v2.1
// ============================================================

// ── i18n ─────────────────────────────────────────────────────
const T = {
  ar: {
    home:'الرئيسية', reference:'مرجع سريع', identifier:'محدد النمط', trial:'محاكاة الاختبار',
    overview:'نظرة عامة', structure:'الهيكل', code:'الكود', pitfalls:'الأخطاء الشائعة',
    quiz:'اختبار ذاتي', practice:'التدريب', notes:'ملاحظاتي',
    search:'بحث', searchPh:'ابحث عن نمط أو كلاس...',
    allPatterns:'جميع الأنماط', back:'رجوع', home2:'الرئيسية',
    intro:'شرح النمط', examples:'أمثلة من الواقع', comparisons:'مقارنات',
    ifYes:'إذا نعم', ifNo:'إذا لا',
    classD:'Class Diagram', howWorks:'كيف يعمل',
    play:'▶ تشغيل', pause:'⏸ إيقاف', reset:'↺ إعادة',
    methods:'Methods & Fields', fullCode:'الكود الكامل',
    commonMistakes:'الأخطاء الشائعة', wrong:'❌ خطأ', correct:'✓ صحيح',
    reason:'السبب',
    q:'سؤال', of:'من', check:'فحص', next:'التالي →', prev:'← السابق',
    seeResults:'عرض النتيجة', retry:'إعادة المحاولة',
    practiceLevel:'التدريب — المستوى', requiredFiles:'الملفات المطلوبة',
    checkCode:'فحص الكود', resetCode:'إعادة', solution:'الحل', showSol:'عرض الحل',
    allPassed:'✓ كل الفحوصات اجتازت', issues:'مشكلة',
    hintBtn:'💡 تلميح', hint:'تلميح', of2:'من',
    myNotes:'ملاحظاتي الشخصية لـ', savedAuto:'تُحفظ تلقائياً', saved:'✓ تم الحفظ',
    writeHere:'اكتب ملاحظاتك هنا...',
    analyzeBtn:'تحليل', analyzePh:'اكتب وصف المشكلة أو سيناريو السؤال هنا...',
    analyzeDesc:'اكتب وصف المشكلة أو السيناريو، وسيحدد لك الـ Design Pattern الأنسب مع شرح السبب.',
    noMatch:'لم يتم العثور على تطابق. أضف كلمات مثل: subscribe, factory, clone, adapter, singleton...',
    topMatch:'✓ الأنسب — ', matchWith:'تطابق مع: ', decisionQ:'سؤال القرار: ',
    printBtn:'طباعة', refDesc:'مرجع سريع للـ 10 أنماط — متى تستخدم كل نمط + الهيكل الأساسي',
    examSim:'CPIT 252 · محاكاة اختبار اللاب', mockExam:'محاكاة اختبار اللاب', 
    examDesc:'سؤالان عشوائيان / ساعتان — محاكاة كاملة للاختبار الحقيقي',
    instructions:'التعليمات',
    rules:['ساعتان — نفس مدة الاختبار الفعلي','سؤالان عشوائيان من بنك اللابات','تنقل حر بين السؤالين والملفات','فحص فوري مثل JUnit','زر View Solution للحل + خطوات التفكير'],
    startExam:'ابدأ الاختبار', cancel:'إلغاء', finishExam:'إنهاء الاختبار',
    viewSol:'View Solution', scenario:'السيناريو', required:'المطلوب',
    q1:'سؤال', tryAgain:'حاولة أخرى',
    perfect:'ممتاز!', strongPass:'اجتياز قوي', pass:'اجتياز', needsWork:'تحتاج مراجعة',
    resultMsg:{100:'أداء استثنائي — أنت جاهز للاختبار',75:'أداء ممتاز — راجع النقاط اللي فاتتك',50:'جيد — راجع الأنماط اللي تعثرت فيها',0:'ارجع للشرح وحاول مجدداً'},
    filesCompleted:'ملفات مكتملة', timeTaken:'الوقت المستغرق',
    level1:'مبتدئ', level2:'متوسط', level3:'متقدم', level4:'خبير',
    introductory:'Introductory', intermediate:'Intermediate', advanced:'Advanced', expert:'Expert',
    studyCarefully:'Solution shown — study it carefully',
    resetConfirm:'Reset to starter code?', showSolConfirm:'Show solution?',
    readOnly:'Read only', tab4:'Tab = 4 spaces',
    navTitle:'Design Patterns', cpit:'CPIT 252',
    overall:'إجمالي التقدم', patterns:'نمط', levels:'مستويات', labs:'لاب محاكاة',
    explanation:'شرح الإجابة',
    run:'▶ تشغيل', running:'⏳ جاري...', runAll:'▶ تشغيل الكود',
    aiTutor:'مساعد الأنماط', aiPlaceholder:'اكتب سؤالك...', aiWelcome:'مرحباً! سألني عن أي نمط أو اطلب مراجعة كودك.',
    aiPowered:'مدعوم بـ AI مجاني',
    deepDive:'تعمّق', theProblem:'المشكلة', theInsight:'الفكرة الجوهرية', howItWorks:'كيف يعمل خطوة بخطوة',
    pros:'المميزات', cons:'العيوب', useWhen:'استخدمه عندما', avoidWhen:'تجنّبه عندما',
    realExample:'مثال حقيقي معمّق', relations:'علاقات مع أنماط أخرى', mnemonic:'كلمة للحفظ',
    aiClear:'مسح', aiError:'خطأ في الشبكة',
  },
  en: {
    home:'Home', reference:'Reference', identifier:'Identifier', trial:'Mock Exam',
    overview:'Overview', structure:'Structure', code:'Code', pitfalls:'Pitfalls',
    quiz:'Quiz', practice:'Practice', notes:'Notes',
    search:'Search', searchPh:'Search patterns, classes...',
    allPatterns:'All Patterns', back:'Back', home2:'Home',
    intro:'Pattern Overview', examples:'Real-World Examples', comparisons:'Comparisons',
    ifYes:'If yes', ifNo:'If no',
    classD:'Class Diagram', howWorks:'How it works',
    play:'▶ Play', pause:'⏸ Pause', reset:'↺ Reset',
    methods:'Methods & Fields', fullCode:'Full Source Code',
    commonMistakes:'Common Mistakes', wrong:'❌ Wrong', correct:'✓ Correct',
    reason:'Why',
    q:'Question', of:'of', check:'Check', next:'Next →', prev:'← Prev',
    seeResults:'See Results', retry:'Retry',
    practiceLevel:'Practice — Level', requiredFiles:'Files',
    checkCode:'Check', resetCode:'Reset', solution:'Solution', showSol:'Solution',
    allPassed:'✓ All checks passed', issues:'issue',
    hintBtn:'💡 Hint', hint:'Hint', of2:'of',
    myNotes:'Your notes for', savedAuto:'Auto-saved', saved:'✓ Saved',
    writeHere:'Write your notes here...',
    analyzeBtn:'Analyze', analyzePh:'Describe the problem or exam scenario...',
    analyzeDesc:'Describe the problem scenario and the identifier will suggest the best Design Pattern with reasoning.',
    noMatch:'No match found. Try keywords: subscribe, factory, clone, adapter, singleton...',
    topMatch:'✓ Best match — ', matchWith:'Matched: ', decisionQ:'Decision: ',
    printBtn:'Print', refDesc:'Quick reference for all 10 patterns — when to use + structure',
    examSim:'CPIT 252 · Lab Exam Simulation', mockExam:'Mock Lab Exam',
    examDesc:'2 random questions / 2 hours — full simulation of the real exam',
    instructions:'Instructions',
    rules:['2 hours — same as the real exam','2 random questions from the lab bank','Navigate freely between questions and files','Instant code checking like JUnit','View Solution shows solution + reasoning'],
    startExam:'Start Exam', cancel:'Cancel', finishExam:'Finish Exam',
    viewSol:'View Solution', scenario:'Scenario', required:'Required',
    q1:'Question', tryAgain:'Try Again',
    perfect:'Perfect!', strongPass:'Strong Pass', pass:'Pass', needsWork:'Needs Work',
    resultMsg:{100:'Exceptional performance — you are ready.',75:'Great job — review any missed points.',50:'Good — review patterns you struggled with.',0:'Review the explanations and try again.'},
    filesCompleted:'Files Completed', timeTaken:'Time Taken',
    level1:'Beginner', level2:'Intermediate', level3:'Advanced', level4:'Expert',
    introductory:'Introductory', intermediate:'Intermediate', advanced:'Advanced', expert:'Expert',
    studyCarefully:'Solution shown — study it carefully',
    resetConfirm:'Reset to starter code?', showSolConfirm:'Show solution?',
    readOnly:'Read only', tab4:'Tab = 4 spaces',
    navTitle:'Design Patterns', cpit:'CPIT 252',
    overall:'Overall Progress', patterns:'Patterns', levels:'Levels', labs:'Mock Labs',
    explanation:'Explanation',
    run:'▶ Run', running:'⏳ Running...', runAll:'▶ Run Full Example',
    aiTutor:'Pattern Tutor', aiPlaceholder:'Ask a question...', aiWelcome:'Hi! Ask me anything about design patterns, or paste your code for review.',
    aiPowered:'Free AI powered',
    deepDive:'Deep Dive', theProblem:'The Problem', theInsight:'Key Insight', howItWorks:'How it works step-by-step',
    pros:'Pros', cons:'Cons', useWhen:'Use it when', avoidWhen:'Avoid it when',
    realExample:'Real-world deep example', relations:'Pattern relationships', mnemonic:'Memory aid',
    aiClear:'Clear', aiError:'Network error',
  }
};

let LANG = localStorage.getItem('dp252_lang') || 'ar';
let THEME = localStorage.getItem('dp252_theme') || 'dark';
function t(k) { return T[LANG][k] || T.ar[k] || k; }
function setLang(l) { LANG=l; localStorage.setItem('dp252_lang',l); document.documentElement.setAttribute('data-lang',l); document.documentElement.setAttribute('dir',l==='ar'?'rtl':'ltr'); document.documentElement.setAttribute('lang',l); App.buildNav(); App.route(); }
function setTheme(th) { THEME=th; localStorage.setItem('dp252_theme',th); document.documentElement.setAttribute('data-theme',th==='light'?'light':''); updateThemeBtn(); }
function updateThemeBtn() {
  const btn = document.getElementById('theme-btn');
  if (btn) btn.textContent = THEME==='light' ? '🌙' : '☀';
}

// ── Storage ── */
const Store = {
  get(k){try{return JSON.parse(localStorage.getItem('dp252v2_'+k));}catch{return null;}},
  set(k,v){try{localStorage.setItem('dp252v2_'+k,JSON.stringify(v));}catch{}}
};
function getProgress(pid){return Store.get('prog_'+pid)||{};}
function setProgress(pid,lvl,fi,done){const p=getProgress(pid);if(!p[lvl])p[lvl]={};p[lvl][fi]=done;Store.set('prog_'+pid,p);}
function patternProgress(pid){
  const p=getProgress(pid),pt=window.PATTERNS_DATA[pid];
  let total=0,done=0;
  for(const lvl of pt.levels){for(let i=0;i<lvl.files.length;i++){if(!lvl.files[i].readonly){total++;if(p[lvl.id]&&p[lvl.id][i])done++;}}}
  return{total,done,pct:total?Math.round(done/total*100):0};
}

// ── Utilities ── */
function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function hi(code){
  if(!code)return'';
  let h=esc(code);
  h=h.replace(/(\/\/[^\n]*)/g,'<span class="tk-c">$1</span>');
  h=h.replace(/(\/\*[\s\S]*?\*\/)/g,'<span class="tk-c">$1</span>');
  h=h.replace(/(&quot;[^&]*?&quot;)/g,'<span class="tk-s">$1</span>');
  h=h.replace(/(@\w+)(?![^<]*>)/g,'<span class="tk-a">$1</span>');
  h=h.replace(/\b(public|private|protected|static|final|abstract|class|interface|extends|implements|return|new|this|super|void|null|true|false|if|else|for|while|do|package|import|throws|throw|try|catch|finally|switch|case|break|continue)\b(?![^<]*>)/g,'<span class="tk-k">$1</span>');
  h=h.replace(/\b(String|Integer|Boolean|Double|Float|Long|Char|Object|List|ArrayList|HashMap|Map|Set|StringBuilder|Arrays|Collections|System|Thread|Runnable|ExecutorService|Executors|Character)\b(?![^<]*>)/g,'<span class="tk-t">$1</span>');
  h=h.replace(/\b(\d+\.?\d*)\b(?![^<]*>)/g,'<span class="tk-n">$1</span>');
  return h;
}

// ── Stars ── */
function initStars(){
  const c=document.getElementById('star-canvas');
  if(!c)return;
  const ctx=c.getContext('2d');
  let W,H,stars=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  function mk(){stars=Array.from({length:220},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+0.2,a:Math.random()*0.65+0.2,speed:Math.random()*0.45+0.1,phase:Math.random()*Math.PI*2}));}
  let t=0;
  function draw(){ctx.clearRect(0,0,W,H);t+=0.01;for(const s of stars){const alpha=s.a*(0.4+0.6*Math.sin(t*s.speed+s.phase));ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(180,200,255,${alpha})`;ctx.fill();}requestAnimationFrame(draw);}
  resize();mk();draw();
  window.addEventListener('resize',()=>{resize();mk();});
}

// ── Router ── */
let practiceState={fileIdx:0,level:1,code:{}};
let learnState={ci:0};
let flowState={step:0,playing:false,timer:null,total:0};
let quizState={qi:0,answers:[],revealed:[]};

const App={
  _currentPid: null,
  init(){
    if(THEME==='light') document.documentElement.setAttribute('data-theme','light');
    document.documentElement.setAttribute('data-lang',LANG);
    document.documentElement.setAttribute('dir',LANG==='ar'?'rtl':'ltr');
    document.documentElement.setAttribute('lang',LANG);
    this.buildNav();
    this.route();
    AITutor.init();
    window.addEventListener('hashchange',()=>this.route());
    window.addEventListener('scroll',()=>{
      const el=document.getElementById('scroll-prog');
      if(!el)return;
      const pct=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
      el.style.width=Math.min(pct,100)+'%';
    });
    document.addEventListener('keydown',e=>{
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();Palette.open();}
      if(e.key==='Escape')Palette.close();
    });
  },

  buildNav(){
    // navbar links
    document.getElementById('nav-home').textContent=t('home');
    document.getElementById('nav-ref').textContent=t('reference');
    document.getElementById('nav-id').textContent=t('identifier');
    document.getElementById('nav-trial').textContent=t('trial');
    document.getElementById('brand-name').textContent=t('navTitle');
    document.getElementById('brand-sub').textContent=t('cpit');
    const searchText=document.getElementById('search-text');
    if(searchText)searchText.textContent=t('search');
    updateThemeBtn();
    // lang btns
    document.querySelectorAll('.lang-btn').forEach(b=>{
      b.classList.toggle('active',b.dataset.l===LANG);
    });
  },

  route(){
    const h=decodeURIComponent(window.location.hash.slice(1))||'home';
    const p=h.split('/');
    // active nav
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    const active=document.querySelector(`.nav-link[data-route="${p[0]}"]`);
    if(active)active.classList.add('active');
    const app=document.getElementById('app');
    if(p[0]==='home'||!p[0]) renderHome(app);
    else if(p[0]==='pattern'&&p[1]) renderPattern(app,p[1],p[2]||'overview',p[3]);
    else if(p[0]==='identify') renderIdentifier(app);
    else if(p[0]==='reference') renderReference(app);
    else if(p[0]==='trial'){
      if(p[1]==='active') Trial.renderActive(app);
      else if(p[1]==='results') Trial.renderResults(app);
      else Trial.renderIntro(app);
    }
    else if(p[0]==='compare'){ window.renderComparison&&renderComparison(app,p[1],p[2]); }
    else if(p[0]==='achievements'){ window.renderAchievements&&renderAchievements(app); }
    else renderHome(app);
    window.scrollTo(0,0);
  }
};

function go(hash){window.location.hash=hash;}

// ── Home ── */
function renderHome(app){
  const overall=window.PATTERN_ORDER.reduce((acc,id)=>{const p=patternProgress(id);acc.done+=p.done;acc.total+=p.total;return acc;},{done:0,total:0});
  const overallPct=overall.total?Math.round(overall.done/overall.total*100):0;

  // Constellation: each pattern as floating bubble
  const constellation=window.PATTERN_ORDER.map((id,i)=>{
    const p=window.PATTERNS_DATA[id];
    const angle=(i/window.PATTERN_ORDER.length)*Math.PI*2 - Math.PI/2;
    const radius=42;
    const cx=50+Math.cos(angle)*radius;
    const cy=50+Math.sin(angle)*radius;
    const viz=(window.PatternViz&&window.PatternViz.mini)?window.PatternViz.mini(id):'';
    return`<button class="cn-node" data-goto="pattern/${id}/overview" style="left:${cx}%;top:${cy}%;--delay:${i*0.15}s;--pc-grad:var(--p-${id});" title="${p.name}">
      <div class="cn-bubble">${viz}</div>
      <div class="cn-name">${p.name}</div>
    </button>`;
  }).join('');

  // Connection lines (each node to center + adjacents)
  const lines=window.PATTERN_ORDER.map((id,i)=>{
    const a1=(i/window.PATTERN_ORDER.length)*Math.PI*2 - Math.PI/2;
    const x1=50+Math.cos(a1)*42;
    const y1=50+Math.sin(a1)*42;
    return`<line x1="50" y1="50" x2="${x1}" y2="${y1}" stroke="url(#cn-grad)" stroke-width="0.15" opacity="0.5"/>`;
  }).join('');

  // Cards grouped by category
  const byCat={Creational:[],Structural:[],Behavioral:[]};
  window.PATTERN_ORDER.forEach((id,i)=>{
    const p=window.PATTERNS_DATA[id];
    const cat=p.category||'Other';
    (byCat[cat]||(byCat[cat]=[])).push({id,p,i});
  });

  const catMeta={
    Creational:{ar:'إنشائية',icon:'⚙',color:'var(--p-singleton)',desc:{ar:'كيف نُنشئ الكائنات',en:'How objects are created'}},
    Structural:{ar:'هيكلية',icon:'⬢',color:'var(--p-adapter)',desc:{ar:'كيف نركّب الكائنات',en:'How objects compose'}},
    Behavioral:{ar:'سلوكية',icon:'⟲',color:'var(--p-observer)',desc:{ar:'كيف تتفاعل الكائنات',en:'How objects interact'}}
  };

  const cardHTML=(id,p,i)=>{
    const prog=patternProgress(id);
    const viz=(window.PatternViz&&window.PatternViz.mini)?window.PatternViz.mini(id):'';
    return`<div class="pattern-card" style="--pc:${p.color};--pc-grad:var(--p-${id});" data-goto="pattern/${id}/overview">
      <div class="pc-viz"><div class="mini-viz">${viz}</div></div>
      <div class="pc-top"><span class="pc-index">${String(i+1).padStart(2,'0')}</span><span class="pc-category">${p.category}</span></div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-name-ar ar">${LANG==='ar'?p.nameAr:''}</div>
      <div class="pc-desc ${textClass()}">${pShortDesc(id,p)}</div>
      <div class="pc-progress"><div class="pc-progress-fill" style="width:${prog.pct}%"></div></div>
      <div class="pc-progress-meta"><span>${prog.done}/${prog.total}</span><span>${prog.pct}%</span></div>
    </div>`;
  };

  const sections=Object.keys(byCat).filter(k=>byCat[k].length).map(cat=>{
    const meta=catMeta[cat]||{ar:cat,icon:'◆',color:'var(--grad-primary)',desc:{ar:'',en:''}};
    const catLabel=LANG==='ar'?meta.ar:cat;
    const catDesc=LANG==='ar'?meta.desc.ar:meta.desc.en;
    const items=byCat[cat].map(({id,p,i})=>cardHTML(id,p,i)).join('');
    return`<section class="cat-section fade-in" style="--cat-grad:${meta.color};">
      <div class="cat-header">
        <div class="cat-icon">${meta.icon}</div>
        <div>
          <h2 class="cat-title">${catLabel} <span class="cat-count">${byCat[cat].length}</span></h2>
          <div class="cat-desc ${textClass()}">${catDesc}</div>
        </div>
      </div>
      <div class="patterns-grid">${items}</div>
    </section>`;
  }).join('');

  app.innerHTML=`
  <div class="hero-cosmos fade-in">
    <div class="hero-content">
      <div class="hero-eyebrow"><span class="dot"></span>CPIT 252 · King Abdulaziz University</div>
      <h1 class="hero-title-big"><span class="accent-grad">Design Patterns</span><br><span class="hero-sub-title ${textClass()}">${LANG==='ar'?'كون الأنماط التفاعلي':'The Interactive Universe'}</span></h1>
      <p class="hero-sub ${textClass()}">${LANG==='ar'?'استكشف، تدرّب، وأتقن أنماط التصميم العشرة من خلال تجارب تفاعلية ممتعة':'Explore, practice, and master 10 design patterns through interactive, joyful experiences'}</p>
      <div class="hero-cta">
        <button class="btn btn-primary btn-lg" onclick="go('trial')">🚀 ${t('trial')}</button>
        <button class="btn btn-outline btn-lg" onclick="go('identify')">🎯 ${t('identifier')}</button>
        <button class="btn btn-outline btn-lg" onclick="go('reference')">📚 ${t('reference')}</button>
      </div>
    </div>
    <div class="constellation">
      <svg viewBox="0 0 100 100" class="cn-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="cn-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#8b7fff" stop-opacity="0.8"/>
            <stop offset="0.5" stop-color="#06d4ff" stop-opacity="0.6"/>
            <stop offset="1" stop-color="#ff5edb" stop-opacity="0.8"/>
          </linearGradient>
          <radialGradient id="cn-core">
            <stop offset="0" stop-color="#fff" stop-opacity="0.95"/>
            <stop offset="0.4" stop-color="#8b7fff" stop-opacity="0.7"/>
            <stop offset="1" stop-color="#8b7fff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        ${lines}
        <circle cx="50" cy="50" r="6" fill="url(#cn-core)"><animate attributeName="r" values="6;7.5;6" dur="3s" repeatCount="indefinite"/></circle>
        <circle cx="50" cy="50" r="2.5" fill="#fff"/>
      </svg>
      <button class="cn-core-click" id="cn-core-click" title="✨"></button>
      ${constellation}
    </div>
  </div>

  <div class="hero-stats hero-stats-big fade-in">
    <div class="hero-stat fx-tilt"><div class="hero-stat-num" data-target="10">0</div><div class="hero-stat-label ${textClass()}">${t('patterns')}</div></div>
    <div class="hero-stat fx-tilt"><div class="hero-stat-num" data-target="4">0</div><div class="hero-stat-label ${textClass()}">${t('levels')}</div></div>
    <div class="hero-stat fx-tilt"><div class="hero-stat-num" data-target="${window.TRIAL_LABS.length}">0</div><div class="hero-stat-label ${textClass()}">${t('labs')}</div></div>
    <div class="hero-stat fx-tilt"><div class="hero-stat-num" data-target="${overallPct}" data-suffix="%">0</div><div class="hero-stat-label ${textClass()}">${t('overall')}</div></div>
  </div>

  <div id="dc-container"></div>
  ${sections}`;
  app.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.goto)));
  app.querySelector('#cn-core-click')?.addEventListener('click',e=>{if(window.FX){const r=e.target.getBoundingClientRect();FX.confetti(r.left+r.width/2,r.top+r.height/2,80);}});
  setTimeout(()=>{window.FX&&FX.animateStats&&FX.animateStats();window.FX&&FX.magnetic&&FX.magnetic();window.FX&&FX.observeAll&&FX.observeAll();},80);
  window.renderDailyChallenge&&renderDailyChallenge(document.getElementById('dc-container'));
}

// ── Pattern Detail ── */
function renderPattern(app,id,tab,sub){
  const pattern=window.PATTERNS_DATA[id];
  const extras=(window.PATTERN_EXTRAS&&window.PATTERN_EXTRAS[id])||{};
  if(!pattern){go('home');return;}
  App._currentPid=id;
  window.ACH&&ACH.trackPatternView(id);
  const tabs=[
    {id:'overview',label:t('overview'),icon:'◎'},
    {id:'deepdive',label:t('deepDive'),icon:'🔍'},
    {id:'structure',label:t('structure'),icon:'⌘'},
    {id:'code',label:t('code'),icon:'</>'},
    {id:'pitfalls',label:t('pitfalls'),icon:'⚠',badge:extras.pitfalls?.length},
    {id:'quiz',label:t('quiz'),icon:'?',badge:extras.quiz?.length},
    {id:'practice',label:t('practice'),icon:'✎'},
    {id:'notes',label:t('notes'),icon:'✍'}
  ];
  const tabsHTML=tabs.map(tab2=>`<div class="tab ${tab===tab2.id?'active':''}" data-tab="${tab2.id}">
    <span style="font-family:var(--font-code);font-size:0.82em;opacity:0.7;">${tab2.icon}</span>
    <span>${tab2.label}</span>
    ${tab2.badge?`<span class="tab-badge">${tab2.badge}</span>`:''}
  </div>`).join('');
  app.innerHTML=`
  <div class="pd-wrap fade-in" style="--pd-color:${pattern.color};--pd-grad:var(--p-${id});">
    <div class="pd-header">
      <div class="pd-breadcrumb">
        <a onclick="go('home')">${t('home2')}</a>
        <span>/</span><span>${pattern.name}</span>
      </div>
      <div class="pd-title-row">
        <h1 class="pd-name">${pattern.name}</h1>
        ${LANG==='ar'?`<span class="pd-badge ar" style="color:${pattern.color};border-color:${pattern.color};">${pattern.nameAr}</span>`:''}
        <span class="pd-badge" style="color:var(--text-muted);border-color:var(--border);">${pattern.category}</span>
      </div>
      <div class="pd-tagline ${textClass()}" style="direction:${textDir()}">${pTagline(id,pattern)}</div>
    </div>
    <div class="tabs">${tabsHTML}</div>
    <div id="tab-content"></div>
  </div>`;
  app.querySelectorAll('[data-tab]').forEach(t2=>t2.addEventListener('click',()=>go(`pattern/${id}/${t2.dataset.tab}`)));
  if(flowState.timer){clearTimeout(flowState.timer);flowState.timer=null;flowState.playing=false;}
  if(tab==='overview')      renderOverview(id,pattern,extras);
  else if(tab==='deepdive') renderDeepDive(id,pattern);
  else if(tab==='structure') renderStructure(id,pattern,extras);
  else if(tab==='code')      renderCode(id,pattern);
  else if(tab==='pitfalls')  renderPitfalls(id,pattern,extras);
  else if(tab==='quiz')      renderQuiz(id,pattern,extras);
  else if(tab==='practice')  renderPractice(id,pattern,parseInt(sub)||1);
  else if(tab==='notes')     renderNotes(id,pattern);
}

// ── Overview ── */
// ── Content helpers ── */
function enC(id){ return (window.EN_CONTENT && window.EN_CONTENT[id]) || {}; }
function pIntro(id,pattern){
  if(LANG==='en'){const e=enC(id);return e.introEn||pattern.intro;}
  return pattern.intro;
}
function pTagline(id,pattern){
  if(LANG==='en'){const e=enC(id);return e.taglineEn||pattern.tagline||'';}
  return pattern.tagline||'';
}
function pShortDesc(id,pattern){
  if(LANG==='en'){const e=enC(id);return e.shortDescEn||pattern.shortDesc;}
  return pattern.shortDesc;
}
function clsDesc(id,clsIdx,cls){
  if(LANG==='en'){const e=enC(id);return (e.classes&&e.classes[clsIdx]&&e.classes[clsIdx].descEn)||cls.desc;}
  return cls.desc;
}
function clsRole(id,clsIdx,cls){
  if(LANG==='en'){const e=enC(id);return (e.classes&&e.classes[clsIdx]&&e.classes[clsIdx].roleEn)||cls.role||cls.roleAr;}
  return cls.roleAr;
}
function methodPurpose(id,clsIdx,mIdx,m){
  if(LANG==='en'){const e=enC(id);return (e.classes&&e.classes[clsIdx]&&e.classes[clsIdx].methods&&e.classes[clsIdx].methods[mIdx]&&e.classes[clsIdx].methods[mIdx].purposeEn)||m.purpose;}
  return m.purpose;
}
function textDir(){ return LANG==='en'?'ltr':'rtl'; }
function textClass(){ return LANG==='en'?'':'ar'; }

// EN_EXTRAS lookup: returns english override if available, else fallback
function exEN(id, key, idx){
  if(LANG!=='en'||!window.EN_EXTRAS||!window.EN_EXTRAS[id])return null;
  const e=window.EN_EXTRAS[id][key];
  if(!e)return null;
  return idx!=null?e[idx]:e;
}
// Get field value in current language with fallback to AR
function exField(id,key,idx,arField,fallback){
  if(LANG==='en'){
    const en=exEN(id,key,idx);
    if(en && en[arField]!==undefined) return en[arField];
    if(en && arField==='diff' && en.diff) return en.diff;
  }
  return fallback;
}

function renderOverview(id,pattern,extras){
  const tc=document.getElementById('tab-content');
  const dir=textDir(), tc2=textClass();
  const intro=pIntro(id,pattern);
  const examples=(extras.realWorldExamples||[]).map((ex,i)=>{
    const enEx=exEN(id,'realWorldExamples',i);
    const desc=(LANG==='en'&&enEx&&enEx.desc)||ex.desc;
    const where=(LANG==='en'&&enEx&&enEx.where)||ex.where;
    return`<li class="example-item">
      <div class="example-name">${ex.name}</div>
      <div class="example-desc ${tc2}" style="direction:${dir}">${desc}</div>
      <span class="example-where">${where}</span>
    </li>`;
  }).join('');
  const tree=extras.decisionTree;
  const treeEN=exEN(id,'decisionTree');
  const treeQ=(LANG==='en'&&treeEN&&treeEN.question)||(tree&&tree.question);
  const treeYes=(LANG==='en'&&treeEN&&treeEN.yes)||(tree&&tree.yes);
  const treeNo=(LANG==='en'&&treeEN&&treeEN.no)||(tree&&tree.no);
  const treeHTML=tree?`
    <div class="decision-card">
      <div class="decision-q ${tc2}" style="direction:${dir}">${treeQ}</div>
      <div class="decision-paths">
        <div class="decision-path yes"><div class="decision-path-label">${t('ifYes')}</div><div class="${tc2}" style="direction:${dir}">${treeYes}</div></div>
        <div class="decision-path no"><div class="decision-path-label">${t('ifNo')}</div><div class="${tc2}" style="direction:${dir}">${treeNo}</div></div>
      </div>
    </div>`:'';
  const comps=(extras.comparisons||[]).map((c,i)=>{
    const enC=exEN(id,'comparisons',i);
    const diff=(LANG==='en'&&enC&&enC.diff)||c.diff;
    return`<div class="comparison-row">
      <div class="comparison-with">vs ${c.with}</div>
      <div class="comparison-diff ${tc2}" style="direction:${dir}">${diff}</div>
    </div>`;
  }).join('');
  const viz=(window.PatternViz&&window.PatternViz.hero)?window.PatternViz.hero(id):{html:'',attach:()=>{}};
  const vizHTML=viz.html?`<div class="pd-hero-viz fade-in">${viz.html}</div>`:'';
  tc.innerHTML=`
    ${vizHTML}
    ${treeHTML}
    <div class="intro-card" style="margin-bottom:1.25rem;">
      <div class="card-title"><span style="font-family:var(--font-code);color:var(--accent-2);">i</span><span>${t('intro')}</span></div>
      <div class="${tc2}" style="direction:${dir}">${intro}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;" class="overview-grid-modern">
      <div class="card">
        <div class="card-title"><span style="color:var(--accent-3);">★</span><span>${t('examples')}</span></div>
        <ul style="list-style:none;padding:0;">${examples}</ul>
      </div>
      <div class="card">
        <div class="card-title"><span style="color:var(--accent-2);">⇄</span><span>${t('comparisons')}</span></div>
        <div>${comps}</div>
      </div>
    </div>`;
  if(viz.attach)setTimeout(()=>viz.attach(),50);
}

// ── Deep Dive ── */
function renderDeepDive(id,pattern){
  window.ACH&&ACH.trackDeepDive();
  const tc=document.getElementById('tab-content');
  const d=window.DEEP_DIVE&&window.DEEP_DIVE[id];
  const dir=textDir(), tc2=textClass();
  const lng=LANG;
  if(!d){
    tc.innerHTML=`<div class="card ${tc2}" style="direction:${dir};text-align:center;padding:3rem;color:var(--ink-mid);">
      ${lng==='ar'?'الشرح المتعمق قيد التحضير...':'Deep dive content coming soon...'}
    </div>`;
    return;
  }
  const txt=(o)=>o[lng]||o.ar||o.en||'';
  const list=(arr)=>arr.map(o=>`<li class="dd-li ${tc2}" style="direction:${dir}">${txt(o)}</li>`).join('');

  const mechHTML=d.mechanics.map((m,i)=>`
    <div class="dd-step">
      <div class="dd-step-num">${i+1}</div>
      <div class="dd-step-text ${tc2}" style="direction:${dir}">${txt(m)}</div>
    </div>`).join('');

  const relationsHTML=(d.relations||[]).map(r=>{
    const otherName=window.PATTERNS_DATA[r.withId]?.name||r.withId;
    return`<div class="dd-rel" data-goto="pattern/${r.withId}/deepdive">
      <div class="dd-rel-arrow">↔</div>
      <div>
        <div class="dd-rel-name">${otherName}</div>
        <div class="dd-rel-note ${tc2}" style="direction:${dir}">${txt(r.note)}</div>
      </div>
    </div>`;
  }).join('');

  tc.innerHTML=`
    <div class="dd-wrap fade-in">

      <div class="dd-mnemonic">
        <div class="dd-icon">${d.icon||'✦'}</div>
        <div>
          <div class="dd-mnemonic-label">${t('mnemonic')}</div>
          <div class="dd-mnemonic-text ${tc2}" style="direction:${dir}">${txt(d.mnemonic)}</div>
        </div>
      </div>

      <div class="dd-section dd-problem">
        <div class="dd-section-label"><span class="dd-section-icon">⚠</span>${t('theProblem')}</div>
        <div class="dd-section-body ${tc2}" style="direction:${dir}">${txt(d.problem)}</div>
      </div>

      <div class="dd-section dd-insight">
        <div class="dd-section-label"><span class="dd-section-icon">💡</span>${t('theInsight')}</div>
        <div class="dd-section-body ${tc2}" style="direction:${dir}">${txt(d.insight)}</div>
      </div>

      <div class="dd-section dd-mechanics">
        <div class="dd-section-label"><span class="dd-section-icon">⚙</span>${t('howItWorks')}</div>
        <div class="dd-steps">${mechHTML}</div>
      </div>

      <div class="dd-grid">
        <div class="dd-section dd-pros">
          <div class="dd-section-label dd-ok"><span class="dd-section-icon">✓</span>${t('pros')}</div>
          <ul class="dd-list">${list(d.pros)}</ul>
        </div>
        <div class="dd-section dd-cons">
          <div class="dd-section-label dd-err"><span class="dd-section-icon">✗</span>${t('cons')}</div>
          <ul class="dd-list">${list(d.cons)}</ul>
        </div>
      </div>

      <div class="dd-grid">
        <div class="dd-section dd-when">
          <div class="dd-section-label dd-ok"><span class="dd-section-icon">✓</span>${t('useWhen')}</div>
          <ul class="dd-list">${list(d.whenToUse)}</ul>
        </div>
        <div class="dd-section dd-avoid">
          <div class="dd-section-label dd-warn"><span class="dd-section-icon">⚠</span>${t('avoidWhen')}</div>
          <ul class="dd-list">${list(d.whenNotToUse)}</ul>
        </div>
      </div>

      ${d.realDeep?`<div class="dd-section dd-real">
        <div class="dd-section-label"><span class="dd-section-icon">🌍</span>${t('realExample')} — ${txt(d.realDeep.title)}</div>
        <div class="dd-section-body ${tc2}" style="direction:${dir};margin-bottom:0.8rem;">${txt(d.realDeep.scenario)}</div>
        <div class="code-block"><pre>${hi(d.realDeep.code)}</pre></div>
      </div>`:''}

      ${relationsHTML?`<div class="dd-section dd-relations">
        <div class="dd-section-label"><span class="dd-section-icon">🔗</span>${t('relations')}</div>
        <div class="dd-rels">${relationsHTML}</div>
      </div>`:''}

    </div>`;
  tc.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.goto)));
}

// ── Structure — Static SVG UML ── */
function renderStructure(id,pattern,extras){
  const tc=document.getElementById('tab-content');
  const uml=extras.umlStructure;
  const flow=extras.animatedFlow||[];
  const dir=textDir(), tc2=textClass();

  // ── Static UML class boxes ──
  let umlHTML='';
  if(uml&&uml.classes){
    const boxesHTML=uml.classes.map((cls,i)=>{
      const memberLines=cls.members.map(m=>{
        const icon=m.kind==='method'?'⊕':m.kind==='constructor'?'⊙':'◈';
        const color=m.kind==='method'?'var(--text-secondary)':m.kind==='constructor'?'var(--ok)':'var(--text-muted)';
        return`<div class="uml-member-row" style="color:${color}">
          <span style="opacity:0.6;font-family:var(--font-code);font-size:0.65rem;">${icon}</span>
          <span style="direction:ltr;font-family:var(--font-code);font-size:0.74rem;">${esc(m.name)}</span>
          ${m.sig?`<span style="opacity:0.4;font-size:0.62rem;font-family:var(--font-code);">{${m.sig}}</span>`:''}
        </div>`;
      }).join('');
      const typeLabel=cls.type==='abstract'?'«abstract»':cls.type==='interface'?'«interface»':cls.type==='static class'?'«static class»':'«class»';
      return`<div class="uml-box" id="uml-box-${id}-${i}" style="flex:1;min-width:180px;max-width:300px;">
        <div class="uml-box-header">
          <div style="font-family:var(--font-code);font-size:0.68rem;color:var(--accent);opacity:0.7;margin-bottom:2px;">${typeLabel}</div>
          <div class="uml-box-name">${cls.name}</div>
        </div>
        <div class="uml-box-sep"></div>
        <div class="uml-box-members" style="min-height:36px;">${memberLines}</div>
      </div>`;
    }).join('');

    // Relations as simple text badges
    const relBadges=(uml.relations||[]).map(r=>{
      const arrow=r.type==='inherit'?'◁─':r.type==='has'?'─◇':r.type==='creates'?'─▷':'──';
      return`<div style="display:inline-flex;align-items:center;gap:0.4rem;background:var(--surface3);border:1px solid var(--border);border-radius:4px;padding:0.18rem 0.6rem;font-family:var(--font-code);font-size:0.68rem;color:var(--text-muted);margin:0.25rem 0.2rem;">
        <span style="color:var(--accent);">${r.from}</span>
        <span>${arrow}</span>
        <span style="color:var(--text-muted);font-style:italic;">${r.label}</span>
        <span>──</span>
        <span style="color:var(--pd-color,var(--accent));">${r.to}</span>
      </div>`;
    }).join('');

    umlHTML=`<div class="uml-wrapper">
      <div class="uml-section-title">${t('classD')}</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center;margin-bottom:${relBadges?'1rem':'0'};">
        ${boxesHTML}
      </div>
      ${relBadges?`<div style="padding:0.75rem;background:var(--surface2);border-radius:var(--r-sm);border:1px solid var(--border);">
        <div style="font-family:var(--font-code);font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.5rem;">Relations</div>
        ${relBadges}
      </div>`:''}
    </div>`;
  }

  // ── Static Flow Steps + Relations Description ──
  const labelVerb={
    'implements':{ar:'يطبّق',en:'implements'},
    'inherits':{ar:'يرث من',en:'inherits from'},
    'extends':{ar:'يرث من',en:'extends'},
    'has':{ar:'يحتوي على',en:'has a'},
    'has-a':{ar:'يحتوي على',en:'has a'},
    'creates':{ar:'ينشئ',en:'creates'},
    'notifies':{ar:'يُبلّغ',en:'notifies'},
    'uses':{ar:'يستخدم',en:'uses'},
    'wraps':{ar:'يلفّ',en:'wraps'},
    'delegates':{ar:'يفوّض إلى',en:'delegates to'},
    'subscribes':{ar:'يشترك في',en:'subscribes to'},
    'observes':{ar:'يراقب',en:'observes'}
  };
  const typeVerb={
    inherit:{ar:'يرث من',en:'inherits from'},
    implement:{ar:'يطبّق',en:'implements'},
    has:{ar:'يحتوي على',en:'has a'},
    creates:{ar:'ينشئ',en:'creates'},
    notifies:{ar:'يُبلّغ',en:'notifies'},
    self:{ar:'مرجع ذاتي (يحتفظ بنسخة من نفسه)',en:'self-reference (holds itself)'}
  };
  const relExplain=uml&&uml.relations?uml.relations.map(r=>{
    if(r.type==='self'){
      const v=typeVerb.self[LANG==='en'?'en':'ar'];
      return`<div class="rel-line"><strong>${r.from}</strong> — ${v}</div>`;
    }
    const key=(r.label||'').toLowerCase().trim();
    const fromLabel=labelVerb[key];
    const fromType=typeVerb[r.type];
    const verb=(LANG==='en'?(fromLabel?.en||fromType?.en):(fromLabel?.ar||fromType?.ar))||r.label||'';
    return`<div class="rel-line"><strong>${r.from}</strong> ${verb} <strong>${r.to}</strong></div>`;
  }).join(''):'';

  const flowHTML=flow.length?`
    <div class="flow-container" style="margin-top:1.25rem;">
      <div class="uml-section-title" style="margin-bottom:0.8rem;">${t('howWorks')}</div>
      <div class="flow-steps">
        ${flow.map((s,i)=>{
          const enF=exEN(id,'animatedFlow',i);
          const stText=(LANG==='en'&&enF&&enF.text)||s.text;
          const stActor=(LANG==='en'&&enF&&enF.actor)||s.actor;
          return`<div class="flow-step flow-step-static">
            <div class="flow-step-num">${i+1}</div>
            <div>
              <div class="flow-step-text ${tc2}" style="direction:${dir}">${stText}</div>
              <div class="flow-step-actor">${stActor}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`:'';

  const relationsDescHTML=relExplain?`
    <div class="rel-desc">
      <div class="uml-section-title" style="margin-bottom:0.6rem;">${LANG==='ar'?'وصف العلاقات':'Relations'}</div>
      ${relExplain}
    </div>`:'';

  tc.innerHTML=umlHTML+flowHTML+relationsDescHTML;
  if(!flow.length)return;
  return;
  // eslint-disable-next-line no-unreachable
  flowState={step:0,playing:false,timer:null,total:flow.length};
  const goTo=(n)=>{
    flowState.step=((n%flow.length)+flow.length)%flow.length;
    document.querySelectorAll('.flow-step').forEach((el,i)=>el.classList.toggle('active',i===flowState.step));
    if(uml&&uml.classes){
      const actor=flow[flowState.step].actor.toLowerCase();
      uml.classes.forEach((cls,i)=>{
        const el=document.getElementById(`uml-box-${id}-${i}`);
        if(el)el.classList.toggle('highlight',actor.includes(cls.name.toLowerCase().split('.')[0].split(' ')[0]));
      });
    }
  };
  document.getElementById('flow-next')?.addEventListener('click',()=>goTo(flowState.step+1));
  document.getElementById('flow-prev')?.addEventListener('click',()=>goTo(flowState.step-1));
  document.getElementById('flow-reset')?.addEventListener('click',()=>{
    if(flowState.timer){clearTimeout(flowState.timer);flowState.timer=null;}
    flowState.playing=false;
    const btn=document.getElementById('flow-play');if(btn)btn.textContent=t('play');
    goTo(0);
  });
  document.getElementById('flow-play')?.addEventListener('click',()=>{
    const btn=document.getElementById('flow-play');
    if(flowState.playing){
      if(flowState.timer){clearTimeout(flowState.timer);flowState.timer=null;}
      flowState.playing=false;if(btn)btn.textContent=t('play');
    } else {
      flowState.playing=true;if(btn)btn.textContent=t('pause');
      const step=()=>{
        if(!flowState.playing)return;
        goTo(flowState.step+1);
        if(flowState.step===flow.length-1){flowState.playing=false;if(btn)btn.textContent=t('play');return;}
        flowState.timer=setTimeout(step,1800);
      };
      flowState.timer=setTimeout(step,1800);
    }
  });
  document.querySelectorAll('.flow-step').forEach(el=>el.addEventListener('click',()=>goTo(parseInt(el.dataset.step))));
  goTo(0);
}

// ── Code (Learn) ── */
function renderCode(id,pattern){
  const tc=document.getElementById('tab-content');
  learnState.ci=0;
  App._currentPid=id;
  const sidebar=pattern.classes.map((c,i)=>`
    <li class="learn-class-item ${i===0?'active':''}" data-ci="${i}">
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr;">${c.name}</span>
      <span class="learn-class-tag">${c.role.split(' ')[0].toLowerCase()}</span>
    </li>`).join('');
  tc.innerHTML=`
  <div class="learn-layout">
    <aside class="learn-sidebar">
      <div class="learn-sidebar-label">Classes</div>
      <ul class="learn-class-list">${sidebar}</ul>
    </aside>
    <main class="learn-content"><div id="class-detail"></div></main>
  </div>`;
  tc.querySelectorAll('.learn-class-item').forEach(item=>{
    item.addEventListener('click',()=>{
      learnState.ci=+item.dataset.ci;
      tc.querySelectorAll('.learn-class-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      showClassDetail(pattern);
    });
  });
  showClassDetail(pattern);
}
function showClassDetail(pattern){
  const id=App._currentPid;
  const ci=learnState.ci;
  const cls=pattern.classes[ci];
  const detail=document.getElementById('class-detail');
  const dir=textDir(), tc2=textClass();
  const methods=cls.methods.map((m,i)=>`
    <div class="method-block ${i===0?'open':''}" data-mi="${i}">
      <div class="method-header">
        <span class="method-chevron">▶</span>
        <span class="method-fn-name">${esc(m.name)}</span>
      </div>
      <div class="method-body">
        <div class="method-why ${tc2}" style="direction:${dir}">
          <strong>${LANG==='ar'?'لماذا؟':'Why?'}</strong> ${methodPurpose(id,ci,i,m)}
        </div>
        <div class="method-snippet">${hi(m.code)}</div>
      </div>
    </div>`).join('');
  detail.innerHTML=`
    <div class="class-name-heading">${cls.name}</div>
    <div class="class-role-badge">${clsRole(id,ci,cls)}</div>
    <div class="class-desc ${tc2}" style="direction:${dir}">${clsDesc(id,ci,cls)}</div>
    <div class="mini-title"><span>${t('methods')}</span></div>
    ${methods}
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1.5rem;margin-bottom:0.6rem;">
      <div class="mini-title" style="margin:0;flex:1;"><span>${t('fullCode')}</span></div>
      <button class="btn btn-outline btn-sm" id="run-all-btn" style="font-size:0.75rem;padding:0.25rem 0.7rem;flex-shrink:0;">${t('runAll')}</button>
    </div>
    <div class="code-block"><pre>${hi(cls.fullCode)}</pre></div>
    <div class="run-output" id="run-output" style="margin-top:0.5rem;"></div>`;
  detail.querySelectorAll('.method-header').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')));
  const runAllFiles=JavaRunner.filesFromPattern(pattern);
  detail.querySelector('#run-all-btn')?.addEventListener('click',()=>JavaRunner.run(runAllFiles,'run-output'));
}

// ── Pitfalls (FIXED) ── */
function renderPitfalls(id,pattern,extras){
  const tc=document.getElementById('tab-content');
  const pitfalls=extras.pitfalls||[];
  const comparisons=extras.comparisons||[];
  const dir=textDir(), tc2=textClass();

  const pitfallsHTML=pitfalls.map((p,i)=>{
    const enP=exEN(id,'pitfalls',i);
    const title=(LANG==='en'&&enP&&enP.title)||p.title;
    const reason=(LANG==='en'&&enP&&enP.reason)||p.reason;
    return`<div class="pitfall-card">
      <div class="pitfall-header">
        <div class="pitfall-icon">⚠</div>
        <div class="pitfall-title ${tc2}" style="direction:${dir}">${title}</div>
      </div>
      <div class="pitfall-body">
        <div class="pitfall-compare">
          <div>
            <div class="pitfall-label" style="color:var(--err);direction:ltr;text-align:left;">${t('wrong')}</div>
            <pre class="pitfall-bad">${esc(p.bad)}</pre>
          </div>
          <div>
            <div class="pitfall-label" style="color:var(--ok);direction:ltr;text-align:left;">${t('correct')}</div>
            <pre class="pitfall-good">${esc(p.good)}</pre>
          </div>
        </div>
        <div class="pitfall-reason ${tc2}" style="direction:${dir}">
          <strong>${t('reason')}:</strong> ${reason}
        </div>
      </div>
    </div>`;
  }).join('');

  const compHTML=comparisons.length?`
    <div class="mini-title" style="margin-top:2rem;"><span>${t('comparisons')}</span></div>
    ${comparisons.map((c,i)=>{
      const enC=exEN(id,'comparisons',i);
      const diff=(LANG==='en'&&enC&&enC.diff)||c.diff;
      return`<div class="comparison-row">
        <div class="comparison-with">vs ${c.with}</div>
        <div class="comparison-diff ${tc2}" style="direction:${dir}">${diff}</div>
      </div>`;
    }).join('')}`:'';

  tc.innerHTML=`
    <div class="mini-title"><span>${t('commonMistakes')}</span></div>
    ${pitfallsHTML}${compHTML}`;
}

// ── Quiz ── */
function renderQuiz(id,pattern,extras){
  const tc=document.getElementById('tab-content');
  const questions=extras.quiz||[];
  if(!questions.length){tc.innerHTML=`<p style="padding:2rem;text-align:center;color:var(--text-muted);">${LANG==='ar'?'لا يوجد اختبار متاح بعد.':'No quiz available yet.'}</p>`;return;}
  quizState={qi:0,answers:new Array(questions.length).fill(-1),revealed:new Array(questions.length).fill(false)};
  renderQQ(id,questions,tc);
}
function renderQQ(id,questions,tc){
  const qi=quizState.qi;const q=questions[qi];
  const revealed=quizState.revealed[qi];
  const letters=['A','B','C','D'];
  const dots=questions.map((_,i)=>{
    let cls='quiz-dot';
    if(i===qi)cls+=' current';
    else if(quizState.answers[i]!==-1)cls+=quizState.answers[i]===questions[i].correct?' answered':' wrong';
    return`<div class="${cls}" data-qi="${i}" style="cursor:pointer;"></div>`;
  }).join('');
  const isFinished=quizState.answers.every(a=>a!==-1);
  if(isFinished&&qi>=questions.length){
    const score=quizState.answers.reduce((s,a,i)=>s+(a===questions[i].correct?1:0),0);
    const pct=Math.round(score/questions.length*100);
    tc.innerHTML=`<div class="quiz-container"><div class="quiz-result">
      <div class="quiz-result-score" style="color:${pct>=80?'var(--ok)':pct>=50?'var(--warn)':'var(--err)'};">${score}/${questions.length}</div>
      <div class="quiz-result-text ar">${pct>=80?(LANG==='ar'?'ممتاز! فهمك قوي.':'Excellent! Strong understanding.'):pct>=50?(LANG==='ar'?'جيد — راجع ما غلطت فيه.':'Good — review incorrect answers.'):LANG==='ar'?'راجع شرح النمط وحاول مجدداً.':'Review the pattern and try again.'}</div>
      <div style="display:flex;gap:0.5rem;justify-content:center;">
        <button class="btn btn-primary btn-sm" id="quiz-retry">${t('retry')}</button>
        <button class="btn btn-outline btn-sm" onclick="go('pattern/${id}/pitfalls')">${t('pitfalls')} →</button>
      </div></div></div>`;
    tc.querySelector('#quiz-retry')?.addEventListener('click',()=>{quizState={qi:0,answers:new Array(questions.length).fill(-1),revealed:new Array(questions.length).fill(false)};renderQQ(id,questions,tc);});
    return;
  }
  const enQ=exEN(id,'quiz',qi);
  const qText=(LANG==='en'&&enQ&&enQ.q)||q.q;
  const qOptions=(LANG==='en'&&enQ&&enQ.options)||q.options;
  const qExplain=(LANG==='en'&&enQ&&enQ.explain)||q.explain;
  const opts=qOptions.map((opt,i)=>{
    let cls='quiz-option';
    if(revealed){if(i===q.correct)cls+=' correct';else if(i===quizState.answers[qi])cls+=' incorrect';}
    else if(quizState.answers[qi]===i)cls+=' selected';
    let whyHTML='';
    if(revealed){
      const why=q.whyEach&&q.whyEach[i];
      if(why){
        whyHTML=`<div class="quiz-option-why ${textClass()}" style="direction:${textDir()}">${why}</div>`;
      } else if(i===q.correct){
        whyHTML=`<div class="quiz-option-why ${textClass()}" style="direction:${textDir()}">✓ ${LANG==='ar'?'هذه الإجابة الصحيحة. ':'Correct answer. '}${qExplain||''}</div>`;
      } else {
        whyHTML=`<div class="quiz-option-why ${textClass()}" style="direction:${textDir()}">${LANG==='ar'?'هذا الخيار لا يطابق الشرح أعلاه.':"This doesn't match the reasoning above."}</div>`;
      }
    }
    return`<div class="${cls}" data-opt="${i}"><div style="display:flex;align-items:flex-start;gap:0.7rem;"><div class="quiz-option-letter">${letters[i]}</div><div style="flex:1;"><div class="quiz-option-text ${textClass()}" style="direction:${textDir()}">${opt}</div>${whyHTML}</div></div></div>`;
  }).join('');
  tc.innerHTML=`<div class="quiz-container">
    <div class="quiz-header">
      <div style="font-family:var(--font-code);font-size:0.78rem;color:var(--text-muted);">${t('q')} ${qi+1} / ${questions.length}</div>
      <div class="quiz-progress">${dots}</div>
    </div>
    <div class="quiz-question ${textClass()}" style="direction:${textDir()}">${qText}</div>
    <div class="quiz-options">${opts}</div>
    <div class="quiz-explain ${revealed?'show':''}" id="qe">
      <div class="quiz-explain-label">${t('explanation')}</div>
      <div class="${textClass()}" style="direction:${textDir()}">${qExplain}</div>
    </div>
    <div class="quiz-actions">
      <button class="btn btn-ghost btn-sm" id="qprev" ${qi===0?'disabled style="opacity:0.35"':''}>${t('prev')}</button>
      <div style="display:flex;gap:0.5rem;">
        ${!revealed&&quizState.answers[qi]!==-1?`<button class="btn btn-primary btn-sm" id="qcheck">${t('check')}</button>`:''}
        ${revealed?`<button class="btn btn-primary btn-sm" id="qnext">${qi<questions.length-1?t('next'):t('seeResults')}</button>`:''}
      </div>
    </div>
  </div>`;
  tc.querySelectorAll('.quiz-option').forEach(el=>el.addEventListener('click',()=>{if(revealed)return;quizState.answers[qi]=parseInt(el.dataset.opt);renderQQ(id,questions,tc);}));
  tc.querySelectorAll('.quiz-dot').forEach(d=>d.addEventListener('click',()=>{quizState.qi=parseInt(d.dataset.qi);renderQQ(id,questions,tc);}));
  tc.querySelector('#qcheck')?.addEventListener('click',e=>{
    quizState.revealed[qi]=true;
    const wasCorrect=quizState.answers[qi]===questions[qi].correct;
    // detect quiz fully completed
    const allDone=quizState.revealed.every(Boolean);
    if(allDone){
      window.ACH&&ACH.trackQuizComplete();
      const allCorrect=questions.every((q,i)=>quizState.answers[i]===q.correct);
      if(allCorrect)window.ACH&&ACH.trackPerfectQuiz();
    }
    renderQQ(id,questions,tc);
    if(wasCorrect&&window.FX){const r=e.target.getBoundingClientRect();FX.confetti(r.left+r.width/2,r.top,40);}
  });
  tc.querySelector('#qnext')?.addEventListener('click',()=>{qi<questions.length-1?quizState.qi++:quizState.qi=questions.length;renderQQ(id,questions,tc);});
  tc.querySelector('#qprev')?.addEventListener('click',()=>{if(qi>0){quizState.qi--;renderQQ(id,questions,tc);}});
}

// ── Practice ── */
const DIFF=[{en:'Introductory',ar:'مبتدئ',d:1},{en:'Intermediate',ar:'متوسط',d:2},{en:'Advanced',ar:'متقدم',d:3},{en:'Expert',ar:'خبير',d:4}];
function renderPractice(pid,pattern,levelId){
  practiceState.level=levelId;practiceState.fileIdx=0;
  const tc=document.getElementById('tab-content');
  const prog=getProgress(pid);
  const dbtns=DIFF.map(d=>{
    const lvl=pattern.levels[d.d-1];
    const ldone=prog[lvl.id]?Object.values(prog[lvl.id]).filter(Boolean).length:0;
    const ltotal=lvl.files.filter(f=>!f.readonly).length;
    return`<div class="diff-btn ${d.d===levelId?'active':''}" data-d="${d.d}" data-level="${d.d}">
      <div class="diff-dot"></div>
      <div><div class="diff-label">${d.en}</div><div class="diff-label-ar">${d.ar} · ${ldone}/${ltotal}</div></div>
    </div>`;
  }).join('');
  tc.innerHTML=`<div class="difficulty-selector">${dbtns}</div><div id="practice-body"></div>`;
  tc.querySelectorAll('.diff-btn').forEach(b=>b.addEventListener('click',()=>go(`pattern/${pid}/practice/${b.dataset.level}`)));
  renderLevelEditor(pid,pattern,levelId);
}
function renderLevelEditor(pid,pattern,levelId){
  const level=pattern.levels.find(l=>l.id===levelId);if(!level)return;
  const pb=document.getElementById('practice-body');
  const prog=getProgress(pid);
  const files=level.files.map((f,i)=>{
    const done=(prog[levelId]||{})[i];
    return`<div class="file-item ${i===practiceState.fileIdx?'active':''}" data-fi="${i}">
      <span class="file-icon">📄</span><span class="file-name">${f.name}</span>
      <span class="file-status ${done?'ok':'todo'}">${done?'✓':'·'}</span>
    </div>`;
  }).join('');
  pb.innerHTML=`
  <div class="task-card"><div class="task-card-title ar">Level ${levelId} · ${DIFF[levelId-1][LANG==='ar'?'ar':'en']}</div><div class="${textClass()}" style="direction:${textDir()}">${LANG==='en'&&level.taskEn?level.taskEn:level.task}</div></div>
  <div class="practice-wrap">
    <div class="file-panel"><div class="file-panel-title">Files</div>${files}</div>
    <div id="editor-wrap"></div>
  </div>`;
  pb.querySelectorAll('.file-item').forEach(fi=>fi.addEventListener('click',()=>{
    practiceState.fileIdx=+fi.dataset.fi;
    pb.querySelectorAll('.file-item').forEach(x=>x.classList.remove('active'));
    fi.classList.add('active');
    renderFileEditor(pid,pattern,level);
  }));
  renderFileEditor(pid,pattern,level);
}
function renderFileEditor(pid,pattern,level){
  const file=level.files[practiceState.fileIdx];
  const ew=document.getElementById('editor-wrap');
  const key=`${pid}-${level.id}-${practiceState.fileIdx}`;
  const saved=practiceState.code[key];
  const initial=saved!==undefined?saved:file.starter;
  const hints=file.checks?file.checks.map(c=>c.msg):[];
  const maxHints=Math.min(hints.length,3);
  let hintsShown=0;
  if(file.readonly){
    ew.innerHTML=`<div class="editor-container">
      <div class="editor-topbar"><span class="editor-filename">${file.name}</span><span class="editor-meta">${t('readOnly')}</span></div>
      <div class="code-block" style="border-radius:0 0 var(--r-md) var(--r-md);border-top:none;margin:0;"><pre>${hi(file.starter)}</pre></div>
    </div>`;return;
  }
  ew.innerHTML=`<div class="editor-container">
    <div class="editor-topbar"><span class="editor-filename">${file.name}</span><span class="editor-meta">${t('tab4')}</span></div>
    <textarea class="code-editor" id="ced" spellcheck="false">${esc(initial)}</textarea>
    <div class="editor-actions">
      <button class="btn btn-primary btn-sm" id="check-btn">${t('checkCode')}</button>
      <button class="btn btn-outline btn-sm" id="run-btn">${t('run')}</button>
      <button class="btn btn-outline btn-sm" id="reset-btn">${t('resetCode')}</button>
      <button class="btn btn-ghost btn-sm" id="sol-btn">${t('showSol')}</button>
    </div>
  </div>
  <div class="run-output" id="run-output"></div>
  <div class="feedback" id="fb"></div>
  <div class="hint-section">
    <button class="hint-btn" id="hint-btn">${t('hintBtn')} (0/${maxHints})</button>
    <div class="hint-box" id="hint-box"></div>
  </div>`;
  const ta=document.getElementById('ced');
  ta.addEventListener('input',()=>{practiceState.code[key]=ta.value;});
  ta.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();const s=ta.selectionStart,end=ta.selectionEnd;ta.value=ta.value.slice(0,s)+'    '+ta.value.slice(end);ta.selectionStart=ta.selectionEnd=s+4;practiceState.code[key]=ta.value;}});
  document.getElementById('check-btn').addEventListener('click',()=>{
    const errs=checkCode(file,ta.value);const fb=document.getElementById('fb');
    if(!errs.length){
      setProgress(pid,level.id,practiceState.fileIdx,true);
      const dot=document.querySelector(`.file-item[data-fi="${practiceState.fileIdx}"] .file-status`);
      if(dot){dot.textContent='✓';dot.className='file-status ok';}
      fb.className='feedback ok show';
      fb.innerHTML=`<div class="feedback-title ar">${t('allPassed')}</div>`;
      window.ACH&&ACH.trackPracticeComplete();
      if(hintsShown===0)window.ACH&&ACH.award('no-hints');
      if(window.FX){const r=document.getElementById('check-btn').getBoundingClientRect();FX.confetti(r.left+r.width/2,r.top,30);}
    } else {
      fb.className='feedback err show';
      fb.innerHTML=`<div class="feedback-title ar">⚠ ${errs.length} ${t('issues')}</div><ul class="feedback-list">${errs.map(e=>`<li class="ar">${e}</li>`).join('')}</ul>`;
    }
  });
  document.getElementById('run-btn').addEventListener('click',()=>{
    const files=JavaRunner.filesFromLevel(pid,level,practiceState.fileIdx,ta.value);
    JavaRunner.run(files,'run-output');
  });
  document.getElementById('reset-btn').addEventListener('click',()=>{if(!confirm(t('resetConfirm')))return;ta.value=file.starter;practiceState.code[key]=file.starter;document.getElementById('fb').className='feedback';});
  document.getElementById('sol-btn').addEventListener('click',()=>{if(!confirm(t('showSolConfirm')))return;ta.value=file.solution;practiceState.code[key]=file.solution;document.getElementById('fb').className='feedback ok show';document.getElementById('fb').innerHTML=`<div class="feedback-title ar">${t('studyCarefully')}</div>`;});
  document.getElementById('hint-btn').addEventListener('click',()=>{
    if(hintsShown>=maxHints)return;
    const hb=document.getElementById('hint-box');hb.className='hint-box show';
    hb.innerHTML+=`<div class="hint-line"><span class="hint-line-num">${t('hint')} ${hintsShown+1}</span> <span class="ar">${hints[hintsShown]||''}</span></div>`;
    hintsShown++;
    document.getElementById('hint-btn').textContent=`${t('hintBtn')} (${hintsShown}/${maxHints})`;
    if(hintsShown>=maxHints)document.getElementById('hint-btn').disabled=true;
  });
}
function checkCode(file,code){
  const errs=[];
  for(const c of(file.checks||[])){
    let pass=false;
    if(c.type==='contains')pass=code.includes(c.value);
    else if(c.type==='not_contains')pass=!code.includes(c.value);
    else if(c.type==='regex')pass=new RegExp(c.value,c.flags||'').test(code);
    if(!pass)errs.push(c.msg);
  }
  return errs;
}

// ── Notes ── */
function renderNotes(pid,pattern){
  const tc=document.getElementById('tab-content');
  const saved=Store.get('notes_'+pid)||'';
  const dir=textDir(),tc2=textClass();
  tc.innerHTML=`<div style="max-width:700px;">
    <p class="${tc2}" style="color:var(--text-secondary);font-size:0.87rem;margin-bottom:0.75rem;direction:${dir}">${t('myNotes')} <strong>${pattern.name}</strong> — ${t('savedAuto')}</p>
    <textarea class="notes-textarea" id="notes-ta" placeholder="${t('writeHere')}">${esc(saved)}</textarea>
    <div class="notes-save-indicator" id="notes-ind">${t('saved')}</div>
  </div>`;
  let timer;
  document.getElementById('notes-ta').addEventListener('input',e=>{
    clearTimeout(timer);
    timer=setTimeout(()=>{Store.set('notes_'+pid,e.target.value);const ind=document.getElementById('notes-ind');if(ind){ind.classList.add('show');setTimeout(()=>ind.classList.remove('show'),1400);}if(e.target.value.length>30)window.ACH&&ACH.trackNoteWritten(pid);},600);
  });
}

// ── Identifier ── */
function renderIdentifier(app){
  app.innerHTML=`<div class="identifier-wrap fade-in">
    <div class="section-header" style="padding:0;margin:0 0 1.5rem;"><span class="section-title">${t('identifier')}</span><span class="section-line"></span></div>
    <div class="identifier-input-card">
      <p class="${textClass()}" style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:0.75rem;line-height:1.65;direction:${textDir()}">${t('analyzeDesc')}</p>
      <textarea class="identifier-input" id="id-input" placeholder="${t('analyzePh')}"></textarea>
      <div style="margin-top:0.75rem;"><button class="btn btn-primary" id="id-analyze">${t('analyzeBtn')}</button></div>
    </div>
    <div id="id-results"></div>
    <div style="text-align:center;margin-top:1.5rem;"><button class="btn btn-ghost" onclick="go('home')">← ${t('back')}</button></div>
  </div>`;
  document.getElementById('id-analyze').addEventListener('click',()=>{
    const text=document.getElementById('id-input').value.trim().toLowerCase();
    if(!text)return;identifyPattern(text);
    window.ACH&&ACH.trackIdentifierUse();
  });
}
function identifyPattern(text){
  const results=[];
  for(const id of window.PATTERN_ORDER){
    const extras=window.PATTERN_EXTRAS[id];if(!extras)continue;
    const p=window.PATTERNS_DATA[id];
    let score=0;const matches=[];
    for(const kw of(extras.identifierKeywords||[])){if(text.includes(kw.toLowerCase())){score+=2;matches.push(kw);}}
    for(const ph of(extras.identifierPhrases||[])){if(text.includes(ph.toLowerCase())){score+=5;matches.push(ph);}}
    if(text.includes(p.name.toLowerCase()))score+=10;
    if(p.nameAr&&text.includes(p.nameAr))score+=10;
    if(score>0)results.push({id,name:p.name,nameAr:p.nameAr,color:p.color,score,matches,decisionTree:extras.decisionTree});
  }
  results.sort((a,b)=>b.score-a.score);
  const container=document.getElementById('id-results');
  if(!results.length){container.innerHTML=`<div class="identifier-input-card"><p class="${textClass()}" style="color:var(--text-muted);text-align:center;direction:${textDir()}">${t('noMatch')}</p></div>`;return;}
  container.innerHTML=results.slice(0,5).map((r,i)=>`
    <div class="identifier-result-card ${i===0?'top':''}" style="--rc:${r.color}" data-goto="pattern/${r.id}/overview">
      <div>
        <div class="identifier-result-name">${r.name} <span class="ar" style="font-size:0.82rem;color:var(--text-muted);font-weight:400;">${r.nameAr}</span></div>
        <div class="identifier-result-reason ${textClass()}" style="direction:${textDir()}">
          ${i===0?t('topMatch'):''}${t('matchWith')}${r.matches.slice(0,4).join(LANG==='ar'?'، ':', ')}
          ${r.decisionTree?`<br><strong>${t('decisionQ')}</strong>${r.decisionTree.question}`:''}
        </div>
      </div>
      <div class="identifier-result-score">${r.score} pts</div>
    </div>`).join('');
  container.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.goto)));
}

// ── Reference ── */
const QREF_DATA={
  singleton:{ar:'كائن واحد مشترك في كامل البرنامج',en:'One instance shared across the whole application',struct:['class Singleton {','  private static Singleton uniqueInstance;','  private Singleton() {}','  public static Singleton getInstance() {}','}']},
  prototype:{ar:'نسخ كائن موجود بدل بنائه من الصفر',en:'Clone an existing object instead of building from scratch',struct:['abstract class Shape {','  abstract Shape clone();','}','class Circle extends Shape {','  Circle(Circle t) { super(); this.r=t.r; }','  Shape clone() { return new Circle(this); }','}']},
  builder:{ar:'كائن بخصائص كثيرة — بعضها اختياري',en:'Object with many fields — some optional',struct:['class Car {','  private Car(Builder b) {}','  static class Builder {','    Builder withX() { return this; }','    Car build() { return new Car(this); }','  }','}']},
  factory:{ar:'إنشاء كائنات من interface واحد حسب string',en:'Create objects from one interface based on a string',struct:['interface Shape { void draw(); }','class ShapeFactory {','  Shape get(String type) {','    if (type.equalsIgnoreCase("circle"))','      return new Circle();','    return null;','  }','}']},
  adapter:{ar:'تشغيل interface قديم/خارجي في نظام جديد',en:'Make an old/external interface work in a new system',struct:['class Adapter implements Target {','  private Adaptee a;','  Adapter(Adaptee a) { this.a = a; }','  void request() { a.specificRequest(); }','}']},
  decorator:{ar:'إضافة ميزات لكائن وقت التشغيل (تتراكم)',en:'Add stacking features to an object at runtime',struct:['abstract class Decorator extends Base {','  Base component;','}','class ConcreteD extends Decorator {','  double cost() { return 0.5 + component.cost(); }','}']},
  flyweight:{ar:'آلاف كائنات متشابهة → توفير ذاكرة',en:'Thousands of similar objects → save memory',struct:['class Flyweight { /*shared state*/ }','class Factory {','  Map<String,Flyweight> map = new HashMap<>();','  Flyweight get(String key) {','    if (!map.containsKey(key))','      map.put(key, new Flyweight(key));','    return map.get(key);','  }','}']},
  proxy:{ar:'تحكم بالوصول لكائن (auth/cache/lazy)',en:'Control access to an object (auth/cache/lazy)',struct:['class Proxy implements Service {','  private Service real;','  Proxy(Service s) { this.real = s; }','  String op() {','    if (authorized()) return real.op();','    return null;','  }','}']},
  observer:{ar:'تبليغ عدة كائنات عند تغيير حالة',en:'Notify multiple objects when state changes',struct:['interface Observer { void update(String m); }','class Subject {','  List<Observer> list = new ArrayList<>();','  void subscribe(Observer o) { list.add(o); }','  void notifyAll(String m) {','    for (Observer o : list) o.update(m);','  }','}']},
  strategy:{ar:'خوارزميات متعددة قابلة للتبديل وقت التشغيل',en:'Multiple swappable algorithms at runtime',struct:['interface Strategy { void execute(); }','class Context {','  void run(Strategy s) { s.execute(); }','}']},
};
function QREF(id){const d=QREF_DATA[id];return d?{when:LANG==='ar'?d.ar:d.en,struct:d.struct}:null;}
function renderReference(app){
  const cards=window.PATTERN_ORDER.map((id,i)=>{
    const p=window.PATTERNS_DATA[id];const q=QREF(id);if(!q)return'';
    const lines=q.struct.map(l=>`<span class="qref-line">${esc(l).replace(/\b(class|interface|abstract|implements|extends|void|return|new|private|public|static|if|for)\b/g,'<span class="kw">$1</span>').replace(/\b(Map|List|ArrayList|HashMap|Observer|Strategy|Flyweight|Factory|Builder|Proxy|Adapter|Decorator|Singleton|Prototype|Shape|Service|Context|Subject|String)\b/g,'<span class="typ">$1</span>')}</span>`).join('');
    return`<div class="qref-card" style="--qc:${p.color}">
      <div class="qref-name"><span class="qref-name-num">${String(i+1).padStart(2,'0')}</span>${p.name}<span class="qref-name-ar ar">${p.nameAr}</span></div>
      <div class="qref-when ${textClass()}" style="direction:${textDir()}">${q.when}</div>
      <div class="qref-structure">${lines}</div>
    </div>`;
  }).join('');
  app.innerHTML=`<div style="max-width:1400px;margin:0 auto;padding:2rem 1.5rem;" class="fade-in">
    <div class="section-header" style="padding:0;margin:0 0 0.5rem;"><span class="section-title">${t('reference')}</span><span class="section-line"></span><button class="btn btn-outline btn-sm" onclick="window.print()">${t('printBtn')}</button></div>
    <p class="${textClass()}" style="color:var(--text-secondary);font-size:0.87rem;margin-bottom:1rem;direction:${textDir()}">${t('refDesc')}</p>
    <div class="qref-grid">${cards}</div>
    <div style="margin-top:1.5rem;text-align:center;"><button class="btn btn-ghost" onclick="go('home')">← ${t('back')}</button></div>
  </div>`;
}

// ── Command Palette ── */
const Palette={
  isOpen:false,
  open(){
    if(this.isOpen)return;this.isOpen=true;
    const overlay=document.createElement('div');
    overlay.className='palette-overlay';overlay.id='palette-overlay';
    overlay.innerHTML=`<div class="palette">
      <div class="palette-input-wrap">
        <span class="palette-search-icon">🔍</span>
        <input class="palette-input" id="palette-input" placeholder="${t('searchPh')}" autofocus>
        <span class="palette-kbd">Esc</span>
      </div>
      <div class="palette-results" id="palette-results"><div class="palette-empty ar">${LANG==='ar'?'ابدأ الكتابة...':'Start typing...'}</div></div>
      <div class="palette-footer"><div class="palette-footer-shortcuts">
        <div class="palette-footer-item"><span class="palette-kbd">↑↓</span> navigate</div>
        <div class="palette-footer-item"><span class="palette-kbd">↵</span> select</div>
        <div class="palette-footer-item"><span class="palette-kbd">Esc</span> close</div>
      </div></div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click',e=>{if(e.target===overlay)this.close();});
    const input=document.getElementById('palette-input');
    let selIdx=-1,items=[];
    input.addEventListener('input',()=>{selIdx=-1;items=this.search(input.value.trim());this.renderResults(items);});
    input.addEventListener('keydown',e=>{
      if(e.key==='ArrowDown'){e.preventDefault();selIdx=Math.min(selIdx+1,items.length-1);this.highlight(selIdx);}
      else if(e.key==='ArrowUp'){e.preventDefault();selIdx=Math.max(selIdx-1,0);this.highlight(selIdx);}
      else if(e.key==='Enter'&&items[selIdx]){go(items[selIdx].route);this.close();}
    });
    setTimeout(()=>input.focus(),40);
  },
  close(){this.isOpen=false;document.getElementById('palette-overlay')?.remove();},
  search(q){
    if(!q)return[];q=q.toLowerCase();const results=[];
    for(const id of window.PATTERN_ORDER){
      const p=window.PATTERNS_DATA[id];
      if(p.name.toLowerCase().includes(q)||p.nameAr.includes(q)||p.category.toLowerCase().includes(q)){results.push({title:p.name,meta:p.nameAr+' · '+p.category,route:`pattern/${id}/overview`,type:'pattern'});}
      for(const cls of p.classes){if(cls.name.toLowerCase().includes(q))results.push({title:cls.name,meta:`${p.name} · ${cls.role}`,route:`pattern/${id}/code`,type:'class'});}
    }
    for(const lab of window.TRIAL_LABS){if(lab.title.toLowerCase().includes(q)||lab.patternName.toLowerCase().includes(q))results.push({title:lab.title,meta:lab.patternName+' · Lab',route:'trial',type:'lab'});}
    return results.slice(0,12);
  },
  renderResults(items){
    const c=document.getElementById('palette-results');
    if(!items.length){c.innerHTML=`<div class="palette-empty ar">${LANG==='ar'?'لا توجد نتائج':'No results'}</div>`;return;}
    c.innerHTML=items.map((item,i)=>`
      <div class="palette-item" data-idx="${i}" data-route="${item.route}">
        <div class="palette-item-icon">${item.type==='pattern'?'◎':item.type==='class'?'{}':'⚡'}</div>
        <div><div class="palette-item-title">${item.title}</div><div class="palette-item-meta">${item.meta}</div></div>
      </div>`).join('');
    c.querySelectorAll('.palette-item').forEach(el=>el.addEventListener('click',()=>{go(el.dataset.route);this.close();}));
  },
  highlight(idx){
    document.querySelectorAll('.palette-item').forEach((el,i)=>el.classList.toggle('selected',i===idx));
    document.querySelector('.palette-item.selected')?.scrollIntoView({block:'nearest'});
  }
};

// ── Trial ── */
const Trial={
  s:{qs:[],qi:0,fi:0,fs:{},start:null,timer:null},
  renderIntro(app){
    this._stop();
    app.innerHTML=`<div class="trial-intro-page fade-in">
      <div class="eyebrow" style="text-align:center;margin-bottom:1.25rem;">${t('examSim')}</div>
      <h1 class="trial-intro-title accent-grad">${t('mockExam')}</h1>
      <p class="trial-intro-sub ar">${t('examDesc')}</p>
      <div class="trial-rules">
        <h3 class="${textClass()}" style="direction:${textDir()}">${t('instructions')}</h3>
        ${t('rules').map(r=>`<div class="trial-rule-item"><div class="trial-rule-dot"></div><div class="${textClass()}" style="direction:${textDir()}">${r}</div></div>`).join('')}
      </div>
      <div class="hero-cta">
        <button class="btn btn-primary btn-lg" id="start-btn">${t('startExam')}</button>
        <button class="btn btn-ghost btn-lg" onclick="go('home')">${t('cancel')}</button>
      </div>
    </div>`;
    document.getElementById('start-btn').addEventListener('click',()=>this._start());
  },
  _start(){
    const pool=[...window.TRIAL_LABS],picked=[],used=new Set();
    while(picked.length<2&&pool.length){const i=Math.floor(Math.random()*pool.length);const lab=pool.splice(i,1)[0];if(!used.has(lab.pattern)){picked.push(lab);used.add(lab.pattern);}}
    Object.assign(this.s,{qs:picked,qi:0,fi:0,fs:{},start:Date.now()});
    go('trial/active');
  },
  renderActive(app){
    if(!this.s.qs.length){go('trial');return;}
    this._stop();
    app.innerHTML=`
    <div class="trial-topbar">
      <div class="trial-timer" id="t-timer">⏱ 02:00:00</div>
      <div class="trial-q-switcher">
        ${this.s.qs.map((q,i)=>`<div class="trial-q-btn ${textClass()} ${i===this.s.qi?'active':''}" data-qi="${i}">${t('q1')} ${i+1} · ${q.patternName}</div>`).join('')}
      </div>
      <div style="display:flex;gap:0.4rem;">
        <button class="btn btn-outline btn-sm" id="sol-peek">${t('viewSol')}</button>
        <button class="btn btn-primary btn-sm" id="finish-btn">${t('finishExam')}</button>
      </div>
    </div>
    <div class="trial-body fade-in" id="t-body"></div>`;
    app.querySelectorAll('.trial-q-btn').forEach(b=>b.addEventListener('click',()=>{this.s.qi=+b.dataset.qi;this.s.fi=0;app.querySelectorAll('.trial-q-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');this._renderQ();}));
    document.getElementById('sol-peek').addEventListener('click',()=>this._showSol());
    document.getElementById('finish-btn').addEventListener('click',()=>{if(confirm(t('finishExam')+'?'))this._finish();});
    this._tick();this._renderQ();
  },
  _tick(){
    const upd=()=>{
      const el=document.getElementById('t-timer');if(!el){clearInterval(this.s.timer);return;}
      const rem=2*3600*1000-(Date.now()-this.s.start);
      if(rem<=0){el.textContent='⏱ 00:00:00';clearInterval(this.s.timer);this._finish(true);return;}
      const h=Math.floor(rem/3600000),m=Math.floor(rem%3600000/60000),sec=Math.floor(rem%60000/1000);
      el.textContent=`⏱ ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
      el.className='trial-timer'+(rem<600000?' danger':rem<1800000?' warn':'');
    };
    upd();this.s.timer=setInterval(upd,1000);
  },
  _stop(){if(this.s.timer){clearInterval(this.s.timer);this.s.timer=null;}},
  _renderQ(){
    const q=this.s.qs[this.s.qi];const p=window.PATTERNS_DATA[q.pattern];
    const body=document.getElementById('t-body');
    const files=q.starterFiles.map((f,i)=>{
      const key=`${this.s.qi}-${i}`;const done=this.s.fs[key]?.done;
      return`<div class="file-item ${i===this.s.fi?'active':''}" data-fi="${i}"><span class="file-icon">📄</span><span class="file-name">${f.name}</span><span class="file-status ${done?'ok':'todo'}">${done?'✓':'·'}</span></div>`;
    }).join('');
    body.innerHTML=`
    <div class="trial-scenario"><div class="trial-scenario-label">${t('scenario')}</div><div class="trial-scenario-text ar">${q.scenario}</div></div>
    <div class="trial-task"><div class="trial-task-label">${t('required')} · ${p.name}</div><div class="trial-task-text ar">${q.task}</div></div>
    <div class="practice-wrap">
      <div class="file-panel"><div class="file-panel-title">Files</div>${files}</div>
      <div id="t-editor"></div>
    </div>`;
    body.querySelectorAll('.file-item').forEach(fi=>fi.addEventListener('click',()=>{this.s.fi=+fi.dataset.fi;body.querySelectorAll('.file-item').forEach(x=>x.classList.remove('active'));fi.classList.add('active');this._renderEditor();}));
    this._renderEditor();
  },
  _renderEditor(){
    const q=this.s.qs[this.s.qi];const f=q.starterFiles[this.s.fi];
    const key=`${this.s.qi}-${this.s.fi}`;const code=this.s.fs[key]?.code??f.starter;
    const ed=document.getElementById('t-editor');
    ed.innerHTML=`<div class="editor-container">
      <div class="editor-topbar"><span class="editor-filename">${f.name}</span><span class="editor-meta">${t('q1')} ${this.s.qi+1} · ${this.s.fi+1}/${q.starterFiles.length}</span></div>
      <textarea class="code-editor" id="t-ta" spellcheck="false">${esc(code)}</textarea>
      <div class="editor-actions">
        <button class="btn btn-primary btn-sm" id="t-check">${t('checkCode')}</button>
        <button class="btn btn-outline btn-sm" id="run-btn">${t('run')}</button>
        <button class="btn btn-outline btn-sm" id="t-reset">${t('resetCode')}</button>
      </div>
    </div>
    <div class="run-output" id="run-output"></div>
    <div class="feedback" id="t-fb"></div>`;
    const ta=document.getElementById('t-ta');
    ta.addEventListener('input',()=>{if(!this.s.fs[key])this.s.fs[key]={};this.s.fs[key].code=ta.value;});
    ta.addEventListener('keydown',e=>{if(e.key!=='Tab')return;e.preventDefault();const s=ta.selectionStart,end=ta.selectionEnd;ta.value=ta.value.slice(0,s)+'    '+ta.value.slice(end);ta.selectionStart=ta.selectionEnd=s+4;if(!this.s.fs[key])this.s.fs[key]={};this.s.fs[key].code=ta.value;});
    document.getElementById('t-check').addEventListener('click',()=>{
      const errs=checkCode(f,ta.value);const fb=document.getElementById('t-fb');
      if(!errs.length){if(!this.s.fs[key])this.s.fs[key]={};this.s.fs[key].done=true;const dot=document.querySelector(`.file-item[data-fi="${this.s.fi}"] .file-status`);if(dot){dot.textContent='✓';dot.className='file-status ok';}fb.className='feedback ok show';fb.innerHTML=`<div class="feedback-title">${t('allPassed')}</div>`;}
      else{fb.className='feedback err show';fb.innerHTML=`<div class="feedback-title">⚠ ${errs.length} ${t('issues')}</div><ul class="feedback-list">${errs.map(e=>`<li class="ar">${e}</li>`).join('')}</ul>`;}
    });
    document.getElementById('run-btn').addEventListener('click',()=>{
      const files=q.starterFiles.map((sf,fi)=>({name:sf.name,content:fi===this.s.fi?ta.value:(this.s.fs[`${this.s.qi}-${fi}`]?.code??sf.starter)}));
      JavaRunner.run(files,'run-output');
    });
    document.getElementById('t-reset').addEventListener('click',()=>{if(!confirm(t('resetConfirm')))return;ta.value=f.starter;if(!this.s.fs[key])this.s.fs[key]={};this.s.fs[key].code=f.starter;document.getElementById('t-fb').className='feedback';});
  },
  _showSol(){
    const q=this.s.qs[this.s.qi];
    const modal=document.createElement('div');modal.className='modal-overlay';
    modal.innerHTML=`<div class="modal">
      <button class="modal-close">×</button>
      <div class="modal-title ar">Solution — ${q.title}</div>
      ${q.solutionSteps.map(st=>`<div class="solution-step"><div class="solution-step-title">${st.title}</div><div class="solution-step-body ar">${st.content}</div></div>`).join('')}
      <div class="mini-title" style="margin-top:1.5rem;"><span>Code</span></div>
      ${q.starterFiles.map(f=>`<div style="margin-bottom:1rem;"><div style="font-family:var(--font-code);font-size:0.73rem;color:var(--text-muted);margin-bottom:0.32rem;">${f.name}</div><div class="code-block"><pre>${hi(f.solution)}</pre></div></div>`).join('')}
    </div>`;
    document.body.appendChild(modal);
    const close=()=>modal.remove();
    modal.querySelector('.modal-close').addEventListener('click',close);
    modal.addEventListener('click',e=>{if(e.target===modal)close();});
  },
  _finish(){this._stop();go('trial/results');},
  renderResults(app){
    const qs=this.s.qs;if(!qs.length){go('trial');return;}
    window.ACH&&ACH.trackTrialComplete();
    let total=0,done=0;
    const details=qs.map((q,qi)=>{let qt=0,qd=0;q.starterFiles.forEach((f,fi)=>{qt++;total++;if(this.s.fs[`${qi}-${fi}`]?.done){qd++;done++;}});return{q,qt,qd};});
    const pct=total?Math.round(done/total*100):0;
    const elapsed=Date.now()-(this.s.start||Date.now());
    const em=Math.floor(elapsed/60000),es=Math.floor(elapsed%60000/1000);
    const dash=2*Math.PI*70;const fill=dash-(pct/100)*dash;
    const grade=pct===100?t('perfect'):pct>=75?t('strongPass'):pct>=50?t('pass'):t('needsWork');
    const msg=pct===100?t('resultMsg')[100]:pct>=75?t('resultMsg')[75]:pct>=50?t('resultMsg')[50]:t('resultMsg')[0];
    app.innerHTML=`<div class="results-page fade-in">
      <div class="results-ring"><svg viewBox="0 0 160 160"><circle class="ring-bg" cx="80" cy="80" r="70"/><circle class="ring-fill" cx="80" cy="80" r="70" style="stroke-dasharray:${dash};stroke-dashoffset:${fill};"/></svg><div class="results-pct">${pct}%</div></div>
      <h2 class="results-grade" style="color:var(--accent);">${grade}</h2>
      <p class="results-msg ar">${msg}</p>
      <div class="results-stats">
        <div class="results-stat-cell"><div class="results-stat-num">${done}/${total}</div><div class="results-stat-label ar">${t('filesCompleted')}</div></div>
        <div class="results-stat-cell"><div class="results-stat-num">${em}:${String(es).padStart(2,'0')}</div><div class="results-stat-label ar">${t('timeTaken')}</div></div>
      </div>
      ${details.map(d=>`<div style="background:var(--surface);border:1px solid ${d.qd===d.qt?'rgba(47,212,138,0.2)':'var(--border)'};border-radius:var(--r-md);padding:1rem 1.2rem;margin-bottom:0.5rem;display:flex;align-items:center;justify-content:space-between;">
        <div><div style="font-weight:700;font-size:0.9rem;">${d.q.title}</div><div class="ar" style="font-size:0.78rem;color:var(--text-muted);margin-top:0.2rem;">${d.q.patternName}</div></div>
        <div style="font-family:var(--font-code);font-size:1.22rem;color:${d.qd===d.qt?'var(--ok)':'var(--warn)'};">${d.qd}/${d.qt}</div>
      </div>`).join('')}
      <div class="hero-cta" style="margin-top:2rem;">
        <button class="btn btn-primary" id="retry-btn">${t('tryAgain')}</button>
        <button class="btn btn-outline" onclick="go('home')">${t('home')}</button>
      </div>
    </div>`;
    document.getElementById('retry-btn').addEventListener('click',()=>this._start());
  }
};

// ── Java Runner (Piston API) ── */
const JavaRunner={
  _start:null,
  async run(files,outputId='run-output'){
    const out=document.getElementById(outputId);if(!out)return;
    const btn=document.getElementById('run-btn')||document.getElementById('run-all-btn');
    const t0=Date.now();this._start=t0;
    if(btn){btn.disabled=true;btn.innerHTML=`<span class="run-btn-spin">⟳</span> ${t('running')}`;}
    out.className='run-output show loading';
    out.innerHTML=`${this._topbar(outputId)}<div class="run-body"><div class="run-line run-info">${LANG==='ar'?'⟳ جاري التصريف والتشغيل...':'⟳ Compiling and running...'}</div></div>`;
    try{
      const res=await fetch('https://emkc.org/api/v2/piston/execute',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({language:'java',version:'*',files:files.map(f=>({name:f.name,content:f.content}))})
      });
      if(this._start!==t0)return; // stale call
      const d=await res.json();
      const stdout=d.run?.stdout||'';
      const compileErr=d.compile?.stderr||'';
      const runtimeErr=d.run?.stderr||'';
      const exitCode=d.run?.code??(d.compile?.code??-1);
      const elapsed=((Date.now()-t0)/1000).toFixed(2);
      let body='';
      if(compileErr){
        body+=`<div class="run-line run-stderr" style="font-weight:600">${LANG==='ar'?'خطأ في التصريف:':'Compile error:'}</div>`;
        body+=compileErr.split('\n').filter(Boolean).slice(0,12).map(l=>`<div class="run-line run-stderr">${esc(l)}</div>`).join('');
      }
      if(stdout)body+=stdout.split('\n').filter(Boolean).map(l=>`<div class="run-line run-stdout">${esc(l)}</div>`).join('');
      if(!compileErr&&runtimeErr)body+=runtimeErr.split('\n').filter(Boolean).slice(0,8).map(l=>`<div class="run-line run-stderr">${esc(l)}</div>`).join('');
      if(!body)body=`<div class="run-line run-muted">${LANG==='ar'?'(لا توجد مخرجات)':'(no output)'}</div>`;
      const ok=exitCode===0&&!compileErr;
      out.className='run-output show';
      out.innerHTML=`${this._topbar(outputId)}<div class="run-body">${body}</div><div class="run-footer"><span class="run-time">${elapsed}s</span><span class="${ok?'run-exit-ok':'run-exit-err'}">exit ${exitCode} ${ok?'✓':'✗'}</span></div>`;
    }catch(e){
      if(this._start!==t0)return;
      out.className='run-output show';
      out.innerHTML=`${this._topbar(outputId)}<div class="run-body"><div class="run-line run-stderr">${LANG==='ar'?'خطأ في الشبكة — تحقق من الاتصال':'Network error — check your connection'}</div></div>`;
    }
    if(btn){btn.disabled=false;btn.textContent=t('run');}
  },
  _topbar(outputId){
    return`<div class="run-topbar"><div class="run-topbar-left"><div class="run-dots"><div class="run-dot"></div><div class="run-dot"></div><div class="run-dot"></div></div><span class="run-label">Output</span></div><button class="run-close-btn" onclick="document.getElementById('${outputId}').className='run-output'">×</button></div>`;
  },
  filesFromLevel(pid,level,activeIdx,activeCode){
    return level.files.map((f,i)=>{
      const key=`${pid}-${level.id}-${i}`;
      const content=i===activeIdx?activeCode:(practiceState.code[key]!==undefined?practiceState.code[key]:f.starter);
      return{name:f.name,content};
    });
  },
  filesFromPattern(pattern){
    return pattern.classes.filter(c=>c.fullCode).map(c=>{
      const m=c.fullCode.match(/(?:public\s+)?(?:(?:abstract|final)\s+)?(?:class|interface|enum)\s+(\w+)/);
      const name=(m?m[1]:c.name.replace(/\W/g,'').split('(')[0])+'.java';
      return{name,content:c.fullCode};
    });
  }
};

// ── AI Tutor ── */
const AITutor={
  history:[],
  isOpen:false,

  init(){
    const fab=document.createElement('button');
    fab.id='ai-fab';fab.innerHTML='🤖';fab.setAttribute('aria-label',t('aiTutor'));
    fab.addEventListener('click',()=>this.toggle());
    document.body.appendChild(fab);
  },

  toggle(){this.isOpen?this.close():this.open();},

  open(){
    this.isOpen=true;
    document.getElementById('ai-fab')?.classList.add('open');
    let panel=document.getElementById('ai-panel');
    if(!panel){panel=document.createElement('div');panel.id='ai-panel';document.body.appendChild(panel);}
    const patternName=App._currentPid?window.PATTERNS_DATA[App._currentPid]?.name:null;
    const msgsHTML=this.history.length===0
      ?`<div class="ai-msg ai-msg-bot"><div class="ai-bubble">${t('aiWelcome')}</div></div>`
      :this.history.map(m=>`<div class="ai-msg ${m.role==='user'?'ai-msg-user':'ai-msg-bot'}"><div class="ai-bubble">${m.role==='assistant'?this._renderText(m.content):esc(m.content)}</div></div>`).join('');
    panel.className='ai-panel open';
    panel.innerHTML=`
      <div class="ai-header">
        <div class="ai-header-left">
          <div class="ai-avatar">🤖</div>
          <div><div class="ai-title">${t('aiTutor')}</div>${patternName?`<div class="ai-ctx">${patternName}</div>`:''}</div>
        </div>
        <div style="display:flex;gap:0.3rem;align-items:center;">
          <button class="ai-hbtn" id="ai-clear-btn">${t('aiClear')}</button>
          <button class="ai-hbtn" id="ai-close-btn" style="font-size:1rem;padding:0.1rem 0.45rem;">×</button>
        </div>
      </div>
      <div class="ai-messages" id="ai-msgs">${msgsHTML}</div>
      <div class="ai-input-wrap" id="ai-input-wrap">
        <textarea class="ai-textarea" id="ai-in" placeholder="${t('aiPlaceholder')}" rows="1"></textarea>
        <button class="btn btn-primary ai-send" id="ai-send-btn">→</button>
      </div>`;
    document.getElementById('ai-close-btn').addEventListener('click',()=>this.close());
    document.getElementById('ai-clear-btn').addEventListener('click',()=>{this.history=[];this.open();});
    this._attachInput();
    this._scrollBottom();
  },

  close(){
    this.isOpen=false;
    document.getElementById('ai-fab')?.classList.remove('open');
    const p=document.getElementById('ai-panel');if(p)p.className='ai-panel';
  },

  _attachInput(){
    const inp=document.getElementById('ai-in');
    const btn=document.getElementById('ai-send-btn');
    if(!inp||!btn)return;
    const send=async()=>{
      const msg=inp.value.trim();if(!msg||btn.disabled)return;
      inp.value='';inp.style.height='';
      this._addMsg('user',msg);
      btn.disabled=true;
      this._addTyping();
      const reply=await this.send(msg);
      document.getElementById('ai-typing-msg')?.remove();
      this._addMsg('assistant',reply);
      btn.disabled=false;inp.focus();
    };
    btn.addEventListener('click',send);
    inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}});
    inp.addEventListener('input',()=>{inp.style.height='auto';inp.style.height=Math.min(inp.scrollHeight,100)+'px';});
    inp.focus();
  },

  _addMsg(role,content){
    const c=document.getElementById('ai-msgs');if(!c)return;
    const d=document.createElement('div');
    d.className=`ai-msg ${role==='user'?'ai-msg-user':'ai-msg-bot'}`;
    d.innerHTML=`<div class="ai-bubble">${role==='assistant'?this._renderText(content):esc(content)}</div>`;
    c.appendChild(d);this._scrollBottom();
  },

  _addTyping(){
    const c=document.getElementById('ai-msgs');if(!c)return;
    const d=document.createElement('div');d.id='ai-typing-msg';d.className='ai-msg ai-msg-bot ai-typing';
    d.innerHTML=`<div class="ai-bubble"><div class="ai-typing-dots"><span></span><span></span><span></span></div></div>`;
    c.appendChild(d);this._scrollBottom();
  },

  _scrollBottom(){const c=document.getElementById('ai-msgs');if(c)c.scrollTop=c.scrollHeight;},

  _renderText(text){
    return esc(text)
      .replace(/`([^`\n]+)`/g,'<code>$1</code>')
      .replace(/\n/g,'<br>');
  },

  async send(message){
    const patCtx=App._currentPid?`The student is currently viewing the ${window.PATTERNS_DATA[App._currentPid]?.name} pattern page.`:'';
    const sysmsg=`You are a concise, helpful tutor for CPIT 252 Design Patterns at King Abdulaziz University. Patterns covered: Singleton, Prototype, Builder, Factory, Adapter, Decorator, Flyweight, Proxy, Observer, Strategy (Java). ${patCtx} Keep answers short (3-5 lines max) unless code is needed. Use \`backticks\` for code snippets. Match the student's language (Arabic or English).`;
    const msgs=[
      {role:'system',content:sysmsg},
      ...this.history.slice(-12),
      {role:'user',content:message}
    ];
    try{
      const res=await fetch('https://text.pollinations.ai/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:msgs,model:'openai'})
      });
      if(!res.ok){
        const errBody=await res.text().catch(()=>'');
        return(LANG==='ar'?'خطأ: ':'Error: ')+res.status+(errBody?' — '+errBody.slice(0,120):'');
      }
      const reply=await res.text();
      this.history.push({role:'user',content:message},{role:'assistant',content:reply});
      if(this.history.length>24)this.history=this.history.slice(-24);
      return reply;
    }catch(e){return(LANG==='ar'?'خطأ في الشبكة: ':'Network error: ')+e.message;}
  }
};

// ── Init ── */
document.addEventListener('DOMContentLoaded',()=>App.init());
