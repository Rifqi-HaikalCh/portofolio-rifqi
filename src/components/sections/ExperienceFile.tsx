'use client';

import { FolderOpen } from 'lucide-react';
import { useCallback, useState, type ReactNode } from 'react';
import { PaperDialog } from '../ui/PaperDialog';

/*
  "Open the file" on an experience sheet (DesignRules.md §4.5 `03`): the sheet
  that came out of the folder stays short enough to pin, and the full entry
  (what was shipped, the stack) opens as a paper dialog. The dialog body is
  server-rendered and passed in as children.
*/
export function ExperienceFile({ titleId, label, children }: { titleId: string; label: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="mt-5 inline-flex min-h-11 items-center gap-2 border border-line px-4 text-sm text-ink hover:bg-ink hover:text-paper"
      >
        <FolderOpen size={15} aria-hidden="true" />
        {label}
      </button>
      <PaperDialog open={open} onClose={close} labelledBy={titleId}>
        {children}
      </PaperDialog>
    </>
  );
}
