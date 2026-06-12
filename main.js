// ── Theme toggle ──
(function () {
  const btn  = document.getElementById('themeToggle');
  const root = document.documentElement;

  /* Always start in light mode – no localStorage restore */
  root.removeAttribute('data-theme');

  if (!btn) return;
  btn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'dark');
    }
    updateThemeLabel();
  });
})();

// ── Theme toggle accessible label (reflects state + language) ──
const themeLabels = {
  fr: { toDark: 'Activer le mode sombre', toLight: 'Activer le mode clair' },
  en: { toDark: 'Switch to dark mode',    toLight: 'Switch to light mode' },
};
function updateThemeLabel() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const l = themeLabels[currentLang] || themeLabels.fr;
  btn.setAttribute('aria-label', isDark ? l.toLight : l.toDark);
  btn.setAttribute('aria-pressed', String(isDark));
}

// ── Hamburger menu ──
(function () {
  const burger = document.querySelector('.nav-burger');
  const links  = document.querySelector('.nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
})();

// ── Language switching ──
// The HTML is the FR source of truth. i18n.js only holds EN overrides.
// We snapshot the rendered FR content once, then swap to EN and back.
let currentLang = 'fr';

const i18nFallback = { text: {}, html: {} };
document.querySelectorAll('[data-i18n]').forEach(el => {
  const k = el.dataset.i18n;
  if (!(k in i18nFallback.text)) i18nFallback.text[k] = el.textContent;
});
document.querySelectorAll('[data-i18n-html]').forEach(el => {
  const k = el.dataset.i18nHtml;
  if (!(k in i18nFallback.html)) i18nFallback.html[k] = el.innerHTML;
});

function setLang(lang) {
  currentLang = lang;
  // FR → restore the original HTML; other langs → use the overrides in i18n.js
  const dict = (lang === 'fr') ? null
             : (typeof i18n !== 'undefined' ? i18n[lang] : null);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    const val = dict ? dict[k] : i18nFallback.text[k];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.dataset.i18nHtml;
    const val = dict ? dict[k] : i18nFallback.html[k];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  updateThemeLabel();
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

// ── Register modal (waitlist — tickets not open yet) ──
(function () {
  const openBtn = document.getElementById('registerBtn');
  const modal   = document.getElementById('registerModal');
  if (!openBtn || !modal) return;

  const closeEls = modal.querySelectorAll('#registerModalClose, #registerModalDismiss');
  let lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('open'));
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('#registerModalClose');
    if (closeBtn) closeBtn.focus();
  }
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    const onEnd = () => { modal.hidden = true; modal.removeEventListener('transitionend', onEnd); };
    modal.addEventListener('transitionend', onEnd);
    if (lastFocus) lastFocus.focus();
  }

  openBtn.addEventListener('click', open);
  closeEls.forEach(el => el.addEventListener('click', close));
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
