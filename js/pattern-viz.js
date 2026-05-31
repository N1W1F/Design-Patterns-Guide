/* ============================================================
   Pattern Visualizations — animated SVG demos for each pattern
   PatternViz.mini(id)  → compact icon for cards
   PatternViz.hero(id)  → interactive demo for detail pages
   ============================================================ */

const PatternViz = (() => {

  // ===== MINI (cards) =====
  const mini = {
    singleton: `<svg viewBox="0 0 100 100" class="viz-mini-singleton">
      <defs><radialGradient id="g-sg"><stop offset="0" stop-color="#ffd84d"/><stop offset="1" stop-color="#ff8c42"/></radialGradient></defs>
      <circle cx="50" cy="50" r="20" fill="url(#g-sg)"><animate attributeName="r" values="20;23;20" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="50" cy="50" r="20" fill="none" stroke="#ffd84d" stroke-width="1" opacity="0.5"><animate attributeName="r" values="20;36;20" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite"/></circle>
      <text x="50" y="56" text-anchor="middle" font-size="14" font-weight="800" fill="#0b0b22" font-family="Space Grotesk">1</text>
    </svg>`,

    prototype: `<svg viewBox="0 0 100 100" class="viz-mini-prototype">
      <rect x="20" y="35" width="22" height="22" rx="4" fill="#2fd48a" opacity="0.95"/>
      <rect x="48" y="35" width="22" height="22" rx="4" fill="#2fd48a" opacity="0.7"><animate attributeName="opacity" values="0;0.7;0.7" dur="2s" repeatCount="indefinite"/></rect>
      <rect x="68" y="50" width="18" height="18" rx="4" fill="#2fd48a" opacity="0.5"><animate attributeName="opacity" values="0;0;0.5" dur="2s" repeatCount="indefinite"/></rect>
      <path d="M 44 46 L 48 46" stroke="#06d4ff" stroke-width="2" stroke-dasharray="2 2"><animate attributeName="stroke-dashoffset" values="0;-4" dur="0.5s" repeatCount="indefinite"/></path>
    </svg>`,

    builder: `<svg viewBox="0 0 100 100" class="viz-mini-builder">
      <rect x="25" y="68" width="50" height="8" rx="3" fill="#ff8c42"/>
      <rect x="28" y="58" width="44" height="8" rx="3" fill="#ff5b6e" opacity="0.9"><animate attributeName="y" values="100;58" dur="2s" repeatCount="indefinite"/></rect>
      <rect x="30" y="48" width="40" height="8" rx="3" fill="#ffd84d" opacity="0.85"><animate attributeName="y" values="100;48" dur="2s" begin="0.3s" repeatCount="indefinite"/></rect>
      <rect x="28" y="38" width="44" height="8" rx="3" fill="#ff8c42" opacity="0.8"><animate attributeName="y" values="100;38" dur="2s" begin="0.6s" repeatCount="indefinite"/></rect>
      <rect x="25" y="28" width="50" height="8" rx="4" fill="#ff5b6e"><animate attributeName="y" values="100;28" dur="2s" begin="0.9s" repeatCount="indefinite"/></rect>
    </svg>`,

    factory: `<svg viewBox="0 0 100 100" class="viz-mini-factory">
      <rect x="15" y="35" width="30" height="30" rx="6" fill="#ff5edb"/>
      <path d="M 45 50 L 65 50" stroke="#ff5edb" stroke-width="2"/>
      <circle cx="78" cy="35" r="8" fill="#ff5b6e"><animate attributeName="cx" values="55;78;78" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1" dur="2s" repeatCount="indefinite"/></circle>
      <rect x="70" y="55" width="16" height="16" rx="2" fill="#ffd84d"><animate attributeName="x" values="55;70;70" dur="2s" begin="0.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1" dur="2s" begin="0.6s" repeatCount="indefinite"/></rect>
      <text x="30" y="55" text-anchor="middle" font-size="14" fill="white" font-weight="800">⚙</text>
    </svg>`,

    adapter: `<svg viewBox="0 0 100 100" class="viz-mini-adapter">
      <rect x="10" y="40" width="20" height="20" rx="2" fill="#8b7fff"/>
      <rect x="40" y="38" width="20" height="24" rx="6" fill="#06d4ff" opacity="0.85"/>
      <circle cx="80" cy="50" r="12" fill="#8b7fff"/>
      <path d="M 30 50 L 40 50" stroke="#06d4ff" stroke-width="2"/>
      <path d="M 60 50 L 68 50" stroke="#06d4ff" stroke-width="2"/>
      <text x="50" y="54" text-anchor="middle" font-size="10" fill="white" font-weight="800">⇄</text>
    </svg>`,

    decorator: `<svg viewBox="0 0 100 100" class="viz-mini-decorator">
      <circle cx="50" cy="55" r="18" fill="#b57bff"/>
      <circle cx="50" cy="55" r="22" fill="none" stroke="#ff5edb" stroke-width="2" stroke-dasharray="3 2"><animate attributeName="r" values="22;24;22" dur="1.5s" repeatCount="indefinite"/></circle>
      <circle cx="50" cy="55" r="27" fill="none" stroke="#ff5edb" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.6"><animate attributeName="r" values="27;30;27" dur="1.5s" begin="0.3s" repeatCount="indefinite"/></circle>
      <circle cx="50" cy="55" r="32" fill="none" stroke="#ff5edb" stroke-width="1" stroke-dasharray="1 4" opacity="0.4"><animate attributeName="r" values="32;36;32" dur="1.5s" begin="0.6s" repeatCount="indefinite"/></circle>
      <text x="50" y="60" text-anchor="middle" font-size="16" fill="white" font-weight="800">★</text>
    </svg>`,

    flyweight: `<svg viewBox="0 0 100 100" class="viz-mini-flyweight">
      ${[[20,30],[40,30],[60,30],[80,30],[20,50],[40,50],[60,50],[80,50],[20,70],[40,70],[60,70],[80,70]].map((p,i)=>`
        <circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#06d4ff" opacity="${0.4 + (i%4)*0.15}"><animate attributeName="opacity" values="${0.3+(i%4)*0.15};${0.6+(i%4)*0.15};${0.3+(i%4)*0.15}" dur="${2 + (i%3)*0.5}s" repeatCount="indefinite"/></circle>
      `).join('')}
    </svg>`,

    proxy: `<svg viewBox="0 0 100 100" class="viz-mini-proxy">
      <circle cx="25" cy="50" r="8" fill="#06d4ff"/>
      <rect x="42" y="32" width="16" height="36" rx="3" fill="#2fd48a" opacity="0.8"/>
      <circle cx="50" cy="50" r="3" fill="#0b0b22"/>
      <circle cx="78" cy="50" r="10" fill="#2fd48a"/>
      <path d="M 33 50 L 42 50" stroke="#06d4ff" stroke-width="2" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" values="0;-5" dur="0.8s" repeatCount="indefinite"/></path>
      <path d="M 58 50 L 68 50" stroke="#2fd48a" stroke-width="2" stroke-dasharray="3 2"><animate attributeName="stroke-dashoffset" values="0;-5" dur="0.8s" begin="0.4s" repeatCount="indefinite"/></path>
    </svg>`,

    observer: `<svg viewBox="0 0 100 100" class="viz-mini-observer">
      <circle cx="50" cy="50" r="10" fill="#b57bff"/>
      <circle cx="50" cy="50" r="15" fill="none" stroke="#ff5edb" stroke-width="2"><animate attributeName="r" values="10;38" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="50" cy="50" r="15" fill="none" stroke="#ff5edb" stroke-width="2"><animate attributeName="r" values="10;38" dur="2s" begin="0.7s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="2s" begin="0.7s" repeatCount="indefinite"/></circle>
      <circle cx="22" cy="22" r="4" fill="#ff5edb"/>
      <circle cx="78" cy="22" r="4" fill="#ff5edb"/>
      <circle cx="22" cy="78" r="4" fill="#ff5edb"/>
      <circle cx="78" cy="78" r="4" fill="#ff5edb"/>
    </svg>`,

    strategy: `<svg viewBox="0 0 100 100" class="viz-mini-strategy">
      <circle cx="50" cy="65" r="14" fill="#ff8c42"/>
      <rect x="44" y="35" width="12" height="22" rx="2" fill="#ffd84d">
        <animate attributeName="x" values="20;44;68;44" dur="3s" repeatCount="indefinite"/>
      </rect>
      <text x="50" y="50" text-anchor="middle" font-size="12" fill="#0b0b22" font-weight="800">
        <animate attributeName="x" values="26;50;74;50" dur="3s" repeatCount="indefinite"/>
        ⚡
      </text>
    </svg>`
  };

  // ===== HERO (interactive demos) =====
  // Returns HTML with embedded JS handlers (via inline event listeners attached after insertion)
  const hero = {

    singleton: () => ({
      html: `<div class="viz-hero" data-viz="singleton">
        <div class="viz-stage" style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Try creating instances</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Click the button repeatedly — every call returns the same instance.</p>
            <button class="btn btn-primary" id="sg-create">getInstance()</button>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">
              <div>Calls: <span id="sg-calls" style="color:var(--accent-2);font-weight:700;">0</span></div>
              <div>Instances created: <span id="sg-inst" style="color:#ffd84d;font-weight:700;">1</span> <span style="opacity:0.6;">(never grows!)</span></div>
            </div>
          </div>
          <div style="position:relative;height:220px;display:grid;place-items:center;">
            <div id="sg-orb" style="width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#ffd84d,#ff8c42);box-shadow:0 0 60px rgba(255,216,77,0.5);display:grid;place-items:center;font-family:var(--font-display);font-size:2.5rem;font-weight:800;color:#0b0b22;transition:transform 0.3s var(--ease-spring);">1</div>
            <div id="sg-ring" style="position:absolute;border:2px solid #ffd84d;border-radius:50%;width:120px;height:120px;opacity:0;pointer-events:none;"></div>
            <div class="viz-caption" id="sg-cap">⤴ Same instance returned</div>
          </div>
        </div>
      </div>`,
      attach: () => {
        let calls = 0;
        const btn = document.getElementById('sg-create');
        const callsEl = document.getElementById('sg-calls');
        const orb = document.getElementById('sg-orb');
        const ring = document.getElementById('sg-ring');
        const cap = document.getElementById('sg-cap');
        if (!btn) return;
        btn.addEventListener('click', () => {
          calls++;
          callsEl.textContent = calls;
          orb.style.transform = 'scale(1.15)';
          if (cap) cap.style.opacity = '1';
          ring.style.cssText += 'animation:wave-out 0.6s ease-out;opacity:1;';
          setTimeout(() => { orb.style.transform = 'scale(1)'; ring.style.opacity = '0'; ring.style.animation = ''; if(cap)cap.style.opacity='0.5'; }, 600);
        });
      }
    }),

    observer: () => ({
      html: `<div class="viz-hero" data-viz="observer">
        <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Broadcast to subscribers</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Subject notifies all observers when its state changes.</p>
            <button class="btn btn-primary" id="ob-notify">notify()</button>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">Subscribers: <span style="color:#ff5edb;font-weight:700;">4</span></div>
          </div>
          <div style="position:relative;height:240px;">
            <svg viewBox="0 0 300 240" style="width:100%;height:100%;">
              <defs><radialGradient id="ob-sub"><stop offset="0" stop-color="#b57bff"/><stop offset="1" stop-color="#7040c0"/></radialGradient></defs>
              <circle id="ob-wave1" cx="150" cy="120" r="30" fill="none" stroke="#ff5edb" stroke-width="2" opacity="0"/>
              <circle id="ob-wave2" cx="150" cy="120" r="30" fill="none" stroke="#ff5edb" stroke-width="2" opacity="0"/>
              <circle cx="150" cy="120" r="28" fill="url(#ob-sub)"/>
              <text x="150" y="127" text-anchor="middle" font-size="22" fill="white" font-weight="800">📡</text>
              <g id="ob-subs">
                <circle class="ob-sub" cx="50"  cy="50"  r="14" fill="#3d4070" stroke="#b57bff" stroke-width="2"/>
                <circle class="ob-sub" cx="250" cy="50"  r="14" fill="#3d4070" stroke="#b57bff" stroke-width="2"/>
                <circle class="ob-sub" cx="50"  cy="190" r="14" fill="#3d4070" stroke="#b57bff" stroke-width="2"/>
                <circle class="ob-sub" cx="250" cy="190" r="14" fill="#3d4070" stroke="#b57bff" stroke-width="2"/>
              </g>
            </svg>
          </div>
        </div>
      </div>`,
      attach: () => {
        const btn = document.getElementById('ob-notify');
        if (!btn) return;
        btn.addEventListener('click', () => {
          const w1 = document.getElementById('ob-wave1');
          const w2 = document.getElementById('ob-wave2');
          [w1, w2].forEach((w, i) => {
            w.setAttribute('r', '30');
            w.style.opacity = '0';
            setTimeout(() => {
              w.animate([
                { r: 30, opacity: 0.8 },
                { r: 130, opacity: 0 }
              ], { duration: 900, easing: 'ease-out' });
            }, i * 200);
          });
          const subs = document.querySelectorAll('.ob-sub');
          subs.forEach((s, i) => {
            setTimeout(() => {
              s.animate([
                { fill: '#3d4070', r: 14 },
                { fill: '#ff5edb', r: 18 },
                { fill: '#3d4070', r: 14 }
              ], { duration: 700, easing: 'ease-out' });
            }, 200 + i * 80);
          });
        });
      }
    }),

    strategy: () => ({
      html: `<div class="viz-hero" data-viz="strategy">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Swap strategies at runtime</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Pick a sorting strategy — same context, different behavior.</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              <button class="btn btn-outline btn-sm strat-btn active" data-st="bubble">Bubble Sort</button>
              <button class="btn btn-outline btn-sm strat-btn" data-st="quick">Quick Sort</button>
              <button class="btn btn-outline btn-sm strat-btn" data-st="merge">Merge Sort</button>
            </div>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">
              Active: <span id="strat-active" style="color:#ff8c42;font-weight:700;">bubble</span>
              <div style="margin-top:0.3rem;">Complexity: <span id="strat-comp" style="color:var(--accent-2);">O(n²)</span></div>
            </div>
          </div>
          <div style="display:flex;align-items:flex-end;justify-content:center;gap:6px;height:180px;padding:1rem;background:var(--bg-1);border-radius:var(--r-md);border:1px solid var(--stroke);" id="strat-bars">
            ${[40,90,20,70,55,30,80,25,60,45].map((h,i)=>`<div class="strat-bar" data-i="${i}" style="width:18px;height:${h}px;background:linear-gradient(180deg,#ff8c42,#ffd84d);border-radius:3px 3px 0 0;transition:all 0.3s ease;"></div>`).join('')}
          </div>
        </div>
      </div>`,
      attach: () => {
        const map = { bubble: { name: 'bubble', comp: 'O(n²)', color: 'linear-gradient(180deg,#ff8c42,#ffd84d)' },
                      quick:  { name: 'quick',  comp: 'O(n log n)', color: 'linear-gradient(180deg,#06d4ff,#8b7fff)' },
                      merge:  { name: 'merge',  comp: 'O(n log n)', color: 'linear-gradient(180deg,#2fd48a,#06d4ff)' } };
        document.querySelectorAll('.strat-btn').forEach(b => {
          b.addEventListener('click', () => {
            document.querySelectorAll('.strat-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            const s = map[b.dataset.st];
            document.getElementById('strat-active').textContent = s.name;
            document.getElementById('strat-comp').textContent = s.comp;
            const bars = document.querySelectorAll('.strat-bar');
            bars.forEach((bar, i) => {
              setTimeout(() => { bar.style.background = s.color; bar.style.transform = 'scaleY(0.5)'; setTimeout(()=>bar.style.transform='', 200); }, i * 50);
            });
          });
        });
      }
    }),

    factory: () => ({
      html: `<div class="viz-hero" data-viz="factory">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Create products by type</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Same factory, different product types.</p>
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
              <button class="btn btn-outline btn-sm fac-btn" data-t="🔴">create("circle")</button>
              <button class="btn btn-outline btn-sm fac-btn" data-t="🟦">create("square")</button>
              <button class="btn btn-outline btn-sm fac-btn" data-t="🔺">create("triangle")</button>
            </div>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">Created: <span id="fac-count" style="color:#ff5edb;font-weight:700;">0</span></div>
          </div>
          <div style="position:relative;height:200px;background:var(--bg-1);border-radius:var(--r-md);border:1px solid var(--stroke);overflow:hidden;">
            <div style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);width:80px;height:80px;background:var(--p-factory);border-radius:var(--r-md);display:grid;place-items:center;font-size:2rem;">🏭</div>
            <div style="position:absolute;right:1rem;top:1rem;bottom:1rem;width:40%;background:var(--glass);border-radius:var(--r-sm);border:1px dashed var(--stroke);overflow-y:auto;padding:0.5rem;display:flex;flex-wrap:wrap;align-content:flex-start;gap:0.3rem;" id="fac-out"></div>
          </div>
        </div>
      </div>`,
      attach: () => {
        let count = 0;
        document.querySelectorAll('.fac-btn').forEach(b => {
          b.addEventListener('click', () => {
            count++;
            document.getElementById('fac-count').textContent = count;
            const out = document.getElementById('fac-out');
            const item = document.createElement('span');
            item.textContent = b.dataset.t;
            item.style.cssText = 'font-size:1.5rem;animation:fade-in 0.4s ease;';
            out.appendChild(item);
            if (out.children.length > 24) out.removeChild(out.firstChild);
          });
        });
      }
    }),

    adapter: () => ({
      html: `<div class="viz-hero" data-viz="adapter">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Make incompatibles work</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Square plug → adapter → round socket.</p>
            <button class="btn btn-primary" id="ad-connect">connect()</button>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">Status: <span id="ad-status" style="color:var(--ink-dim);">disconnected</span></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;height:180px;">
            <div style="width:60px;height:60px;background:#8b7fff;display:grid;place-items:center;font-weight:800;color:white;border-radius:8px;">▣</div>
            <div id="ad-bridge" style="width:0;height:4px;background:linear-gradient(90deg,#8b7fff,#06d4ff);transition:width 0.5s ease;"></div>
            <div id="ad-adapter" style="width:60px;height:60px;background:linear-gradient(135deg,#8b7fff,#06d4ff);display:grid;place-items:center;border-radius:50% 8px 8px 50%;color:white;font-weight:800;opacity:0;transition:opacity 0.5s ease;">⇄</div>
            <div id="ad-bridge2" style="width:0;height:4px;background:linear-gradient(90deg,#06d4ff,#8b7fff);transition:width 0.5s ease 0.3s;"></div>
            <div style="width:60px;height:60px;background:#06d4ff;border-radius:50%;display:grid;place-items:center;font-weight:800;color:white;">◯</div>
          </div>
        </div>
      </div>`,
      attach: () => {
        const btn = document.getElementById('ad-connect');
        if (!btn) return;
        btn.addEventListener('click', () => {
          document.getElementById('ad-bridge').style.width = '30px';
          document.getElementById('ad-adapter').style.opacity = '1';
          document.getElementById('ad-bridge2').style.width = '30px';
          document.getElementById('ad-status').textContent = 'connected ✓';
          document.getElementById('ad-status').style.color = '#2fd48a';
        });
      }
    }),

    decorator: () => ({
      html: `<div class="viz-hero" data-viz="decorator">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Wrap with features</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Stack decorators on a base object.</p>
            <div style="display:flex;flex-direction:column;gap:0.4rem;">
              <button class="btn btn-outline btn-sm dec-btn" data-d="milk" data-c="#fff5e0">+ Milk</button>
              <button class="btn btn-outline btn-sm dec-btn" data-d="sugar" data-c="#ffd84d">+ Sugar</button>
              <button class="btn btn-outline btn-sm dec-btn" data-d="chocolate" data-c="#8b6a3d">+ Chocolate</button>
              <button class="btn btn-ghost btn-sm" id="dec-reset">Reset</button>
            </div>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">Recipe: <span id="dec-recipe" style="color:#ff5edb;">coffee</span></div>
          </div>
          <div style="position:relative;height:200px;display:grid;place-items:center;">
            <div id="dec-cup" style="position:relative;width:140px;height:140px;border-radius:50%;background:#6b4226;display:grid;place-items:center;font-size:2.5rem;box-shadow:0 0 50px rgba(255,94,219,0.25);">☕</div>
          </div>
        </div>
      </div>`,
      attach: () => {
        let recipe = ['coffee'];
        let layer = 0;
        const cup = document.getElementById('dec-cup');
        const update = () => document.getElementById('dec-recipe').textContent = recipe.join(' → ');
        document.querySelectorAll('.dec-btn').forEach(b => {
          b.addEventListener('click', () => {
            layer++;
            recipe.push(b.dataset.d);
            const ring = document.createElement('div');
            ring.style.cssText = `position:absolute;inset:${-layer*8}px;border-radius:50%;border:3px solid ${b.dataset.c};box-shadow:0 0 20px ${b.dataset.c}80;pointer-events:none;animation:fade-in 0.4s ease;`;
            cup.appendChild(ring);
            update();
          });
        });
        document.getElementById('dec-reset').addEventListener('click', () => {
          recipe = ['coffee']; layer = 0;
          cup.querySelectorAll('div').forEach(d => d.remove());
          update();
        });
      }
    }),

    flyweight: () => ({
      html: `<div class="viz-hero" data-viz="flyweight">
        <div style="display:grid;grid-template-columns:1fr 1.3fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Share intrinsic state</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">100 trees, but only 3 shared "tree types" in memory.</p>
            <button class="btn btn-primary" id="fw-spawn">spawn 100 trees</button>
            <button class="btn btn-ghost btn-sm" id="fw-clear">clear</button>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">
              Trees: <span id="fw-trees" style="color:#06d4ff;font-weight:700;">0</span><br>
              Memory (types): <span id="fw-mem" style="color:#2fd48a;font-weight:700;">0</span>
            </div>
          </div>
          <div id="fw-grid" style="height:200px;background:var(--bg-1);border-radius:var(--r-md);border:1px solid var(--stroke);display:flex;flex-wrap:wrap;gap:2px;padding:0.5rem;overflow:hidden;align-content:flex-start;"></div>
        </div>
      </div>`,
      attach: () => {
        const trees = ['🌲', '🌳', '🌴'];
        const colors = ['#2fd48a', '#06d4ff', '#ff8c42'];
        document.getElementById('fw-spawn').addEventListener('click', () => {
          const grid = document.getElementById('fw-grid');
          grid.innerHTML = '';
          for (let i = 0; i < 100; i++) {
            const t = i % 3;
            const span = document.createElement('span');
            span.textContent = trees[t];
            span.style.cssText = `font-size:1rem;animation:fade-in 0.4s ease ${i*8}ms both;`;
            grid.appendChild(span);
          }
          document.getElementById('fw-trees').textContent = '100';
          document.getElementById('fw-mem').textContent = '3';
        });
        document.getElementById('fw-clear').addEventListener('click', () => {
          document.getElementById('fw-grid').innerHTML = '';
          document.getElementById('fw-trees').textContent = '0';
          document.getElementById('fw-mem').textContent = '0';
        });
      }
    }),

    proxy: () => ({
      html: `<div class="viz-hero" data-viz="proxy">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Controlled access</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Proxy checks before forwarding to real subject.</p>
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">
              <button class="btn btn-outline btn-sm pr-btn" data-auth="1">request (auth ✓)</button>
              <button class="btn btn-outline btn-sm pr-btn" data-auth="0">request (auth ✗)</button>
            </div>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">Status: <span id="pr-status" style="color:var(--ink-dim);">idle</span></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-around;height:180px;">
            <div style="text-align:center;">
              <div style="width:50px;height:50px;border-radius:50%;background:#06d4ff;display:grid;place-items:center;font-size:1.4rem;margin:0 auto 0.3rem;">👤</div>
              <div style="font-size:0.7rem;color:var(--ink-dim);font-family:var(--font-code);">client</div>
            </div>
            <div id="pr-arrow1" style="width:30px;height:2px;background:var(--stroke-hi);"></div>
            <div style="text-align:center;">
              <div id="pr-proxy-icon" style="width:60px;height:60px;border-radius:8px;background:linear-gradient(135deg,#2fd48a,#06d4ff);display:grid;place-items:center;font-size:1.4rem;margin:0 auto 0.3rem;color:white;">🛡</div>
              <div style="font-size:0.7rem;color:var(--ink-dim);font-family:var(--font-code);">proxy</div>
            </div>
            <div id="pr-arrow2" style="width:30px;height:2px;background:var(--stroke-hi);"></div>
            <div style="text-align:center;">
              <div id="pr-real" style="width:50px;height:50px;border-radius:50%;background:#2fd48a;display:grid;place-items:center;font-size:1.4rem;margin:0 auto 0.3rem;opacity:0.5;">🎯</div>
              <div style="font-size:0.7rem;color:var(--ink-dim);font-family:var(--font-code);">real</div>
            </div>
          </div>
        </div>
      </div>`,
      attach: () => {
        document.querySelectorAll('.pr-btn').forEach(b => {
          b.addEventListener('click', () => {
            const ok = b.dataset.auth === '1';
            const status = document.getElementById('pr-status');
            const a1 = document.getElementById('pr-arrow1');
            const a2 = document.getElementById('pr-arrow2');
            const real = document.getElementById('pr-real');
            a1.style.background = '#06d4ff';
            status.textContent = 'checking...';
            status.style.color = '#f5be42';
            setTimeout(() => {
              if (ok) {
                a2.style.background = '#2fd48a';
                real.style.opacity = '1';
                real.style.transform = 'scale(1.15)';
                status.textContent = 'allowed ✓';
                status.style.color = '#2fd48a';
                setTimeout(() => { real.style.transform = ''; a1.style.background = a2.style.background = 'var(--stroke-hi)'; real.style.opacity = '0.5'; }, 800);
              } else {
                status.textContent = 'denied ✗';
                status.style.color = '#ff5b6e';
                setTimeout(() => { a1.style.background = 'var(--stroke-hi)'; }, 800);
              }
            }, 400);
          });
        });
      }
    }),

    builder: () => ({
      html: `<div class="viz-hero" data-viz="builder">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Step-by-step construction</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Choose ingredients, then build.</p>
            <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.6rem;">
              <button class="btn btn-outline btn-sm bd-ing" data-l="bun" data-c="#ff8c42">+ Bun</button>
              <button class="btn btn-outline btn-sm bd-ing" data-l="lettuce" data-c="#2fd48a">+ Lettuce</button>
              <button class="btn btn-outline btn-sm bd-ing" data-l="patty" data-c="#6b4226">+ Patty</button>
              <button class="btn btn-outline btn-sm bd-ing" data-l="cheese" data-c="#ffd84d">+ Cheese</button>
              <button class="btn btn-outline btn-sm bd-ing" data-l="tomato" data-c="#ff5b6e">+ Tomato</button>
            </div>
            <button class="btn btn-primary btn-sm" id="bd-build">build()</button>
            <button class="btn btn-ghost btn-sm" id="bd-reset">reset</button>
          </div>
          <div id="bd-burger" style="display:flex;flex-direction:column-reverse;align-items:center;justify-content:flex-end;height:200px;padding:0.5rem;background:var(--bg-1);border-radius:var(--r-md);border:1px solid var(--stroke);overflow:hidden;"></div>
        </div>
      </div>`,
      attach: () => {
        const queue = [];
        document.querySelectorAll('.bd-ing').forEach(b => {
          b.addEventListener('click', () => {
            queue.push({ label: b.dataset.l, color: b.dataset.c });
            b.style.transform = 'scale(0.95)';
            setTimeout(() => b.style.transform = '', 120);
          });
        });
        document.getElementById('bd-build').addEventListener('click', () => {
          const target = document.getElementById('bd-burger');
          target.innerHTML = '';
          queue.forEach((ing, i) => {
            setTimeout(() => {
              const layer = document.createElement('div');
              layer.style.cssText = `width:75%;height:18px;background:${ing.color};border-radius:6px;margin-bottom:2px;animation:fade-in 0.3s ease;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:grid;place-items:center;font-size:0.7rem;color:rgba(0,0,0,0.5);font-weight:700;text-transform:uppercase;`;
              layer.textContent = ing.label;
              target.appendChild(layer);
            }, i * 200);
          });
        });
        document.getElementById('bd-reset').addEventListener('click', () => {
          queue.length = 0;
          document.getElementById('bd-burger').innerHTML = '';
        });
      }
    }),

    prototype: () => ({
      html: `<div class="viz-hero" data-viz="prototype">
        <div style="display:grid;grid-template-columns:1fr 1.2fr;gap:2rem;align-items:center;">
          <div>
            <h3 style="margin-bottom:0.6rem;color:var(--ink);">Clone, don't construct</h3>
            <p style="color:var(--ink-mid);font-size:0.9rem;margin-bottom:1rem;">Each clone is a deep copy of the prototype.</p>
            <button class="btn btn-primary" id="pt-clone">clone()</button>
            <button class="btn btn-ghost btn-sm" id="pt-reset">reset</button>
            <div style="margin-top:1rem;font-family:var(--font-code);font-size:0.85rem;color:var(--ink-mid);">Clones: <span id="pt-count" style="color:#2fd48a;font-weight:700;">0</span></div>
          </div>
          <div id="pt-stage" style="position:relative;height:200px;background:var(--bg-1);border-radius:var(--r-md);border:1px solid var(--stroke);display:flex;flex-wrap:wrap;gap:0.4rem;padding:0.6rem;align-content:flex-start;overflow:hidden;">
            <div style="width:46px;height:46px;border-radius:var(--r-sm);background:var(--p-prototype);display:grid;place-items:center;font-weight:800;color:#0b0b22;">P</div>
          </div>
        </div>
      </div>`,
      attach: () => {
        let count = 0;
        document.getElementById('pt-clone').addEventListener('click', () => {
          count++;
          const stage = document.getElementById('pt-stage');
          const clone = document.createElement('div');
          clone.style.cssText = `width:46px;height:46px;border-radius:var(--r-sm);background:var(--p-prototype);display:grid;place-items:center;font-weight:800;color:#0b0b22;animation:fade-in 0.4s ease;opacity:0.85;`;
          clone.textContent = 'P' + count;
          stage.appendChild(clone);
          document.getElementById('pt-count').textContent = count;
          if (stage.children.length > 18) stage.removeChild(stage.children[1]);
        });
        document.getElementById('pt-reset').addEventListener('click', () => {
          count = 0;
          const stage = document.getElementById('pt-stage');
          while (stage.children.length > 1) stage.removeChild(stage.lastChild);
          document.getElementById('pt-count').textContent = '0';
        });
      }
    })
  };

  return {
    mini: (id) => mini[id] || mini.singleton,
    hero: (id) => hero[id] ? hero[id]() : { html: '', attach: () => {} }
  };
})();

window.PatternViz = PatternViz;
