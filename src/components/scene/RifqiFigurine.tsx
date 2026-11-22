/*
  Rifqi paper figurine — 2D poster (DesignRules.md §2.6).
  Front view from the owner's turnaround: quilled curls on top with a low taper
  fade, warm light-brown skin, charcoal crew-neck tee, faded straight denim,
  grey sneakers with off-white soles and no brand marks.

  The shaded half of every part sits in one group mirrored by --light-x, so the
  figure is lit from the window (left) in light mode and the lamp (right) in dark.

  crop="head" reuses the same drawing as the EQbot avatar (one identity, §2.6).
*/

type Crop = 'full' | 'head';

const VIEWBOX: Record<Crop, string> = {
  full: '0 0 200 460',
  head: '50 6 100 100',
};

const cut = { stroke: 'var(--paper-cut)', strokeWidth: 1.2 } as const;

/* Quilled curls: coiled strips placed in rows across the crown. */
const curls: ReadonlyArray<readonly [number, number, number]> = [
  [84, 20, 8], [98, 17, 8], [112, 20, 8], [124, 25, 7],
  [74, 30, 8], [88, 29, 9], [102, 28, 9], [116, 30, 9], [129, 35, 7],
  [69, 42, 7], [81, 40, 8], [95, 39, 8], [109, 40, 8], [122, 42, 8], [132, 47, 6],
  [68, 52, 5], [132, 54, 5],
];

function coil(cx: number, cy: number, r: number) {
  const a = r * 0.35;
  const b = r * 0.65;
  return `M${cx - a} ${cy}a${a} ${a} 0 1 1 ${a} ${a}a${b} ${b} 0 1 1 ${-b} ${-b}`;
}

export function RifqiFigurine({
  crop = 'full',
  className = '',
  style,
  title,
}: {
  crop?: Crop;
  className?: string;
  style?: React.CSSProperties;
  /** Provide only where the figurine carries meaning; otherwise it is decorative. */
  title?: string;
}) {
  const decorative = !title;
  return (
    <svg
      viewBox={VIEWBOX[crop]}
      className={className}
      style={style}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={title}
      focusable="false"
    >
      {/* Contact shadow on the desk */}
      {crop === 'full' && <ellipse cx="100" cy="452" rx="64" ry="6" fill="var(--paper-shadow)" />}

      <g style={{ filter: 'var(--paper-drop-sm)' }}>
        {/* Sneakers */}
        <path d="M52 420h44l4 20-54 4q-4-8 6-24z" fill="var(--ill-sneaker)" {...cut} />
        <path d="M148 420h-44l-4 20 54 4q4-8-6-24z" fill="var(--ill-sneaker)" {...cut} />
        <rect x="44" y="440" width="58" height="8" rx="2" fill="var(--ill-sole)" />
        <rect x="98" y="440" width="58" height="8" rx="2" fill="var(--ill-sole)" />
        <path d="M66 426l12-2M68 432l12-2M134 426l-12-2M132 432l-12-2" stroke="var(--ill-sole)" strokeWidth="2" />

        {/* Jeans: straight fit, faded thighs */}
        <path d="M60 248h80l6 172h-42l-4-120-4 120H54z" fill="var(--ill-denim)" {...cut} />
        <path d="M66 262h24l2 70H72z" fill="var(--ill-denim-fade)" opacity="0.75" />
        <path d="M134 262h-24l-2 70h20z" fill="var(--ill-denim-fade)" opacity="0.75" />
        <path d="M100 252v48" stroke="var(--ill-denim-fade)" strokeWidth="1.5" />

        {/* Arms */}
        <path d="M42 188l16 6-2 96q-6 10-14 6l-2-46z" fill="var(--ill-skin)" {...cut} />
        <path d="M158 188l-16 6 2 96q6 10 14 6l2-46z" fill="var(--ill-skin)" {...cut} />

        {/* T-shirt: short sleeves, crew neck */}
        <path
          d="M54 140q8-8 34-8h24q26 0 34 8l16 50-18 6-2 56H58l-2-56-18-6z"
          fill="var(--ill-shirt)"
          {...cut}
        />
        <path d="M88 132q12 14 24 0" fill="none" stroke="var(--ill-hair-hi)" strokeWidth="2.5" />
        <path d="M56 196l-2-6M144 196l2-6" stroke="var(--ill-hair-hi)" strokeWidth="1.5" />

        {/* Neck and ears */}
        <rect x="90" y="118" width="20" height="18" fill="var(--ill-skin-shade)" />
        <ellipse cx="68" cy="82" rx="6" ry="9" fill="var(--ill-skin-shade)" />
        <ellipse cx="132" cy="82" rx="6" ry="9" fill="var(--ill-skin-shade)" />

        {/* Face */}
        <path d="M70 50q0-20 30-20t30 22v40q0 28-30 32-30-4-30-32z" fill="var(--ill-skin)" {...cut} />

        {/* Taper fade: hair colour thinned over the skin at the sides */}
        <path d="M69 46h8l-3 32-5-3z" fill="var(--ill-hair)" opacity="0.38" />
        <path d="M131 46h-8l3 32 5-3z" fill="var(--ill-hair)" opacity="0.38" />

        {/* Hair base under the curls */}
        <path d="M66 58q-2-38 34-42 36 4 34 42l-6-8q-28-12-56 0z" fill="var(--ill-hair)" />
      </g>

      {/* Quilled curls */}
      <g>
        {curls.map(([cx, cy, r]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={r} fill="var(--ill-hair)" />
            <path d={coil(cx, cy, r)} fill="none" stroke="var(--ill-hair-hi)" strokeWidth="1.2" />
          </g>
        ))}
      </g>

      {/* Face details: brows, almond eyes, nose fold, calm mouth */}
      <path d="M80 72l15-2v3l-15 2zM120 72l-15-2v3l15 2z" fill="var(--ill-hair)" />
      <path d="M81 85q7-8 14 0-7 6-14 0zM119 85q-7-8-14 0 7 6 14 0z" fill="var(--ill-hair)" />
      <circle cx="90" cy="83.5" r="1.3" fill="var(--ill-page)" />
      <circle cx="114" cy="83.5" r="1.3" fill="var(--ill-page)" />
      <path d="M100 88l-3 13 5 1" fill="none" stroke="var(--ill-skin-shade)" strokeWidth="2" />
      <path d="M92 110q8 4 16 0" fill="none" stroke="var(--ill-skin-shade)" strokeWidth="2" strokeLinecap="round" />

      {/* Shaded half, mirrored toward the light source by --light-x */}
      <g
        style={{ transform: 'scaleX(var(--light-x))', transformOrigin: '100px 0px', transformBox: 'view-box' }}
        fill="var(--paper-fold)"
      >
        {/* Cheek plane only: a fold at the side of the face, not a split down the nose. */}
        <path d="M116 36q14 6 14 16v40q0 24-20 31 10-34 6-87z" />
        <path d="M100 134h12q26 0 34 6l16 50-18 6-2 56h-42z" />
        <path d="M100 300l4 120h42l-6-172h-40z" />
        <path d="M158 188l-16 6 2 96q6 10 14 6l2-46z" />
      </g>
    </svg>
  );
}
