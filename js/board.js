(function () {
  const board = document.querySelector('[data-board]');
  if (!board) return;

  const root = (document.documentElement.getAttribute('data-root') || '.').replace(/\/$/, '');
  const back = `${root}/assets/cards/22_card_back.png`;
  const pairs = ['18_the_moon.png', '19_the_sun.png'];
  const deck = [...pairs, ...pairs].sort(() => Math.random() - 0.5);
  let open = [];
  let lock = false;

  deck.forEach((face, index) => {
    const btn = document.createElement('button');
    btn.className = 'tile';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Hidden tarot card');
    const img = document.createElement('img');
    img.src = back;
    img.alt = '';
    btn.appendChild(img);
    btn.addEventListener('click', () => {
      if (lock || btn.classList.contains('matched') || open.includes(btn)) return;
      img.src = `${root}/assets/cards/${face}`;
      open.push(btn);
      if (open.length < 2) return;
      lock = true;
      const [first, second] = open;
      const same = first.querySelector('img').src === second.querySelector('img').src;
      setTimeout(() => {
        if (same) {
          first.classList.add('matched');
          second.classList.add('matched');
        } else {
          first.querySelector('img').src = back;
          second.querySelector('img').src = back;
        }
        open = [];
        lock = false;
      }, same ? 280 : 720);
    });
    board.appendChild(btn);
    void index;
  });
})();
