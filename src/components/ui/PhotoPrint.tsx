import Image from 'next/image';
import { T } from './T';

/*
  The owner's photograph as a papercraft print (v3.10, owner: "a more
  attractive frame"): a coloured card cut a little larger sits behind the
  white print, two strips of washi tape hold it, a date stamp sits on the
  corner and the caption is written under the photo with the role. A light
  sheen crosses the glossy photo when the print comes forward (scene.css).
  Used on the pinboard (theatre) and at the top of the dossier (folio).
*/
export function PhotoPrint({ flat = false, alt = '', sizes }: { flat?: boolean; alt?: string; sizes: string }) {
  return (
    <figure className={`pin-print${flat ? ' is-flat' : ''}`}>
      <span className="pin-print-back" aria-hidden="true" />
      <span className="pin-print-paper">
        <span className="pin-print-image">
          <Image src="/assets/me.png" alt={alt} fill sizes={sizes} className="object-cover object-top" />
          <span className="pin-print-sheen" aria-hidden="true" />
        </span>
        <figcaption className="pin-print-caption">
          <span className="pin-print-name">Rifqi Haikal</span>
          <span className="pin-print-role">Software Engineer · Jakarta</span>
        </figcaption>
        {/* v3.12 (owner): the date stamp became an availability tag with a slowly blinking lamp. */}
        <span className="pin-print-stamp">
          <span className="pin-print-lamp" aria-hidden="true" />
          <T en="Available" id="Tersedia" />
        </span>
      </span>
      <span className="pin-print-tape pin-print-tape-l" aria-hidden="true" />
      <span className="pin-print-tape pin-print-tape-r" aria-hidden="true" />
    </figure>
  );
}
