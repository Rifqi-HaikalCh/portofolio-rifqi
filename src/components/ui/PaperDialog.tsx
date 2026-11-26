'use client';

import { X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { T } from './T';

/*
  PaperDialog — the one modal of the site (DesignRules.md §7, v3.6 standard).
  Native <dialog>: showModal() gives the top layer, an inert page and Escape for
  free; focus returns to whatever opened it; clicking the backdrop closes it.

  Every modal has the same anatomy, so they read as one family:
    header  eyebrow (mono, accent) · serif title (labels the dialog) · lede · close (44 px)
    body    the only part that scrolls
    footer  optional row of actions on a ruled edge
  Sizes: `sm` 36 rem (a file), `md` 52 rem, `lg` 72 rem (a case study, a skills index),
  `drawer` the full screen (the archive). The sheet is the studio's paper leaf with a
  folded corner; it unfolds from its top edge (§10.2), and lies still under reduced motion.
*/
export type DialogSize = 'sm' | 'md' | 'lg' | 'drawer';

export function PaperDialog({
  open,
  onClose,
  labelledBy,
  eyebrow,
  title,
  lede,
  mark,
  footer,
  size = 'md',
  closeLabel,
  className = '',
  bodyClassName = '',
  children,
}: {
  open: boolean;
  onClose: () => void;
  /** Id given to the title heading; the dialog is labelled by it. */
  labelledBy: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  /** v3.12: a mark at the far left of the header (a company's logo on a role file). Decorative. */
  mark?: ReactNode;
  footer?: ReactNode;
  size?: DialogSize;
  /** Screen-reader name of the close button; defaults to "Close" / "Tutup". */
  closeLabel?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  // Layout effect: the dialog must be in the top layer within the same commit, so a View
  // Transition (the frame → sheet morph) captures it in its new state.
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      opener.current = document.activeElement;
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    const onNativeClose = () => {
      if (opener.current instanceof HTMLElement) opener.current.focus({ preventScroll: true });
      onClose();
    };
    dialog.addEventListener('close', onNativeClose);
    return () => dialog.removeEventListener('close', onNativeClose);
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      data-size={size}
      className={`paper-dialog ${className}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {open && (
        <div className="pd-sheet paper-leaf">
          <header className="pd-head">
            {mark && (
              <span className="pd-mark" aria-hidden="true">
                {mark}
              </span>
            )}
            <div className="min-w-0 flex-1">
              {eyebrow && <p className="pd-eyebrow">{eyebrow}</p>}
              <h3 id={labelledBy} className="pd-title">
                {title}
              </h3>
              {lede && <p className="pd-lede">{lede}</p>}
            </div>
            <form method="dialog">
              <button type="submit" className="pd-close" data-sound="none">
                <X size={18} aria-hidden="true" />
                <span className="sr-only">{closeLabel ?? <T en="Close" id="Tutup" />}</span>
              </button>
            </form>
          </header>
          {/* Focusable so a keyboard can scroll a long body (axe: scrollable-region-focusable). */}
          <div className={`pd-body ${bodyClassName}`} tabIndex={0} role="group" aria-labelledby={labelledBy}>
            {children}
          </div>
          {footer && <footer className="pd-foot">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}
