'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/*
  Native <dialog> as a folded paper sheet (DesignRules.md §7, §11.1).
  showModal() gives the top layer, an inert page and Escape for free.
  Focus returns to whatever opened it. Clicking the backdrop closes it.
*/
export function PaperDialog({
  open,
  onClose,
  labelledBy,
  drawer = false,
  className = '',
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  drawer?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
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
      className={`paper-dialog ${drawer ? 'is-drawer' : 'w-full'} ${className}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {open && children}
    </dialog>
  );
}
