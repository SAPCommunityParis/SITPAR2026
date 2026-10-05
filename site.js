// Behaviour shared by every page: language switching, dark theme, mobile menu.
//
// The HTML is the French source of truth. Each page loads a translations.js
// that defines `translations = { en: { key: 'text', ... } }`; this file swaps
// the French content for those English overrides and back.
(function () {
  const root = document.documentElement;

  // A fresh visit starts in French, but a link followed from the English
  // version of another page carries ?lang=en so this page opens in English too.
  let currentLang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'fr';

  // ── Language ──
  const french = { text: {}, html: {}, aria: {}, title: document.title };
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    french.text[el.dataset.i18n] = el.textContent;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    french.html[el.dataset.i18nHtml] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    french.aria[el.dataset.i18nAria] = el.getAttribute('aria-label');
  });

  function applyTranslations(lang) {
    const dictionary = lang === 'fr' || typeof translations === 'undefined' ? null : translations[lang];
    const translated = (key, frenchValue) => (dictionary && dictionary[key] != null ? dictionary[key] : frenchValue);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = translated(el.dataset.i18n, french.text[el.dataset.i18n]);
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = translated(el.dataset.i18nHtml, french.html[el.dataset.i18nHtml]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', translated(el.dataset.i18nAria, french.aria[el.dataset.i18nAria]));
    });
    document.title = translated('page-title', french.title);
  }

  // Links to another page of the site (marked data-keep-lang) carry the current
  // language, so reading in English and following one doesn't drop back to French.
  const keepLangLinks = [...document.querySelectorAll('a[data-keep-lang]')].map((link) => {
    const href = link.getAttribute('href');
    const hashAt = href.indexOf('#');
    return {
      link,
      path: (hashAt === -1 ? href : href.slice(0, hashAt)).split('?')[0],
      hash: hashAt === -1 ? '' : href.slice(hashAt),
    };
  });

  function syncKeepLangLinks(lang) {
    const query = lang === 'fr' ? '' : '?lang=' + lang;
    keepLangLinks.forEach(({ link, path, hash }) => link.setAttribute('href', path + query + hash));
  }

  function setLang(lang) {
    currentLang = lang;
    applyTranslations(lang);
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
    });
    root.lang = lang;
    updateThemeLabel();
    syncKeepLangLinks(lang);
  }

  // ── Theme ──
  const themeLabels = {
    fr: { toDark: 'Activer le mode sombre', toLight: 'Activer le mode clair' },
    en: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
  };
  const themeButton = document.getElementById('themeToggle');

  function updateThemeLabel() {
    if (!themeButton) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    const labels = themeLabels[currentLang] || themeLabels.fr;
    themeButton.setAttribute('aria-label', isDark ? labels.toLight : labels.toDark);
    themeButton.setAttribute('aria-pressed', String(isDark));
  }

  // Always start in light mode: the choice is not remembered between visits.
  root.removeAttribute('data-theme');
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      if (root.getAttribute('data-theme') === 'dark') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      updateThemeLabel();
    });
  }

  // ── Mobile menu ──
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => setLang(button.dataset.lang));
  });
  setLang(currentLang);
})();
