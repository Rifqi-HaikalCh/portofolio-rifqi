import Image from 'next/image';
import type { CSSProperties } from 'react';

/*
  ProjectShadowBox (DesignRules.md §4.5 `04`, §7): a small framed shadow box
  per project. Inside, back to front: the backing and domain sheets (server-
  made paper-kit art, `art.back` / `art.mid`), then the paper laptop holding
  the real screenshot with one strip of tape. Hover or keyboard focus on the
  card separates the layers toward the viewer while each laptop's cast shadow
  stays on the backing, so the gap reads as depth (transform only).
  Without art (archive drawer) the backing is a plain recess sheet.
*/

export function ProjectShadowBox({
  image,
  art,
  mobile = false,
  tilt = '-2deg',
  sizes,
}: {
  image: string;
  /** Serialised SVG markup made on the server (motifs.tsx). */
  art?: { back: string; mid: string };
  mobile?: boolean;
  tilt?: string;
  sizes: string;
}) {
  return (
    <div className="psb relative aspect-[4/3] overflow-clip bg-recess" aria-hidden="true">
      {art && (
        <>
          <svg viewBox="0 0 400 300" aria-hidden="true" className="psb-layer absolute inset-0 h-full w-full" style={{ '--d': 0 } as CSSProperties} focusable="false" dangerouslySetInnerHTML={{ __html: art.back }} />
          <svg viewBox="0 0 400 300" aria-hidden="true" className="psb-layer absolute inset-0 h-full w-full overflow-visible" style={{ '--d': 1 } as CSSProperties} focusable="false" dangerouslySetInnerHTML={{ __html: art.mid }} />
        </>
      )}
      <span className={`psb-cast ${mobile ? 'psb-phone' : 'psb-laptop'}`} />
      <div className={`psb-layer psb-device ${mobile ? 'psb-phone' : 'psb-laptop'}`} style={{ '--d': 2 } as CSSProperties}>
        <span className="tape z-scene-front" style={{ '--tape-rotate': tilt } as CSSProperties} />
        <span className="psb-glass">
          <Image src={image} alt="" fill sizes={sizes} className="object-cover object-top" />
        </span>
        {!mobile && <span className="psb-deck" />}
      </div>
      <span className="psb-lip" />
    </div>
  );
}
