/*
  The one section order (DesignRules.md §4): render order, the navbar, the
  StudioRail and the footer all read this list. Kept apart from portfolio.ts so
  client components can import it without shipping the content data.
*/

export const pageSections = [
  { id: 'home', index: '01', en: 'Home', idn: 'Beranda' },
  { id: 'about', index: '02', en: 'About', idn: 'Tentang' },
  { id: 'experience', index: '03', en: 'Experience', idn: 'Pengalaman' },
  { id: 'services', index: '04', en: 'Services', idn: 'Layanan' },
  { id: 'projects', index: '04b', en: 'Projects', idn: 'Proyek' },
  { id: 'certificates', index: '05', en: 'Certificates', idn: 'Sertifikat' },
  { id: 'contact', index: '06', en: 'Contact', idn: 'Kontak' },
] as const;

export type PageSectionId = (typeof pageSections)[number]['id'];
