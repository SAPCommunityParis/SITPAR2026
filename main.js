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

// ── Photo lightbox ──
const lightboxLabels = {
  fr: { close: 'Fermer', prev: 'Photo précédente', next: 'Photo suivante' },
  en: { close: 'Close',  prev: 'Previous photo',   next: 'Next photo' },
};
(function () {
  const dlg    = document.getElementById('lightbox');
  const thumbs = [...document.querySelectorAll('.photo-thumb')];
  if (!dlg || !thumbs.length) return;
  const img   = dlg.querySelector('img');
  const count = dlg.querySelector('.lightbox-count');
  let index = 0;

  function show(i) {
    index = (i + thumbs.length) % thumbs.length;
    const t = thumbs[index];
    img.src = t.dataset.full;
    img.alt = t.querySelector('img').alt;
    count.textContent = (index + 1) + ' / ' + thumbs.length;
    const l = lightboxLabels[currentLang] || lightboxLabels.fr;
    dlg.querySelector('[data-lb="close"]').setAttribute('aria-label', l.close);
    dlg.querySelector('[data-lb="prev"]').setAttribute('aria-label', l.prev);
    dlg.querySelector('[data-lb="next"]').setAttribute('aria-label', l.next);
  }

  thumbs.forEach((t, i) => t.addEventListener('click', () => { show(i); dlg.showModal(); }));
  dlg.querySelector('[data-lb="close"]').addEventListener('click', () => dlg.close());
  dlg.querySelector('[data-lb="prev"]').addEventListener('click', () => show(index - 1));
  dlg.querySelector('[data-lb="next"]').addEventListener('click', () => show(index + 1));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();

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
// The HTML is the FR source of truth. translations.js only holds EN overrides.
// We snapshot the rendered FR content once, then swap to EN and back.
// A fresh visit always starts in FR (no localStorage restore) — but a link
// clicked from the EN version of this page or of speaker/sponsor carries
// ?lang=en so the destination page opens in the same language.
const urlLang = new URLSearchParams(location.search).get('lang');
let currentLang = (urlLang === 'en') ? 'en' : 'fr';

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
  // FR → restore the original HTML; other langs → use the overrides in translations.js
  const dict = (lang === 'fr') ? null
             : (typeof homeTranslations !== 'undefined' ? homeTranslations[lang] : null);

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
  syncCrossPageLinks(lang);
}

// Carries the current language onto the speaker/sponsor sub-pages so a
// visitor reading the site in English doesn't land back in French there.
function syncCrossPageLinks(lang) {
  const suffix = (lang === 'fr') ? '' : ('?lang=' + lang);
  document.querySelectorAll('a[href="speaker/"], a[href="sponsor/"]').forEach(a => {
    a.setAttribute('href', a.getAttribute('href').split('?')[0] + suffix);
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

setLang(currentLang);
