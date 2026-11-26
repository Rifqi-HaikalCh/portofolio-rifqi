/* Project data as the shelf receives it from the server section. */

import type { MotifArt } from '../scenes/gallery/motifs';

export type ShelfKind = 'individual' | 'group' | 'design';

export interface ShelfProject {
  id: string;
  title: string;
  en: string;
  idn: string;
  image: string;
  slides: string[];
  stack: Array<{ name: string; logo?: string }>;
  links: { demo?: string; github?: string; prototype?: string; needToKnow?: string };
  kind: ShelfKind;
  mobile: boolean;
  /** Server-made domain sheets for the shadow box (featured projects only). */
  art?: MotifArt;
}

export const kindCopy: Record<ShelfKind | 'all', { en: string; id: string }> = {
  all: { en: 'All', id: 'Semua' },
  individual: { en: 'Individual', id: 'Individu' },
  group: { en: 'Group', id: 'Kelompok' },
  design: { en: 'Design', id: 'Desain' },
};

export function kindLabel(project: ShelfProject) {
  if (project.kind === 'design') return project.mobile ? { en: 'Mobile design', id: 'Desain mobile' } : { en: 'Web design', id: 'Desain web' };
  return project.kind === 'group' ? { en: 'Group project', id: 'Proyek kelompok' } : { en: 'Individual project', id: 'Proyek individu' };
}
