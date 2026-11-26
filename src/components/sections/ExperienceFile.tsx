'use client';

import { FolderOpen } from 'lucide-react';
import { useCallback, useState, type ReactNode } from 'react';
import { PaperDialog } from '../ui/PaperDialog';
import { T } from '../ui/T';

/*
  "Open the file" on an experience sheet (DesignRules.md §4.5 `03`): the sheet
  that came out of the folder stays short enough to pin, and the full entry
  (photo, what was shipped, the stack) opens as the standard paper dialog
  (§7, v3.6). Header and body are server-rendered and passed in.
*/
export function ExperienceFile({
  titleId,
  label,
  eyebrow,
  title,
  lede,
  mark,
  children,
}: {
  titleId: string;
  label: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  mark?: ReactNode;
  children: ReactNode;
}) {
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
      <PaperDialog
        open={open}
        onClose={close}
        labelledBy={titleId}
        size="md"
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        mark={mark}
        closeLabel={<T en="Close the file" id="Tutup berkas" />}
      >
        {children}
      </PaperDialog>
    </>
  );
}
