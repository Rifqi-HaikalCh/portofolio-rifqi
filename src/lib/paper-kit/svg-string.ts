import { Fragment, isValidElement, type ReactNode } from 'react';

/*
  Static SVG markup from scene JSX (DesignRules.md §9.2, §9.6).

  Station art is thousands of static <use>/<path> elements. Rendered as React
  elements, every one of them is hydrated on the client, which costs long
  frames on scroll. Serialised to a string on the server and placed with
  dangerouslySetInnerHTML, the browser paints the same SVG and React skips it.

  Handles exactly what scene art uses: host elements, fragments, arrays,
  hook-free function components, text, numbers. Server-only by use.
*/

const KEEP = new Set(['viewBox', 'preserveAspectRatio', 'gradientTransform', 'gradientUnits', 'patternUnits', 'stdDeviation', 'href']);

const attrName = (name: string) => {
  if (name === 'className') return 'class';
  if (KEEP.has(name) || name.startsWith('data-') || name.startsWith('aria-')) return name;
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
};

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function styleString(style: Record<string, unknown>) {
  return Object.entries(style)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k.startsWith('--') ? k : k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${String(v)}`)
    .join(';');
}

export function svgString(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return esc(String(node));
  if (Array.isArray(node)) return node.map(svgString).join('');
  if (!isValidElement(node)) return '';

  const { type } = node;
  const props = node.props as Record<string, unknown> & { children?: ReactNode };

  if (type === Fragment) return svgString(props.children);
  if (typeof type === 'function') return svgString((type as (p: unknown) => ReactNode)(props));
  if (typeof type !== 'string') return '';

  let attrs = '';
  for (const [key, value] of Object.entries(props)) {
    if (key === 'children' || key === 'key' || value === undefined || value === null || value === false) continue;
    if (key === 'style') {
      const css = styleString(value as Record<string, unknown>);
      if (css) attrs += ` style="${esc(css)}"`;
      continue;
    }
    attrs += ` ${attrName(key)}="${esc(String(value))}"`;
  }
  return `<${type}${attrs}>${svgString(props.children)}</${type}>`;
}
