import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  designProjects,
  designSkills,
  developerSkills,
  groupProjects,
  individualProjects,
} from '../../data/portfolio';
import { listedAdditionalGroups, stackLogo } from '../../lib/additional-skills';
import type { Project } from '../../types';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';
import { AdditionalSkillsLauncher } from './AdditionalSkillsLauncher';
import { RailNav } from './RailNav';
import { ProjectCard, ProjectShelf, tilts, type ShelfProject } from './ProjectShelf';
import { DraftingStation } from '../scenes/drafting/DraftingStation';
import { DRAFTING_CHAPTER } from '../scenes/drafting/beats';
import { GALLERY_CHAPTER } from '../scenes/gallery/beats';
import { Beat, Chapter } from '../scenes/chapter/Chapter';
import { motifArt, motifFor } from '../scenes/gallery/motifs';
import { GalleryStation } from '../scenes/gallery/GalleryStation';

type Capability = { en: string; id: string; bodyEn: string; bodyId: string; points: Array<[string, string]> };

const developerServices: Capability[] = [
  {
    en: '.NET application development',
    id: 'Pengembangan aplikasi .NET',
    bodyEn: 'Enterprise web applications in C#, ASP.NET MVC and .NET Core.',
    bodyId: 'Aplikasi web enterprise dengan C#, ASP.NET MVC, dan .NET Core.',
    points: [
      ['C# application logic', 'Logika aplikasi C#'],
      ['ASP.NET MVC and .NET Core', 'ASP.NET MVC dan .NET Core'],
      ['Telerik and Kendo interfaces', 'Antarmuka Telerik dan Kendo'],
    ],
  },
  {
    en: 'SQL Server and data',
    id: 'SQL Server dan data',
    bodyEn: 'Operational data shaped with stored procedures, set-based queries and Entity Framework.',
    bodyId: 'Data operasional ditata dengan stored procedure, kueri set-based, dan Entity Framework.',
    points: [
      ['Stored procedures and indexing', 'Stored procedure dan indexing'],
      ['Entity Framework', 'Entity Framework'],
      ['Transactional processing', 'Pemrosesan transaksional'],
    ],
  },
  {
    en: 'Operational dashboards',
    id: 'Dashboard operasional',
    bodyEn: 'Internal dashboards and modular applications that operations teams open every day.',
    bodyId: 'Dashboard internal dan aplikasi modular yang dibuka tim operasional setiap hari.',
    points: [
      ['Monitoring dashboards', 'Dashboard pemantauan'],
      ['Modular application structure', 'Struktur aplikasi modular'],
      ['Deployment on IIS', 'Deployment di IIS'],
    ],
  },
];

const designServices: Capability[] = [
  {
    en: 'App and website design',
    id: 'Desain aplikasi dan website',
    bodyEn: 'Complete, ready-to-build screens for mobile and desktop.',
    bodyId: 'Layar lengkap yang siap dibangun untuk mobile dan desktop.',
    points: [
      ['UI design systems', 'Sistem desain UI'],
      ['Mobile-first layouts', 'Tata letak mobile-first'],
      ['Developer handoff notes', 'Catatan handoff untuk developer'],
    ],
  },
  {
    en: 'High-fidelity prototypes',
    id: 'Prototipe fidelitas tinggi',
    bodyEn: 'Clickable flows you can put in front of users before a line of code.',
    bodyId: 'Alur yang bisa diklik untuk diuji pengguna sebelum ada kode.',
    points: [
      ['Interactive prototypes', 'Prototipe interaktif'],
      ['Micro-interactions', 'Micro-interaction'],
      ['Ready for user testing', 'Siap untuk uji pengguna'],
    ],
  },
  {
    en: 'Branding and identity',
    id: 'Branding dan identitas',
    bodyEn: 'The look and feel an application keeps across every screen.',
    bodyId: 'Tampilan dan nuansa yang dijaga aplikasi di setiap layar.',
    points: [
      ['Identity design', 'Desain identitas'],
      ['Color palettes', 'Palet warna'],
      ['Logos and icons', 'Logo dan ikon'],
    ],
  },
];

const coreGroups: Array<{ en: string; id: string; names: string[] }> = [
  { en: 'Backend', id: 'Backend', names: ['C#', 'ASP.NET MVC', '.NET Core'] },
  { en: 'Data', id: 'Data', names: ['SQL Server', 'Entity Framework'] },
  { en: 'Interface', id: 'Antarmuka', names: ['Telerik'] },
];

const figmaWorkspace =
  'https://www.figma.com/proto/tfuZv6wJ89rcjMHj62C8px/Portfolio?page-id=0%3A1&node-id=1-2&p=f&viewport=412%2C255%2C0.04&t=6zl8vTjnEZzdUhRC-1&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A2';

const featured = ['mejascalp', 'buku-dompet', 'api-central', 'shipment-tracker', 'marketplace-influencer', 'hiring-platform', 'del-pick', 'sportainment-app'];

function toShelf(project: Project, kind: ShelfProject['kind']): ShelfProject {
  return {
    id: project.id,
    title: project.title,
    en: project.description,
    idn: project.descriptionId || project.description,
    image: project.image,
    slides: project.slides ?? [],
    stack: project.techStack.map((name) => ({ name, logo: stackLogo(name) })),
    links: project.links,
    kind,
    mobile: project.id.includes('mobile') || project.type === 'mobile' || /mobile/i.test(project.title),
    art: motifArt(project.id, motifFor(project)),
  };
}

type Area = 'development' | 'design';
const AREAS: Record<Area, { en: string; id: string }> = {
  development: { en: 'Development', id: 'Pengembangan' },
  design: { en: 'Interface design', id: 'Desain antarmuka' },
};
const services: Array<Capability & { area: Area }> = [
  ...developerServices.map((item) => ({ ...item, area: 'development' as const })),
  ...designServices.map((item) => ({ ...item, area: 'design' as const })),
];

/* One service as a blueprint sheet of the pile on the drafting table (§4.5 `04`, v3.6). */
function ServiceSheet({ item, index }: { item: Capability & { area: Area }; index: number }) {
  return (
    <>
      <p className="flex items-baseline justify-between gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-blueprint">
        <span>
          <T en={AREAS[item.area].en} id={AREAS[item.area].id} />
        </span>
        <span className="stamp">
          {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
        </span>
      </p>
      <h3 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-ink">
        <T en={item.en} id={item.id} />
      </h3>
      <p className="mt-3 leading-relaxed text-muted">
        <T en={item.bodyEn} id={item.bodyId} />
      </p>
      <ul className="mt-6 grid gap-2 border-t border-dashed border-line pt-5 text-sm text-ink">
        {item.points.map(([en, id]) => (
          <li key={en} className="grid grid-cols-[1.25rem_1fr]">
            <span className="text-accent" aria-hidden="true">
              —
            </span>
            <T en={en} id={id} />
          </li>
        ))}
      </ul>
    </>
  );
}

function SkillChip({ name, image, imageDark }: { name: string; image?: string; imageDark?: string }) {
  return (
    <li className="flex min-h-11 items-center gap-3 border border-line bg-raised px-3 py-2 text-sm text-ink">
      {image &&
        (imageDark ? (
          <>
            <Image src={image} alt="" width={24} height={24} className="h-6 w-6 object-contain dark:hidden" />
            <Image src={imageDark} alt="" width={24} height={24} className="hidden h-6 w-6 object-contain dark:block" />
          </>
        ) : (
          <Image src={image} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
        ))}
      {name}
    </li>
  );
}

const groupLabel = 'mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted';

/* After the pile: the tools behind the services, the additional skills index and the Figma workspace. */
function ToolsSheet() {
  const tooling = listedAdditionalGroups.flatMap((group) => group.skills);
  return (
    <div data-eqbot="services-tabs" data-eqbot-at="above" className="grid gap-12 lg:grid-cols-2 lg:items-start">
      <div>
        <h3 className="font-serif text-2xl font-medium text-ink">
          <T en="Tooling" id="Perkakas" />
        </h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {tooling.map((skill) => (
            <SkillChip key={skill.name} name={skill.name} image={skill.image} imageDark={'imageDark' in skill ? (skill.imageDark as string) : undefined} />
          ))}
        </ul>
        <div className="mt-8 max-w-xl">
          <AdditionalSkillsLauncher />
        </div>
      </div>
      <div>
        <h3 className="font-serif text-2xl font-medium text-ink">
          <T en="Design tools" id="Alat desain" />
        </h3>
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {designSkills.map((skill) => (
            <SkillChip key={skill.name} name={skill.name} image={skill.image} />
          ))}
        </ul>
        <a href={figmaWorkspace} target="_blank" rel="noopener noreferrer" className="paper-card mt-8 block border border-line">
          <span className="relative block aspect-[3/2] border-b border-line bg-recess">
            <Image src="/assets/my portfolio.webp" alt="" fill sizes="(min-width: 1024px) 480px, 92vw" className="object-cover" />
          </span>
          <span className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-ink">
            <T en="Open my Figma workspace for this portfolio" id="Buka ruang kerja Figma untuk portofolio ini" />
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  );
}

/*
  04 Services — the Drafting Table chapter (DesignRules.md §4.5 `04`, v3.6): the
  title drops as the lamp swings, the core stack lands as three tracing
  overlays once the cover sheet slides off the blueprint, then the services
  come off the board as one pile of blueprints: each scroll tucks the front
  sheet under the pile and the next one is read. The tools follow in flow.
  Server component; the skills dialog is the only client leaf.
*/
export function Services() {
  return (
    <Chapter
      spec={DRAFTING_CHAPTER}
      labelledBy="services-title"
      studio="draft"
      next={{ id: 'projects', en: 'Selected work', idn: 'Karya pilihan' }}
      stage={<DraftingStation wide />}
    >
      <Beat id="title" className="fold-tr [&>header]:mb-0">
        <SectionTitle
          index="04"
          eyebrow={<T en="Blueprint" id="Cetak biru" />}
          title={<T en="Services" id="Layanan" />}
          titleId="services-title"
          lede={
            <T
              en="Enterprise web and data systems in C# and .NET, and interface design for the same products."
              id="Sistem web dan data enterprise dengan C# dan .NET, serta desain antarmuka untuk produk yang sama."
            />
          }
        />
      </Beat>

      <Beat id="stack">
        <h3 className="font-serif text-2xl font-medium text-ink">
          <T en="Core stack" id="Stack inti" />
        </h3>
        <div className="mt-5 grid gap-3">
          {coreGroups.map((group, index) => (
            <div key={group.en} data-step={index} className="tracing border border-line p-4">
              <p className={groupLabel}>
                <T en={group.en} id={group.id} />
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.names.map((name) => (
                  <SkillChip key={name} name={name} image={developerSkills.find((skill) => skill.name === name)?.image} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Beat>

      {services.map((item, index) => (
        <Beat key={item.en} id={`svc-${index}`} className="blueprint-leaf svc-sheet stage-sheet">
          <ServiceSheet item={item} index={index} />
        </Beat>
      ))}

      <Beat id="tools" flow>
        <ToolsSheet />
      </Beat>
    </Chapter>
  );
}

/*
  04b Selected work — the Shadow-Box Gallery chapter (DesignRules.md §4.5 `04b`,
  v3.6): the title rises while the figure hangs a new frame; then the featured
  projects hang as cards on one wire, two per segment, and the wire slides
  sideways as the visitor scrolls (a `rail` group: the scroll only picks the
  segment, the slide plays in time). The archive drawer follows in flow.
*/
export function Projects() {
  const projects = [
    ...individualProjects.map((project) => toShelf(project, 'individual')),
    ...groupProjects.map((project) => toShelf(project, 'group')),
    ...designProjects.map((project) => toShelf(project, 'design')),
  ];
  const picks = featured.map((id) => projects.find((p) => p.id === id)).filter((p): p is ShelfProject => Boolean(p));
  const hung = featured.flatMap((id) => {
    const raw = [...individualProjects, ...groupProjects, ...designProjects].find((p) => p.id === id);
    return raw ? [{ id, motif: raw.motif, image: raw.image, mobile: raw.id.includes('mobile') || raw.type === 'mobile' }] : [];
  });
  const segments = Array.from({ length: Math.ceil(picks.length / 2) }, (_, i) => picks.slice(i * 2, i * 2 + 2));

  return (
    <Chapter
      spec={GALLERY_CHAPTER}
      labelledBy="projects-title"
      studio="gallery"
      next={{ id: 'certificates', en: 'Certificates', idn: 'Sertifikat' }}
      stage={<GalleryStation wide hung={hung} />}
    >
      <Beat id="title" className="[&_header]:mb-0">
        <div data-eqbot="projects-title" data-eqbot-at="above">
          <SectionTitle
            index="04b"
            eyebrow={<T en="Gallery wall" id="Dinding galeri" />}
            title={<T en="Selected work" id="Karya pilihan" />}
            titleId="projects-title"
            lede={
              <T
                en="Eight projects hung on the wire, the rest in the archive drawer. Scroll down or swipe sideways to walk along it; open a card for the case study."
                id="Delapan proyek digantung di kawat, sisanya di laci arsip. Gulir ke bawah atau geser ke samping untuk menyusurinya; buka kartu untuk melihat studi kasusnya."
              />
            }
          />
        </div>
      </Beat>

      {segments.map((pair, s) => (
        <Beat key={pair[0].id} id={`wire-${s}`} className="rail-seg">
          <ul className="rail-row">
            {pair.map((project, i) => (
              <li key={project.id} className="rail-card" style={{ '--sway': tilts[(s * 2 + i) % tilts.length] } as CSSProperties}>
                <ProjectCard project={project} tilt={tilts[(s * 2 + i) % tilts.length]} />
              </li>
            ))}
          </ul>
          <RailNav segment={s} count={segments.length} />
        </Beat>
      ))}

      <Beat id="archive" flow>
        <div data-eqbot="projects-filters" data-eqbot-at="above">
          <ProjectShelf projects={projects} />
        </div>
      </Beat>
    </Chapter>
  );
}
