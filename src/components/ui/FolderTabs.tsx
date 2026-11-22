'use client';

import { useRef, type KeyboardEvent, type ReactNode } from 'react';

/*
  Die-cut folder tabs as an ARIA tablist (DesignRules.md §7 FolderTabs).
  Arrow keys move and select (roving tabindex); Home/End jump to the ends.
  Each panel needs id `${idBase}-panel-${tab.id}` and role="tabpanel".
*/
export function FolderTabs<Id extends string>({
  tabs,
  value,
  onChange,
  idBase,
  label,
}: {
  tabs: ReadonlyArray<{ id: Id; label: ReactNode; count?: number }>;
  value: Id;
  onChange: (id: Id) => void;
  idBase: string;
  label: string;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next = -1;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next < 0) return;
    event.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className="flex flex-wrap items-end gap-1 border-b border-line">
      {tabs.map((tab, index) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className="folder-tab min-h-11 text-sm"
          >
            {tab.label}
            {typeof tab.count === 'number' && (
              <span className="ml-2 font-mono text-[11px] text-accent">{String(tab.count).padStart(2, '0')}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
