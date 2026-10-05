// Static consistency checks. Run from anywhere: node tools/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  { html: 'index.html', dictionary: 'lang/home.js', css: ['css/style.css'] },
  { html: 'speaker/index.html', dictionary: 'lang/speaker.js', css: ['css/style.css'] },
  { html: 'sponsor/index.html', dictionary: 'lang/sponsor.js', css: [] },
];

const errors = [];
const warnings = [];
const read = (path) => readFileSync(join(root, path), 'utf8');
const all = (text, re) => [...text.matchAll(re)].map((m) => m[1]);
const isLocalReference = (ref) => !/^(https?:|mailto:|tel:|data:|#|\/$)/.test(ref);

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
    const file = ref.split(/[?#]/)[0];
    if (isLocalReference(ref) && file && !existsSync(join(root, dirname(page.html), file))) {
      errors.push(`${page.html}: missing file "${ref}"`);
    }
  }

  // Classes used in the HTML are defined by the page's stylesheets or inline <style>.
  const styles = [...page.css.map(read), ...all(html, /<style[^>]*>([\s\S]*?)<\/style>/g)].join('\n');
  const defined = new Set(all(styles, /\.([a-zA-Z_][\w-]*)/g));
  const used = new Set(all(html, /class="([^"]+)"/g).flatMap((value) => value.split(/\s+/)));
  for (const name of used) if (name && !defined.has(name)) warnings.push(`${page.html}: class "${name}" has no CSS rule`);
}

// Files referenced by url() in stylesheets exist (paths are relative to the stylesheet).
for (const stylesheet of new Set(pages.flatMap((page) => page.css))) {
  for (const ref of all(read(stylesheet), /url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    if (isLocalReference(ref) && !existsSync(join(root, dirname(stylesheet), ref))) {
      errors.push(`${stylesheet}: missing file "${ref}"`);
    }
  }
}

for (const message of warnings) console.warn('warn  ' + message);
for (const message of errors) console.error('error ' + message);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
