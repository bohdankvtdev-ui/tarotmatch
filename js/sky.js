(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];
  let w = 0;
  let h = 0;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(220, Math.floor((w * h) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      s: Math.random() * 0.02 + 0.004,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((star) => {
      if (!reduce) {
        star.a += star.s;
        if (star.a > 1 || star.a < 0.15) star.s *= -1;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(243, 237, 230, ${0.25 + star.a * 0.7})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduce) requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  tick();
})();

(function () {
  const stage = document.querySelector('[data-fly]');
  if (!stage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = (document.documentElement.getAttribute('data-root') || '.').replace(/\/$/, '');
  const faces = [
    '0_the_fool.png',
    '1_the_magician.png',
    '2_high_priestess.png',
    '6_the_lovers.png',
    '17_the_star.png',
    '18_the_moon.png',
    '19_the_sun.png',
    '21_the_world.png',
    'ace_of_cups.png',
    'queen_of_wands.png',
    '22_card_back.png',
  ];

  function spawn(src, extraClass) {
    const el = document.createElement('div');
    el.className = `fly-card ${extraClass || ''}`;
    el.style.setProperty('--x', `${Math.random() * 90}vw`);
    el.style.setProperty('--dx', `${(Math.random() * 40 - 20).toFixed(1)}vw`);
    el.style.setProperty('--r0', `${(Math.random() * 40 - 20).toFixed(1)}deg`);
    el.style.setProperty('--r1', `${(Math.random() * 50 - 25).toFixed(1)}deg`);
    el.style.animationDuration = `${18 + Math.random() * 16}s`;
    el.style.animationDelay = `${-Math.random() * 16}s`;
    const img = document.createElement('img');
    img.src = `${root}/assets/cards/${src}`;
    img.alt = '';
    el.appendChild(img);
    stage.appendChild(el);
    return el;
  }

  faces.forEach((src) => spawn(src));

  const pairFace = '18_the_moon.png';

  function playMatch() {
    stage.querySelectorAll('.match-a, .match-b').forEach((n) => n.remove());
    const a = spawn(pairFace, 'match-a');
    const b = spawn(pairFace, 'match-b');
    a.style.animation = 'none';
    b.style.animation = 'none';
    const y = window.innerHeight * 0.38;
    a.style.transform = `translate3d(8vw, ${y + 80}px, 0) rotate(-18deg)`;
    b.style.transform = `translate3d(78vw, ${y - 40}px, 0) rotate(16deg)`;
    requestAnimationFrame(() => {
      a.style.transform = `translate3d(38vw, ${y}px, 0) rotate(-8deg)`;
      b.style.transform = `translate3d(50vw, ${y}px, 0) rotate(8deg)`;
      a.classList.add('paired');
      b.classList.add('paired');
    });
    setTimeout(() => {
      a.style.transform = `translate3d(30vw, -18vh, 0) rotate(-24deg)`;
      b.style.transform = `translate3d(60vw, -18vh, 0) rotate(24deg)`;
      a.style.opacity = b.style.opacity = '0';
    }, 1600);
  }

  playMatch();
  setInterval(playMatch, 7000);
})();
