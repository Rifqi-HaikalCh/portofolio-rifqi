import { T } from '../ui/T';

/*
  Career path (`03` Experience, mobile, v3.16, owner request): a winding paper road
  with one milestone per role, newest first. While the visitor swipes through the role
  folders, the road is drawn in accent, each milestone lights as its folder comes up
  and a paper pin walks the road (CSS scroll-driven, chapter.css). Decorative: every
  role is on its own sheet, so the road is `aria-hidden`. Hidden from 768 px up.
*/
const W = 340;
const H = 92;
const PAD = 16;

export function CareerPath({ years }: { years: string[] }) {
  const n = years.length;
  if (n < 2) return null;
  const pts = years.map((year, i) => ({
    year,
    x: PAD + (i * (W - PAD * 2)) / (n - 1),
    y: 40 + (i % 2 ? -14 : 14),
  }));
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const q = pts[i - 1];
      const mx = (q.x + p.x) / 2;
      return `C${mx} ${q.y} ${mx} ${p.y} ${p.x} ${p.y}`;
    })
    .join('');

  return (
    <div className="career-path" aria-hidden="true">
      <p className="mb-1 flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
        <T en="Career path" id="Jalur karier" />
        <span className="cp-swipe">
          <T en="Swipe" id="Geser" /> →
        </span>
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" focusable="false">
        <path d={d} className="cp-road" fill="none" pathLength={1} />
        <path d={d} className="cp-trail" fill="none" pathLength={1} />
        {pts.map((p, i) => (
          <g key={`${p.year}-${i}`} style={{ '--p': i / (n - 1) } as React.CSSProperties}>
            <circle cx={p.x} cy={p.y} r="6.5" className="cp-ring" />
            <circle cx={p.x} cy={p.y} r="3.4" className="cp-dot" />
            <text x={p.x} y={p.y + (i % 2 ? -12 : 20)} textAnchor="middle" className="cp-year">
              {p.year}
            </text>
          </g>
        ))}
        <g className="cp-pin" style={{ offsetPath: `path("${d}")` }}>
          <path d="M0 0l-4.6-9.4a5.2 5.2 0 1 1 9.2 0z" />
          <circle cy="-12.6" r="1.9" />
        </g>
      </svg>
    </div>
  );
}
