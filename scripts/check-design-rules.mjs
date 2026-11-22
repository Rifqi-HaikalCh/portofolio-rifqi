#!/usr/bin/env node
/*
  Automated guardrail for DesignRules.md (§3.2, §5, §13, §15).
  Usage: node scripts/check-design-rules.mjs [--report]
  --report prints findings but exits 0 (used while Phase 4 retires legacy code).
*/
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const reportOnly = process.argv.includes('--report');
const toPosix = (p) => p.split(sep).join('/');

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const srcFiles = walk(join(root, 'src'));
const tsxFiles = srcFiles.filter((f) => f.endsWith('.tsx'));

/* ---- 1. Banned patterns in components ---------------------------------- */

const rules = [
  { id: 'hex-literal', re: /#[0-9a-fA-F]{3,8}\b(?![\w-])/g, why: 'Hardcoded hex color in TSX (§5)', allow: ['src/app/opengraph-image.tsx'] },
  { id: 'color-fn', re: /\b(?:rgba?|hsla?|oklch)\(\s*\d/g, why: 'Literal color function in TSX (§5)', allow: ['src/app/opengraph-image.tsx'] },
  { id: 'big-radius', re: /\brounded-(?:[trbl]{1,2}-)?(?:xl|2xl|3xl)\b/g, why: 'Radius above 4px (§5.4)' },
  { id: 'rounded-full', re: /\brounded-full\b/g, why: 'rounded-full outside EQbot avatar / presence dot (§5.4)', allow: ['src/components/shared/EqbotCompanion.tsx'] },
  { id: 'glass', re: /\bbackdrop-blur(?:-\w+)?\b/g, why: 'Glassmorphism (§3.2)' },
  { id: 'gradient', re: /\b(?:bg-gradient-to-\w+|bg-linear-\w+|bg-radial(?:-\w+)?|bg-conic(?:-\w+)?|bg-clip-text|text-transparent)\b/g, why: 'Gradient / clipped text (§3.2)' },
  { id: 'dark-variant', re: /\bdark:(?!(?:hidden|block|inline-block|inline)\b)[\w/[\]-]+/g, why: 'Ad-hoc dark: utility; switch tokens in .dark instead (§5.3)' },
  { id: 'z-arbitrary', re: /\bz-(?:\[[^\]]+\]|\d+\b)/g, why: 'Arbitrary or numeric z-index; use z-* layer tokens (§5.5)' },
  { id: 'z-legacy', re: /\bz-(?:background|content|floating|navigation|modal|notification|loading)(?![\w-])/g, why: 'Retired z-index class with no definition; use z-* layer tokens (§5.5)' },
  { id: 'heavy-weight', re: /\bfont-(?:black|extrabold)\b/g, why: 'Forbidden font weight (§6)' },
  { id: 'transition-all', re: /\btransition-all\b/g, why: 'transition-all (§10.2)' },
  { id: 'truncate', re: /\btruncate\b/g, why: 'Destructive truncation (§6)' },
  { id: 'hover-scale', re: /\b(?:hover:scale-\w+|whileHover)\b/g, why: 'Hover scale / tilt (§3.2)' },
  { id: 'legacy-palette', re: /\b(?:bg|text|border|from|to|via|ring)-(?:emerald|purple|violet|indigo|fuchsia|pink|cyan|teal|blue|gray|slate|zinc)-\d{2,3}\b/g, why: 'Off-system Tailwind palette (§3.2)' },
];

const findings = [];

for (const file of tsxFiles) {
  const rel = toPosix(relative(root, file));
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  for (const rule of rules) {
    if (rule.allow?.includes(rel)) continue;
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
      for (const m of line.matchAll(rule.re)) {
        findings.push({ rule: rule.id, where: `${rel}:${i + 1}`, detail: m[0], why: rule.why });
      }
    });
  }
}

/* ---- 2. Data integrity -------------------------------------------------- */

let data;
try {
  data = await import(pathToFileURL(join(root, 'src/data/portfolio.ts')).href);
} catch (error) {
  findings.push({ rule: 'data-load', where: 'src/data/portfolio.ts', detail: String(error.message ?? error).split('\n')[0], why: 'Could not load portfolio data (needs Node 22.18+ type stripping)' });
}

if (data) {
  const assetRefs = new Set();
  const visit = (value, path) => {
    if (typeof value === 'string') {
      if (value.startsWith('/assets/') || value.startsWith('/brand/')) assetRefs.add(`${value}\u0000${path}`);
      return;
    }
    if (Array.isArray(value)) value.forEach((v, i) => visit(v, `${path}[${i}]`));
    else if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) visit(v, `${path}.${k}`);
    }
  };
  for (const [name, value] of Object.entries(data)) visit(value, name);

  for (const entry of assetRefs) {
    const [url, path] = entry.split('\u0000');
    const file = join(root, 'public', decodeURI(url.split('?')[0]));
    if (!existsSync(file)) findings.push({ rule: 'missing-asset', where: path, detail: url, why: 'Data points to a file that does not exist (§13)' });
  }

  for (const cat of data.certificateCategories ?? []) {
    if (typeof cat.count === 'number' && cat.count !== cat.certificates?.length) {
      findings.push({ rule: 'cert-count', where: `certificateCategories.${cat.id ?? cat.name}`, detail: `count ${cat.count} ≠ ${cat.certificates?.length}`, why: 'Certificate count mismatch (§13)' });
    }
  }

  const pairs = [['title', 'titleId'], ['description', 'descriptionId'], ['labelEn', 'labelId'], ['label', 'labelId']];
  const checkPairs = (value, path) => {
    if (Array.isArray(value)) return value.forEach((v, i) => checkPairs(v, `${path}[${i}]`));
    if (!value || typeof value !== 'object') return;
    for (const [en, id] of pairs) {
      if (en in value && id in value && (!String(value[en]).trim() || !String(value[id]).trim())) {
        findings.push({ rule: 'bilingual', where: path, detail: `${en}/${id}`, why: 'Empty EN or ID copy (§13)' });
      }
    }
    for (const [k, v] of Object.entries(value)) checkPairs(v, `${path}.${k}`);
  };
  for (const [name, value] of Object.entries(data)) checkPairs(value, name);
}

/* ---- 3. Orphan public files --------------------------------------------- */

const sourceText = srcFiles
  .filter((f) => /\.(tsx?|css|json)$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

for (const file of walk(join(root, 'public'))) {
  const web = '/' + toPosix(relative(join(root, 'public'), file));
  if (web.startsWith('/brand/')) continue; // brand source exports are kept on purpose
  const name = web.split('/').pop();
  if (!sourceText.includes(web) && !sourceText.includes(encodeURI(web)) && !sourceText.includes(name)) {
    findings.push({ rule: 'orphan-asset', where: `public${web}`, detail: name, why: 'File in public/ not referenced by code or data (§9.5)' });
  }
}

/* ---- Report --------------------------------------------------------------- */

if (findings.length === 0) {
  console.log('check:design — no violations.');
  process.exit(0);
}

const byRule = Map.groupBy ? Map.groupBy(findings, (f) => f.rule) : findings.reduce((m, f) => m.set(f.rule, [...(m.get(f.rule) ?? []), f]), new Map());
for (const [rule, list] of byRule) {
  console.log(`\n✗ ${rule} (${list.length}) — ${list[0].why}`);
  for (const f of list.slice(0, 40)) console.log(`   ${f.where}  ${f.detail}`);
  if (list.length > 40) console.log(`   … ${list.length - 40} more`);
}
console.log(`\ncheck:design — ${findings.length} violation(s) in ${byRule.size} rule(s).`);
process.exit(reportOnly ? 0 : 1);
