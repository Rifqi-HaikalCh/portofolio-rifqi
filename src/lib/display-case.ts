/*
  Job titles and company names are stored in capitals in portfolio.ts.
  displayCase turns them into title case for running text, keeping acronyms.
  "IT SOFTWARE DEVELOPER" → "IT Software Developer".
*/

const KEEP_UPPER = new Set(['IT', 'TI', 'PT', 'PHR', 'HSE', 'UI', 'UX', 'API', 'SQL', 'BEM', 'GDSC']);

export function displayCase(value: string): string {
  return value
    .split(/(\s+)/)
    .map((word) => {
      if (/^\s+$/.test(word) || KEEP_UPPER.has(word)) return word;
      if (word.startsWith('(') && KEEP_UPPER.has(word.replace(/[()]/g, ''))) return word;
      return word.charAt(0) + word.slice(1).toLowerCase();
    })
    .join('');
}
