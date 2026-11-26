const files = {
  mark: { light: '/brand/logo-mark.svg', dark: '/brand/logo-mark-dark.svg', width: 288, height: 147 },
  horizontal: { light: '/brand/logo-horizontal.svg', dark: '/brand/logo-horizontal-dark.svg', width: 645, height: 144 },
  badge: { light: '/brand/logo-badge.svg', dark: '/brand/logo-badge-dark.svg', width: 512, height: 512 },
} as const;

/*
  Both inks are in the HTML and the `dark` class picks one, so the lockup is
  right on the first paint and needs no client JS.
  `paper` follows the page; `ink` sits on the footer, which flips with the theme.
*/
export function BrandLockup({
  variant,
  surface = 'paper',
  className = '',
  label = 'Rifqi Haikal',
}: {
  variant: keyof typeof files;
  surface?: 'paper' | 'ink';
  className?: string;
  label?: string;
}) {
  const asset = files[variant];
  const [lightSrc, darkSrc] = surface === 'ink' ? [asset.dark, asset.light] : [asset.light, asset.dark];
  const shared = { width: asset.width, height: asset.height, draggable: false } as const;

  // Vector lockups: next/image would add nothing but a wrapper request.
  /* eslint-disable @next/next/no-img-element */
  return (
    <>
      <img src={lightSrc} alt={label} {...shared} className={`block dark:hidden ${className}`} />
      <img src={darkSrc} alt={label} {...shared} className={`hidden dark:block ${className}`} />
    </>
  );
  /* eslint-enable @next/next/no-img-element */
}
