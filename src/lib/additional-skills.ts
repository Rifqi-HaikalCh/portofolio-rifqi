import {
  additionalSkillGroups,
  designProjects,
  designSkills,
  developerSkills,
  groupProjects,
  individualProjects,
  workExperience,
} from '../data/portfolio';

export type SkillKind = 'language' | 'framework';

export interface CatalogSkill {
  name: string;
  image: string;
  kind: SkillKind;
  aliases: string[];
}

export interface AdditionalCard {
  id: string;
  title: string;
  titleId?: string;
  image: string;
  source: 'work' | 'project';
  skills: CatalogSkill[];
}

export interface SkillTierRow {
  skill: CatalogSkill;
  count: number;
  rank: number;
  tier: 'lead' | 'repeat' | 'once';
}

const catalogGroups = additionalSkillGroups.filter(
  (group) => group.labelEn === 'Language' || group.labelEn === 'Framework'
);

function aliasesFor(name: string): string[] {
  const lower = name.toLowerCase();
  const aliases = new Set<string>([lower]);
  if (lower.endsWith('.js')) aliases.add(lower.slice(0, -3));
  return Array.from(aliases);
}

export const additionalCatalog: CatalogSkill[] = catalogGroups.flatMap((group) =>
  group.skills.map((skill) => ({
    name: skill.name,
    image: skill.image,
    kind: group.labelEn === 'Language' ? 'language' as const : 'framework' as const,
    aliases: aliasesFor(skill.name),
  }))
);

export const listedAdditionalGroups = additionalSkillGroups.filter(
  (group) => group.labelEn !== 'Language' && group.labelEn !== 'Framework'
);

function tokensOf(raw: string): string[] {
  const lower = raw.toLowerCase().trim();
  const stripped = lower.replace(/\s+v?\d+(\.\d+)*$/, '');
  const parts = lower.split(/[^a-z0-9.+#]+/).filter((part) => part.length > 1);
  return Array.from(new Set([lower, stripped, ...parts]));
}

function tokenMatches(token: string, alias: string): boolean {
  if (token === alias) return true;
  return token.startsWith(alias) && /^\d+$/.test(token.slice(alias.length));
}

const extraLogoAliases: Record<string, string[]> = {
  Photoshop: ['adobe photoshop', 'photoshop'],
  CSS: ['flexbox'],
  'Kendo UI': ['kendo'],
};

const extraStackLogos = [
  { name: 'Pinia', image: '/assets/pinia.png' },
  { name: 'Mirage.js', image: '/assets/miragejs.png' },
  { name: 'Supabase', image: '/assets/supabase.png' },
  { name: 'React Hook Form', image: '/assets/react-hook-form.png' },
  { name: 'Zustand', image: '/assets/zustand.png' },
  { name: 'MySQL', image: '/assets/mysql.png' },
  { name: 'Dart', image: '/assets/dart.png' },
  { name: 'C++', image: '/assets/cplusplus.png' },
  { name: 'JWT', image: '/assets/jwt.png' },
  { name: 'Sketch', image: '/assets/sketch.png' },
  { name: 'InVision', image: '/assets/invision.png' },
  { name: 'Adobe XD', image: '/assets/adobe-xd.png' },
  { name: 'Keycloak', image: '/assets/keycloak.png' },
  { name: 'Serilog', image: '/assets/serilog.png' },
  { name: 'Kendo UI', image: '/assets/telerik.png' },
];

const logoEntries = [
  ...developerSkills.map((skill) => ({ name: skill.name, image: skill.image })),
  ...additionalSkillGroups.flatMap((group) =>
    group.skills.flatMap((skill) => (skill.image ? [{ name: skill.name, image: skill.image }] : []))
  ),
  ...designSkills.map((skill) => ({ name: skill.name, image: skill.image })),
  ...extraStackLogos,
].filter((entry, index, all) => all.findIndex((item) => item.name === entry.name) === index)
  .map((entry) => ({
    ...entry,
    aliases: [...aliasesFor(entry.name), ...(extraLogoAliases[entry.name] ?? [])],
  }));

export function stackLogo(name: string): string | undefined {
  const tokens = tokensOf(name);
  let best: { image: string; length: number } | undefined;

  logoEntries.forEach((entry) => {
    entry.aliases.forEach((alias) => {
      if (!tokens.some((token) => tokenMatches(token, alias))) return;
      if (!best || alias.length > best.length) best = { image: entry.image, length: alias.length };
    });
  });

  return best?.image;
}

export function matchAdditionalSkills(stack: string[] | undefined): CatalogSkill[] {
  const tokens = (stack ?? []).flatMap(tokensOf);
  return additionalCatalog.filter((skill) =>
    skill.aliases.some((alias) => tokens.some((token) => tokenMatches(token, alias)))
  );
}

export function additionalSkillCards(): AdditionalCard[] {
  const cards: AdditionalCard[] = [];

  workExperience.forEach((exp) => {
    if (exp.type !== 'work' || !exp.image) return;
    const skills = matchAdditionalSkills(exp.techStack);
    if (!skills.length) return;
    cards.push({
      id: exp.id,
      title: exp.title,
      titleId: exp.titleId,
      image: exp.image,
      source: 'work',
      skills,
    });
  });

  [...individualProjects, ...groupProjects, ...designProjects].forEach((project) => {
    const skills = matchAdditionalSkills(project.techStack);
    if (!skills.length || !project.image) return;
    cards.push({
      id: project.id,
      title: project.title,
      image: project.image,
      source: 'project',
      skills,
    });
  });

  return cards;
}

export function additionalSkillTiers(cards: AdditionalCard[]): SkillTierRow[] {
  const counts = new Map<string, SkillTierRow>();

  cards.forEach((card) => {
    card.skills.forEach((skill) => {
      const current = counts.get(skill.name);
      if (current) current.count += 1;
      else counts.set(skill.name, { skill, count: 1, rank: 0, tier: 'once' });
    });
  });

  const ranked = Array.from(counts.values()).sort(
    (a, b) => b.count - a.count || a.skill.name.localeCompare(b.skill.name)
  );
  const max = ranked[0]?.count ?? 0;

  return ranked.map((row, index) => ({
    ...row,
    rank: index + 1,
    tier: row.count === max && max > 1 ? 'lead' : row.count > 1 ? 'repeat' : 'once',
  }));
}
