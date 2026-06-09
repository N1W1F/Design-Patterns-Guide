/* ============================================================
   Visual Effects Engine
   Mouse spotlight • Particle background • 3D card tilt
   Animated counters • Confetti • Scroll reveal • Magnetic buttons
   ============================================================ */

const FX = (() => {

  // === 1. Mouse Spotlight (large soft glow following cursor) ===
  function spotlight() {
    const el = document.createElement('div');
    el.id = 'fx-spotlight';
    el.style.cssText = `
      position: fixed; pointer-events: none; z-index: 0;
      width: 600px; height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,127,255,0.18) 0%, transparent 60%);
      transform: translate(-50%, -50%);
      transition: opacity 0.4s ease;
      left: 50%; top: 50%;
      mix-blend-mode: screen;
      filter: blur(40px);
    `;
    document.body.appendChild(el);
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let x = tx, y = ty;
    window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    function loop() {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      requestAnimationFrame(loop);
    }
    loop();
  }

  // === 2. Floating Pattern Symbols Background ===
  function particles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fx-particles';
    canvas.style.cssText = `position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: 0.4;`;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const symbols = ['◇', '◈', '◊', '○', '◯', '◐', '◑', '◮', '⬡', '⬢', '⬣', '⬟', '☼', '✦', '✧'];
    const colors = ['rgba(139,127,255,', 'rgba(6,212,255,', 'rgba(255,94,219,', 'rgba(255,140,66,', 'rgba(47,212,138,'];
    const dots = [];
    const N = Math.min(40, Math.floor((w*h) / 35000));

    for (let i = 0; i < N; i++) {
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 14 + Math.random() * 18,
        s: symbols[Math.floor(Math.random() * symbols.length)],
        c: colors[Math.floor(Math.random() * colors.length)],
        a: 0.15 + Math.random() * 0.35,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.01
      });
    }

    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.rot += d.rotV;
        if (d.x < -30) d.x = w + 30;
        if (d.x > w + 30) d.x = -30;
        if (d.y < -30) d.y = h + 30;
        if (d.y > h + 30) d.y = -30;
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rot);
        ctx.fillStyle = d.c + d.a + ')';
        ctx.font = `${d.size}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(d.s, 0, 0);
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  // === 3. 3D Card Tilt on Hover ===
  function tilt(selector = '.pattern-card, .hero-stat, .fx-tilt') {
    document.addEventListener('mousemove', e => {
      const targets = document.querySelectorAll(selector);
      targets.forEach(card => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist > 280) {
          card.style.transform = '';
          return;
        }
        const rx = (-dy / r.height) * 8;
        const ry = (dx / r.width) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
    document.addEventListener('mouseleave', () => {
      document.querySelectorAll(selector).forEach(c => c.style.transform = '');
    });
  }

  // === 4. Animated Number Counter ===
  function counter(el, target, duration = 1400, suffix = '') {
    const start = parseInt(el.textContent) || 0;
    const diff = target - start;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(start + diff * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // === 5. Confetti Burst ===
  function confetti(originX, originY, count = 60) {
    const colors = ['#ffd84d', '#ff5edb', '#06d4ff', '#8b7fff', '#2fd48a', '#ff8c42'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.style.cssText = `
        position: fixed; left: ${originX}px; top: ${originY}px;
        width: 8px; height: 14px;
        background: ${colors[i % colors.length]};
        z-index: 9999; pointer-events: none;
        border-radius: 2px;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(piece);
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const velocity = 280 + Math.random() * 300;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 200;
      const rotEnd = Math.random() * 720;
      piece.animate([
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${vx}px, ${vy + 600}px) rotate(${rotEnd}deg)`, opacity: 0 }
      ], { duration: 1400 + Math.random() * 600, easing: 'cubic-bezier(.2,.6,.4,1)' });
      setTimeout(() => piece.remove(), 2000);
    }
  }

  // === 6. Scroll Reveal ===
  function reveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fx-revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fx-reveal').forEach(el => obs.observe(el));
  }
  function observeAll() {
    const targets = document.querySelectorAll('.pattern-card, .hero-stat, .card, .info-card, .decision-card');
    targets.forEach(el => el.classList.add('fx-reveal'));
    reveal();
  }

  // === 7. Magnetic Buttons (subtle attraction) ===
  function magnetic(selector = '.btn-primary, .btn-outline.btn-lg') {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x*0.18}px, ${y*0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // === 8. Animate hero stats on first paint ===
  function animateStats() {
    document.querySelectorAll('.hero-stat-num[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      el.textContent = '0';
      counter(el, target, 1500, suffix);
    });
  }

  // === 9. Page transition ===
  function pageTransition() {
    const main = document.getElementById('app');
    if (!main) return;
    main.style.opacity = '0';
    main.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      main.style.transition = 'all 0.5s var(--ease-out, cubic-bezier(0.16,1,0.3,1))';
      main.style.opacity = '1';
      main.style.transform = '';
      setTimeout(() => { main.style.transition = ''; }, 600);
    });
  }

  // === init all ===
  // STATIC MODE: keep only event-driven effects (confetti, fade-in).
  // Remove all continuous SVG animations from mini-vizes and hero demos.
  function freezeSvgs() {
    document.querySelectorAll('svg animate, svg animateTransform, svg animateMotion').forEach(a => {
      a.parentNode.removeChild(a);
    });
  }
  function init() {
    // Remove SVG <animate> elements (continuous animations)
    setTimeout(freezeSvgs, 80);
    // Re-run after route changes (new SVGs may load)
    const orig = window.go;
    if (typeof orig === 'function') {
      window.go = function(...args){
        const r = orig.apply(this, args);
        setTimeout(freezeSvgs, 100);
        return r;
      };
    }
    window.addEventListener('hashchange', () => setTimeout(freezeSvgs, 100));
  }

  return { init, confetti, counter, magnetic, pageTransition, observeAll, animateStats };
})();

window.FX = FX;
document.addEventListener('DOMContentLoaded', () => FX.init());
