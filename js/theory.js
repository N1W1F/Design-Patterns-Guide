// ============================================================
// THEORY section renderer — separate tab covering all 23 patterns
// Routes:
//   #theory                  → hub (big picture + 23 patterns grid)
//   #theory/pattern/<id>     → single pattern (intent, when, principle,
//                              keyword, how it works, limitations, 6 scenarios)
//   #theory/scenarios        → interactive scenario trainer
//   #theory/compare          → differentiate confusable patterns
//   #theory/smells           → code smells & fixes
//   #theory/mvc              → MVC
//   #theory/cheatsheet       → quick reference table
// ============================================================

const Theory = {
  // pick ar/en text from a {ar,en} object
  tx(o){ if(!o) return ''; return (LANG==='en' ? (o.en||o.ar) : (o.ar||o.en)) || ''; },
  dir(){ return LANG==='en'?'ltr':'rtl'; },
  tc(){ return LANG==='en'?'':'ar'; },

  all(){ return window.THEORY_PATTERNS||[]; },
  byId(id){ return this.all().find(p=>p.id===id); },
  catLabel(key){
    const m={Creational:{ar:'إنشائية',en:'Creational'},Structural:{ar:'هيكلية',en:'Structural'},Behavioral:{ar:'سلوكية',en:'Behavioral'}};
    return LANG==='ar'?(m[key]?.ar||key):key;
  },

  route(app, p){
    const sub=p[1];
    if(sub==='pattern'&&p[2]) this.renderPattern(app,p[2]);
    else if(sub==='scenarios') this.renderScenarios(app);
    else if(sub==='compare') this.renderCompare(app);
    else if(sub==='smells') this.renderSmells(app);
    else if(sub==='mvc') this.renderMVC(app);
    else if(sub==='cheatsheet') this.renderCheatsheet(app);
    else this.renderHub(app);
  },

  // ── shared sub-nav for theory pages ──
  subnav(active){
    const items=[
      {k:'',ar:'الرئيسية',en:'Overview',icon:'🗺️'},
      {k:'scenarios',ar:'مدرّب السيناريوهات',en:'Scenario Trainer',icon:'🎯'},
      {k:'compare',ar:'التفريق',en:'Differentiate',icon:'⚖️'},
      {k:'smells',ar:'روائح الكود',en:'Code Smells',icon:'🔍'},
      {k:'mvc',ar:'MVC',en:'MVC',icon:'🏛️'},
      {k:'cheatsheet',ar:'ورقة مرجعية',en:'Cheat Sheet',icon:'📋'}
    ];
    return `<div class="th-subnav">${items.map(i=>{
      const route='theory'+(i.k?'/'+i.k:'');
      const isA=active===i.k;
      return `<button class="th-subnav-btn${isA?' active':''}" data-goto="${route}">${i.icon} ${LANG==='ar'?i.ar:i.en}</button>`;
    }).join('')}</div>`;
  },

  // ════════════════════════════ HUB ════════════════════════════
  renderHub(app){
    const G=window.THEORY_GLOBAL;
    const dir=this.dir(), tc=this.tc();

    const benefits=G.benefits.map(b=>`<li>${this.tx(b)}</li>`).join('');
    const smells=G.codeSmells.map(s=>`<li>${this.tx(s)}</li>`).join('');
    const principles=G.principles.map(pr=>`
      <div class="th-principle">
        <div class="th-principle-name">${this.tx({ar:pr.ar,en:pr.en})}</div>
        <div class="th-principle-detail ${tc}" style="direction:${dir}">${this.tx(pr.detail)}</div>
      </div>`).join('');

    // Before / After per category
    const beforeAfter=(G.categoryDeepDive||[]).map(c=>{
      const probs=(c.before.problems||[]).map(x=>`<li>${this.tx(x)}</li>`).join('');
      const pts=(c.after.points||[]).map(x=>`<li>${this.tx(x)}</li>`).join('');
      const exs=(c.after.examples||[]).map(x=>`<pre class="th-ba-code">${this._esc(x)}</pre>`).join('');
      return `<div class="card th-ba">
        <div class="th-ba-head">${this.catLabel(c.key)}</div>
        <div class="th-ba-tag ${tc}" style="direction:${dir}">${this.tx(c.tagline)}</div>
        <div class="th-ba-cols">
          <div class="th-ba-col th-ba-before">
            <div class="th-ba-label bad">${this.tx(c.before.title)}</div>
            ${c.before.code?`<pre class="th-ba-code">${this._esc(c.before.code)}</pre>`:''}
            <ul class="th-list ${tc}" style="direction:${dir}">${probs}</ul>
          </div>
          <div class="th-ba-col th-ba-after">
            <div class="th-ba-label ok">${this.tx(c.after.title)}</div>
            <ul class="th-list ${tc}" style="direction:${dir}">${pts}</ul>
            ${exs}
          </div>
        </div>
      </div>`;
    }).join('');

    // How you'll be tested
    const QT=G.questionTypes;
    const qtCol=(col)=>`<div class="th-qt-col">
      <div class="th-qt-title">${this.tx(col.title)}</div>
      <ol class="th-qt-list ${tc}" style="direction:${dir}">${col.items.map(i=>`<li>${this.tx(i)}</li>`).join('')}</ol>
    </div>`;

    // Combined patterns
    const CB=G.combined;
    const combinedCards=CB.examples.map(ex=>`
      <div class="th-combined-card">
        <div class="th-combined-title ${tc}" style="direction:${dir}">${this.tx(ex.title)}</div>
        <div class="th-combined-desc ${tc}" style="direction:${dir}">${this.tx(ex.desc)}</div>
        <div class="th-combined-chips">${ex.patterns.map(pid=>{const p=this.byId(pid);return p?`<button class="th-chip" data-goto="theory/pattern/${pid}">${p.name}</button>`:'';}).join('')}</div>
      </div>`).join('');

    const cats=G.categories.map(cat=>{
      const cards=cat.patterns.map(pid=>{
        const p=this.byId(pid); if(!p) return '';
        return `<button class="th-pcard" data-goto="theory/pattern/${p.id}" style="--pc-grad:var(--p-${p.id});">
          <span class="th-pcard-icon">${p.icon}</span>
          <span class="th-pcard-names">
            <span class="th-pcard-name">${p.name}</span>
            <span class="th-pcard-ar ar">${LANG==='ar'?p.nameAr:''}</span>
          </span>
          ${p.practical?`<span class="th-pcard-badge" title="${LANG==='ar'?'له لاب عملي':'Has practical lab'}">⚙</span>`:''}
        </button>`;
      }).join('');
      return `<section class="th-cat">
        <div class="th-cat-head">
          <span class="th-cat-icon">${cat.icon}</span>
          <div>
            <div class="th-cat-title">${this.catLabel(cat.key)} <span class="th-cat-count">${cat.patterns.length}</span></div>
            <div class="th-cat-desc ${tc}" style="direction:${dir}">${this.tx(cat.desc)}</div>
          </div>
        </div>
        <div class="th-pgrid">${cards}</div>
      </section>`;
    }).join('');

    app.innerHTML=`
      <div class="th-wrap">
        <header class="th-hero">
          <div class="th-eyebrow">${LANG==='ar'?'القسم النظري':'Theory'}</div>
          <h1 class="th-h1"><span class="accent-grad">${LANG==='ar'?'كل الأنماط الـ 23':'All 23 Patterns'}</span></h1>
          <p class="th-intro ${tc}" style="direction:${dir}">${this.tx(G.intro)}</p>
        </header>

        ${this.subnav('')}

        <div class="th-bigpic">
          <div class="card th-card-benefits">
            <div class="mini-title"><span>✦</span><span>${LANG==='ar'?'الفوائد':'Benefits'}</span></div>
            <ul class="th-list ${tc}" style="direction:${dir}">${benefits}</ul>
          </div>
          <div class="card th-card-smells">
            <div class="mini-title"><span>🔍</span><span>${LANG==='ar'?'روائح الكود':'Code Smells'}</span></div>
            <div class="th-smells-def ${tc}" style="direction:${dir}">${this.tx(G.codeSmellsDef)}</div>
            <ul class="th-list ${tc}" style="direction:${dir}">${smells}</ul>
          </div>
        </div>

        <div class="card th-card-principles">
          <div class="mini-title"><span>🧭</span><span>${LANG==='ar'?'مبادئ التصميم الأساسية':'Core Design Principles'}</span></div>
          <div class="th-principles">${principles}</div>
        </div>

        <div class="th-section-head"><span>🔄</span> ${LANG==='ar'?'كل فئة: قبل وبعد':'Each category: Before & After'}</div>
        <div class="th-ba-grid">${beforeAfter}</div>

        <div class="card th-card-qt">
          <div class="mini-title"><span>🎓</span><span>${LANG==='ar'?'كيف ستُختبر':"How you'll be tested"}</span></div>
          <div class="th-qt-cols">${qtCol(QT.concepts)}${qtCol(QT.perPattern)}</div>
        </div>

        <div class="card th-card-combined">
          <div class="mini-title"><span>🧬</span><span>${LANG==='ar'?'دمج الأنماط (Combined Patterns)':'Combined Patterns'}</span></div>
          <p class="th-combined-intro ${tc}" style="direction:${dir}">${this.tx(CB.intro)}</p>
          <div class="th-combined-grid">${combinedCards}</div>
        </div>

        <div class="th-quicklinks">
          <button class="th-ql" data-goto="theory/scenarios">🎯 <span>${LANG==='ar'?'تدرّب على السيناريوهات':'Practice scenarios'}</span></button>
          <button class="th-ql" data-goto="theory/compare">⚖️ <span>${LANG==='ar'?'فرّق بين المتشابهات':'Differentiate similar'}</span></button>
          <button class="th-ql" data-goto="theory/cheatsheet">📋 <span>${LANG==='ar'?'الورقة المرجعية':'Cheat sheet'}</span></button>
        </div>

        ${cats}
      </div>`;
    this._wire(app);
  },

  // ════════════════════════ SINGLE PATTERN ════════════════════════
  renderPattern(app, id){
    const p=this.byId(id);
    if(!p){ this.renderHub(app); return; }
    const d=(window.THEORY_DETAIL&&window.THEORY_DETAIL[id])||{};
    const dir=this.dir(), tc=this.tc();

    const scen=p.scenarios.map((s,i)=>`
      <div class="th-scenario">
        <div class="th-scenario-num">${i+1}</div>
        <div class="th-scenario-body">
          <div class="th-scenario-text ${tc}" style="direction:${dir}">${this.tx(s.text)}</div>
          <div class="th-scenario-why ${tc}" style="direction:${dir}"><strong>${LANG==='ar'?'لماذا؟':'Why?'}</strong> ${this.tx(s.why)}</div>
        </div>
      </div>`).join('');

    const block=(icon,label,val,cls)=>`
      <div class="th-block ${cls||''}">
        <div class="th-block-label">${icon} ${label}</div>
        <div class="th-block-val ${tc}" style="direction:${dir}">${this.tx(val)}</div>
      </div>`;

    // ── Structure: participants + code skeleton ──
    let structureHTML='';
    if(d.participants||d.codeSkeleton){
      const parts=(d.participants||[]).map(pt=>`
        <div class="th-part">
          <div class="th-part-role">${pt.role}</div>
          <div class="th-part-desc ${tc}" style="direction:${dir}">${this.tx(pt.desc)}</div>
        </div>`).join('');
      const code=d.codeSkeleton?`<div class="th-skel"><div class="th-skel-label">${LANG==='ar'?'هيكل الكود (مرجع لأسئلة إكمال الكود)':'Code skeleton (reference for code-completion questions)'}</div><div class="code-block"><pre>${(window.hi?hi(d.codeSkeleton):this._esc(d.codeSkeleton))}</pre></div></div>`:'';
      structureHTML=`
        <div class="th-struct">
          <div class="mini-title"><span>🧩</span><span>${LANG==='ar'?'البنية والأدوار (Participants)':'Structure & Participants'}</span></div>
          ${parts?`<div class="th-parts">${parts}</div>`:''}
          ${code}
        </div>`;
    }

    const analogyHTML=d.analogy?`
      <div class="th-analogy ${tc}" style="direction:${dir}">
        <span class="th-analogy-icon">💡</span>
        <div><span class="th-analogy-tag">${LANG==='ar'?'تشبيه واقعي':'Real-world analogy'}</span> ${this.tx(d.analogy)}</div>
      </div>`:'';

    const relExamHTML=(d.relations||d.examTip)?`
      <div class="th-blocks">
        ${d.relations?block('🔗', LANG==='ar'?'العلاقات مع أنماط أخرى':'Relations with other patterns', d.relations):''}
        ${d.examTip?block('🎓', LANG==='ar'?'نصيحة للاختبار':'Exam tip', d.examTip, 'th-examtip'):''}
      </div>`:'';

    app.innerHTML=`
      <div class="th-wrap">
        <button class="th-back" data-goto="theory">‹ ${LANG==='ar'?'كل الأنماط':'All patterns'}</button>

        <header class="th-phead" style="--pc-grad:var(--p-${p.id});">
          <div class="th-phead-icon">${p.icon}</div>
          <div class="th-phead-meta">
            <span class="th-phead-cat">${this.catLabel(p.category)}</span>
            <h1 class="th-phead-name">${p.name}</h1>
            <div class="th-phead-ar ar">${p.nameAr}</div>
          </div>
          ${p.practical?`<button class="th-practical-link" data-goto="pattern/${p.practicalId}/overview">${LANG==='ar'?'⚙ اللاب العملي':'⚙ Practical lab'} ›</button>`:''}
        </header>

        <div class="th-keyword ${tc}" style="direction:${dir}">
          <span class="th-keyword-tag">${LANG==='ar'?'كلمات مفتاحية للتعرّف':'Recognition keywords'}</span>
          ${this.tx(p.keyword)}
        </div>

        <div class="th-blocks">
          ${block('🎯', LANG==='ar'?'الغرض (Intent)':'Intent', p.intent, 'th-intent')}
          ${block('📌', LANG==='ar'?'متى تستخدمه':'When to use', p.whenToUse)}
          ${block('🧭', LANG==='ar'?'المبدأ الذي يوضّحه':'Principle demonstrated', p.principle)}
        </div>

        ${analogyHTML}

        ${structureHTML}

        <div class="th-blocks">
          ${block('⚙', LANG==='ar'?'كيف يعمل':'How it works', p.howItWorks)}
          ${block('⚠', LANG==='ar'?'الحدود والعواقب':'Limitations / Consequences', p.limitations, 'th-limit')}
        </div>

        ${relExamHTML}

        <div class="th-scen-section">
          <div class="mini-title"><span>🎯</span><span>${LANG==='ar'?'6 سيناريوهات — ولماذا هذا النمط هو الأنسب':'6 Scenarios — and why this pattern fits'}</span></div>
          ${scen}
        </div>

        ${this._patternNav(p)}
      </div>`;
    this._wire(app);
  },

  _esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },

  _patternNav(p){
    const all=this.all();
    const idx=all.findIndex(x=>x.id===p.id);
    const prev=all[idx-1], next=all[idx+1];
    return `<div class="th-pnav">
      ${prev?`<button class="th-pnav-btn" data-goto="theory/pattern/${prev.id}">‹ ${prev.name}</button>`:'<span></span>'}
      ${next?`<button class="th-pnav-btn" data-goto="theory/pattern/${next.id}">${next.name} ›</button>`:'<span></span>'}
    </div>`;
  },

  // ════════════════════════ SCENARIO TRAINER ════════════════════════
  _scenState:null,
  renderScenarios(app){
    // build a flat bank: each item {text, why, answerId, answerName}
    if(!this._bank){
      this._bank=[];
      this.all().forEach(p=>{
        p.scenarios.forEach(s=>this._bank.push({text:s.text, why:s.why, id:p.id, name:p.name, nameAr:p.nameAr, category:p.category}));
      });
    }
    if(!this._scenState) this._scenState={order:this._shuffle([...Array(this._bank.length).keys()]), pos:0, score:0, answered:false, picked:null, correctCount:0};
    this._renderScenCard(app);
  },

  _shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; },

  _renderScenCard(app){
    const st=this._scenState;
    const dir=this.dir(), tc=this.tc();
    if(st.pos>=st.order.length){
      const pct=Math.round(st.correctCount/st.order.length*100);
      app.innerHTML=`<div class="th-wrap">${this.subnav('scenarios')}
        <div class="card th-scen-result">
          <div class="th-scen-score" style="color:${pct>=80?'var(--ok)':pct>=50?'var(--warn)':'var(--err)'}">${st.correctCount}/${st.order.length}</div>
          <div class="${tc}">${pct>=80?(LANG==='ar'?'ممتاز! تتعرّف على الأنماط بثقة.':'Excellent! You recognize patterns confidently.'):pct>=50?(LANG==='ar'?'جيد — راجع ما أخطأت فيه.':'Good — review what you missed.'):(LANG==='ar'?'راجع بطاقات الأنماط وحاول مجدداً.':'Review the pattern cards and try again.')}</div>
          <button class="btn btn-primary" id="th-scen-retry">${LANG==='ar'?'إعادة':'Retry'}</button>
        </div></div>`;
      this._wire(app);
      document.getElementById('th-scen-retry')?.addEventListener('click',()=>{this._scenState=null;this.renderScenarios(app);});
      return;
    }
    const item=this._bank[st.order[st.pos]];
    // options: correct + 3 distractors (prefer same category)
    if(!st.options){
      const pool=this.all().filter(p=>p.id!==item.id);
      const same=this._shuffle(pool.filter(p=>p.category===item.category)).slice(0,3);
      let distract=same;
      if(distract.length<3) distract=distract.concat(this._shuffle(pool.filter(p=>p.category!==item.category)).slice(0,3-distract.length));
      const opts=this._shuffle([{id:item.id,name:item.name},...distract.map(d=>({id:d.id,name:d.name}))]);
      st.options=opts;
    }
    const optsHTML=st.options.map(o=>{
      let cls='th-opt';
      if(st.answered){
        if(o.id===item.id)cls+=' correct';
        else if(o.id===st.picked)cls+=' wrong';
      }
      return `<button class="${cls}" data-opt="${o.id}" ${st.answered?'disabled':''}>${o.name}</button>`;
    }).join('');

    app.innerHTML=`<div class="th-wrap">${this.subnav('scenarios')}
      <div class="th-scen-head">
        <div class="th-scen-progress">${LANG==='ar'?'سيناريو':'Scenario'} ${st.pos+1} / ${st.order.length}</div>
        <div class="th-scen-correct">✓ ${st.correctCount}</div>
      </div>
      <div class="card th-scen-card">
        <div class="th-scen-q ${tc}" style="direction:${dir}">${this.tx(item.text)}</div>
        <div class="th-scen-ask">${LANG==='ar'?'ما النمط الأنسب؟':'Which pattern fits best?'}</div>
        <div class="th-opts">${optsHTML}</div>
        ${st.answered?`<div class="th-scen-explain ${tc}" style="direction:${dir}">
          <div class="th-scen-answer">${st.picked===item.id?'✅':'❌'} ${LANG==='ar'?'الإجابة':'Answer'}: <strong>${item.name}</strong> <span class="ar">${LANG==='ar'?'('+item.nameAr+')':''}</span></div>
          <div class="th-scen-whyx"><strong>${LANG==='ar'?'لماذا؟':'Why?'}</strong> ${this.tx(item.why)}</div>
          <button class="btn btn-primary btn-sm" id="th-scen-next">${st.pos+1<st.order.length?(LANG==='ar'?'التالي ›':'Next ›'):(LANG==='ar'?'النتيجة':'Results')}</button>
        </div>`:''}
      </div></div>`;
    this._wire(app);
    if(!st.answered){
      app.querySelectorAll('.th-opt').forEach(b=>b.addEventListener('click',()=>{
        st.answered=true; st.picked=b.dataset.opt;
        if(st.picked===item.id) st.correctCount++;
        this._renderScenCard(app);
      }));
    } else {
      document.getElementById('th-scen-next')?.addEventListener('click',()=>{
        st.pos++; st.answered=false; st.picked=null; st.options=null;
        this._renderScenCard(app);
      });
    }
  },

  // ════════════════════════ DIFFERENTIATE ════════════════════════
  renderCompare(app){
    const G=window.THEORY_GLOBAL; const dir=this.dir(), tc=this.tc();
    const cards=G.comparisons.map(c=>`
      <div class="card th-cmp">
        <div class="th-cmp-title ${tc}" style="direction:${dir}">${this.tx(c.title)}</div>
        <div class="th-cmp-note ${tc}" style="direction:${dir}">${this.tx(c.note)}</div>
        <div class="th-cmp-rows">
          ${c.rows.map(r=>`<div class="th-cmp-row">
            <div class="th-cmp-p">${r.p}</div>
            <div class="th-cmp-d ${tc}" style="direction:${dir}">${this.tx(r)}</div>
          </div>`).join('')}
        </div>
      </div>`).join('');
    app.innerHTML=`<div class="th-wrap">${this.subnav('compare')}
      <header class="th-hero"><h1 class="th-h1"><span class="accent-grad">${LANG==='ar'?'التفريق بين المتشابهات':'Differentiating Similar Patterns'}</span></h1>
      <p class="th-intro ${tc}" style="direction:${dir}">${LANG==='ar'?'أكثر ما يربك الطلاب: أنماط تتشابه في البنية وتختلف في الغرض. هذه أهم المقارنات.':'What confuses students most: patterns alike in structure but different in intent. Here are the key comparisons.'}</p></header>
      <div class="th-cmp-grid">${cards}</div>
    </div>`;
    this._wire(app);
  },

  // ════════════════════════ CODE SMELLS ════════════════════════
  renderSmells(app){
    const G=window.THEORY_GLOBAL; const dir=this.dir(), tc=this.tc();
    const smells=G.codeSmells.map(s=>`<li>${this.tx(s)}</li>`).join('');
    const fixes=G.smellFixes.map(f=>`
      <div class="card th-fix">
        <div class="th-fix-title ${tc}" style="direction:${dir}">${this.tx(f.title)}</div>
        <div class="th-fix-row ${tc}" style="direction:${dir}"><span class="th-fix-lbl bad">${LANG==='ar'?'المشكلة':'Problem'}</span> ${this.tx(f.bad)}</div>
        <div class="th-fix-row ${tc}" style="direction:${dir}"><span class="th-fix-lbl warn">${LANG==='ar'?'الرائحة':'Smell'}</span> ${this.tx(f.smell)}</div>
        <div class="th-fix-row ${tc}" style="direction:${dir}"><span class="th-fix-lbl ok">${LANG==='ar'?'الحل':'Fix'}</span> ${this.tx(f.fix)}</div>
        <div class="th-fix-patterns">${f.patterns.map(pid=>{const p=this.byId(pid);return p?`<button class="th-chip" data-goto="theory/pattern/${pid}">${p.name}</button>`:''}).join('')}</div>
      </div>`).join('');
    app.innerHTML=`<div class="th-wrap">${this.subnav('smells')}
      <header class="th-hero"><h1 class="th-h1"><span class="accent-grad">${LANG==='ar'?'روائح الكود وعلاجها':'Code Smells & Fixes'}</span></h1>
      <p class="th-intro ${tc}" style="direction:${dir}">${LANG==='ar'?'الرائحة إشارة على تصميم سيئ. تحديدها واقتراح النمط المناسب لعلاجها سؤال متكرر.':'A smell is a sign of bad design. Identifying it and proposing the right pattern to fix it is a recurring question.'}</p></header>
      <div class="card th-card-smells"><div class="mini-title"><span>🔍</span><span>${LANG==='ar'?'أشهر الروائح':'Common smells'}</span></div>
        <ul class="th-list ${tc}" style="direction:${dir}">${smells}</ul></div>
      <div class="mini-title" style="margin-top:1.5rem;"><span>🛠️</span><span>${LANG==='ar'?'رائحة ← نمط يعالجها':'Smell → fixing pattern'}</span></div>
      <div class="th-fix-grid">${fixes}</div>
    </div>`;
    this._wire(app);
  },

  // ════════════════════════ MVC ════════════════════════
  renderMVC(app){
    const M=window.THEORY_GLOBAL.mvc; const dir=this.dir(), tc=this.tc();
    const parts=M.parts.map(p=>`
      <div class="th-mvc-part">
        <div class="th-mvc-key">${p.key}</div>
        <div class="th-mvc-desc ${tc}" style="direction:${dir}">${this.tx(p)}</div>
      </div>`).join('');
    const used=M.patternsUsed.map(u=>`
      <div class="th-mvc-used ${tc}" style="direction:${dir}">
        <button class="th-chip" data-goto="theory/pattern/${u.p.toLowerCase()}">${u.p}</button> ${this.tx(u)}
      </div>`).join('');
    const facts=M.facts.map(f=>`<li>${this.tx(f)}</li>`).join('');
    app.innerHTML=`<div class="th-wrap">${this.subnav('mvc')}
      <header class="th-hero"><h1 class="th-h1"><span class="accent-grad">MVC</span></h1>
      <p class="th-intro ${tc}" style="direction:${dir}">${this.tx(M.intro)}</p></header>
      <div class="th-mvc-parts">${parts}</div>
      <div class="card"><div class="mini-title"><span>🧩</span><span>${LANG==='ar'?'الأنماط المستخدمة في MVC':'Patterns used in MVC'}</span></div>${used}</div>
      <div class="card"><div class="mini-title"><span>✓</span><span>${LANG==='ar'?'حقائق مهمة':'Key facts'}</span></div>
        <ul class="th-list ${tc}" style="direction:${dir}">${facts}</ul></div>
    </div>`;
    this._wire(app);
  },

  // ════════════════════════ CHEAT SHEET ════════════════════════
  renderCheatsheet(app){
    const dir=this.dir(), tc=this.tc();
    const rows=this.all().map(p=>`
      <tr data-goto="theory/pattern/${p.id}">
        <td class="th-cs-name"><span class="th-cs-icon">${p.icon}</span>${p.name}${p.practical?' <span class="th-cs-star" title="practical">⚙</span>':''}</td>
        <td class="th-cs-cat">${this.catLabel(p.category)}</td>
        <td class="th-cs-intent ${tc}" style="direction:${dir}">${this.tx(p.intent)}</td>
        <td class="th-cs-kw ${tc}" style="direction:${dir}">${this.tx(p.keyword)}</td>
      </tr>`).join('');
    app.innerHTML=`<div class="th-wrap">${this.subnav('cheatsheet')}
      <header class="th-hero"><h1 class="th-h1"><span class="accent-grad">${LANG==='ar'?'الورقة المرجعية':'Cheat Sheet'}</span></h1>
      <p class="th-intro ${tc}" style="direction:${dir}">${LANG==='ar'?'كل الأنماط في جدول واحد — مثالي للمراجعة السريعة قبل الاختبار. اضغط أي صف للتفاصيل.':'All patterns in one table — perfect for a quick pre-exam review. Click any row for details.'}</p></header>
      <div class="th-cs-wrap"><table class="th-cs-table">
        <thead><tr>
          <th>${LANG==='ar'?'النمط':'Pattern'}</th>
          <th>${LANG==='ar'?'الفئة':'Category'}</th>
          <th>${LANG==='ar'?'الغرض':'Intent'}</th>
          <th>${LANG==='ar'?'الكلمة المفتاحية':'Keyword'}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
    this._wire(app);
  },

  // wire all [data-goto] elements
  _wire(app){
    app.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click',()=>go(el.dataset.goto)));
  }
};

window.Theory = Theory;
