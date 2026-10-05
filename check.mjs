// Static consistency checks. Run: node check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const pages = [
  { html: 'index.html', dictionary: 'translations.js', css: ['style.css'] },
  { html: 'speaker/index.html', dictionary: 'speaker/translations.js', css: ['style.css'] },
  { html: 'sponsor/index.html', dictionary: 'sponsor/translations.js', css: [] },
];

const errors = [];
const warnings = [];
const read = (path) => readFileSync(path, 'utf8');
const all = (text, re) => [...text.matchAll(re)].map((m) => m[1]);

for (const page of pages) {
  const html = read(page.html);

  // i18n keys: the HTML uses each key, the English dictionary defines it, no key is defined twice.
  const dictionaryKeys = all(read(page.dictionary), /^\s*['"]([\w-]+)['"]\s*:/gm);
  const duplicates = dictionaryKeys.filter((key, i) => dictionaryKeys.indexOf(key) !== i);
  const htmlKeys = new Set(all(html, /data-i18n(?:-html|-aria)?="([^"]+)"/g));
  const dictionarySet = new Set(dictionaryKeys);
  for (const key of duplicates) errors.push(`${page.dictionary}: duplicate key "${key}"`);
  for (const key of htmlKeys) if (!dictionarySet.has(key)) errors.push(`${page.html}: "${key}" has no English translation`);
  for (const key of dictionarySet) if (!htmlKeys.has(key) && key !== 'page-title') errors.push(`${page.dictionary}: "${key}" is not used in ${page.html}`);

  // Local files referenced by the page exist.
  for (const ref of all(html, /(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|#|\/$)/.test(ref)) continue;
    const path = join(dirname(page.html), ref.split(/[?#]/)[0]);
    if (ref.split(/[?#]/)[0] && !existsSync(path)) errors.push(`${page.html}: missing file "${ref}"`);
  }

  // Classes used in the HTML are defined by the page's stylesheets or inline <style>.
  const styles = [...page.css.map(read), ...all(html, /<style[^>]*>([\s\S]*?)<\/style>/g)].join('\n');
  const defined = new Set(all(styles, /\.([a-zA-Z_][\w-]*)/g));
  const used = new Set(all(html, /class="([^"]+)"/g).flatMap((value) => value.split(/\s+/)));
  for (const name of used) if (name && !defined.has(name)) warnings.push(`${page.html}: class "${name}" has no CSS rule`);
}

for (const message of warnings) console.warn('warn  ' + message);
for (const message of errors) console.error('error ' + message);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
