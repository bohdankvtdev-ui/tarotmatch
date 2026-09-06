(function () {
  const rootAttr = document.documentElement.getAttribute('data-root') || '.';
  const root = rootAttr.replace(/\/$/, '');
  const page = document.documentElement.getAttribute('data-page') || '';
  const site = window.TAROT_MATCH || { name: 'Tarot Match', email: 'bohdankvtdev@gmail.com', year: 2026 };

  const header = document.querySelector('[data-header]');
  const footer = document.querySelector('[data-footer]');

  if (header) {
    header.innerHTML = `
      <div class="nav">
        <a class="brand" href="${root}/">
          <img src="${root}/assets/icon.png" alt="Tarot Match" width="40" height="40" />
          TAROT MATCH
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="${root}/" class="${page === 'home' ? 'is-active' : ''}">Home</a>
          <a href="${root}/support/" class="${page === 'support' ? 'is-active' : ''}">Support</a>
          <a href="${root}/privacy/" class="${page === 'privacy' ? 'is-active' : ''}">Privacy</a>
          <a href="mailto:${site.email}">Mail</a>
        </nav>
      </div>`;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="foot">
        <span>© ${site.year} ${site.name}</span>
        <nav>
          <a href="${root}/support/">Support</a>
          <a href="${root}/privacy/">Privacy</a>
          <a href="mailto:${site.email}">${site.email}</a>
        </nav>
      </div>`;
  }

  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = site.email;
    if (el.tagName === 'A') el.href = `mailto:${site.email}`;
  });

  const store = document.querySelector('[data-app-store]');
  if (store && site.appStoreUrl) store.href = site.appStoreUrl;
})();
