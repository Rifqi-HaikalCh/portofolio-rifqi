'use client';

import { useState, type ReactNode } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FolderTabs } from './FolderTabs';

/*
  Client leaf for a set of server-rendered panels behind FolderTabs.
  Every panel stays in the HTML (hidden when not selected), so the content is
  crawlable and the server keeps all the rendering work.
*/
export function TabbedPanels<Id extends string>({
  tabs,
  idBase,
  label,
  eqbot,
  panelClassName = '',
}: {
  tabs: ReadonlyArray<{ id: Id; en: string; idn: string; count?: number; panel: ReactNode }>;
  idBase: string;
  label: { en: string; id: string };
  eqbot?: string;
  panelClassName?: string;
}) {
  const { language, say } = useLanguage();
  const [value, setValue] = useState<Id>(tabs[0].id);

  return (
    <div>
      <div data-eqbot={eqbot} data-eqbot-at="above">
        <FolderTabs<Id>
          tabs={tabs.map((tab) => ({ id: tab.id, label: language === 'en' ? tab.en : tab.idn, count: tab.count }))}
          value={value}
          onChange={setValue}
          idBase={idBase}
          label={say(label.en, label.id)}
        />
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${idBase}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${idBase}-tab-${tab.id}`}
          hidden={tab.id !== value}
          tabIndex={0}
          className={`ledger-panel ${panelClassName}`}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
