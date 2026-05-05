// ── Language switching ──
let currentLang = localStorage.getItem('sit-lang') || 'fr';

function setLang(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const t = i18n[lang][el.dataset.i18n];
    if (t !== undefined) el.textContent = t;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const t = i18n[lang][el.dataset.i18nHtml];
    if (t !== undefined) el.innerHTML = t;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem('sit-lang', lang);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

setLang(currentLang);

// ── Live countdown to 2026-09-25 09:00 Paris time ──
(function () {
  const target = new Date('2026-09-25T09:00:00+02:00').getTime();
  const pad = (n) => String(n).padStart(2, '0');
  const cells = {
    d: document.querySelector('[data-cd="d"]'),
    h: document.querySelector('[data-cd="h"]'),
    m: document.querySelector('[data-cd="m"]'),
    s: document.querySelector('[data-cd="s"]'),
  };
  function tick() {
    let remaining = Math.max(0, target - Date.now());
    const days = Math.floor(remaining / 86400000); remaining -= days * 86400000;
    const hrs  = Math.floor(remaining / 3600000);  remaining -= hrs * 3600000;
    const min  = Math.floor(remaining / 60000);    remaining -= min * 60000;
    const sec  = Math.floor(remaining / 1000);
    cells.d.textContent = pad(days);
    cells.h.textContent = pad(hrs);
    cells.m.textContent = pad(min);
    cells.s.textContent = pad(sec);
  }
  tick();
  setInterval(tick, 1000);
})();
