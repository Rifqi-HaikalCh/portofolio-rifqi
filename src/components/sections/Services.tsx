import Image from 'next/image';
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
import { TabbedPanels } from '../ui/TabbedPanels';
import { T } from '../ui/T';
import { AdditionalSkillsLauncher } from './AdditionalSkillsLauncher';
import { ProjectShelf, type ShelfProject } from './ProjectShelf';

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

const featured = ['api-central', 'shipment-tracker', 'marketplace-influencer', 'hiring-platform', 'del-pick', 'sportainment-app'];

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
    mobile: project.id.includes('mobile') || project.type === 'mobile',
  };
}

function CapabilityBoard({ items }: { items: Capability[] }) {
  return (
    <div className="blueprint crop-marks">
      <i /><i /><i /><i />
      <ol className="grid md:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.en} className="border-line p-6 md:p-8 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r">
          <p className="stamp text-xs">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="mt-3 font-serif text-2xl font-medium leading-snug text-ink">
            <T en={item.en} id={item.id} />
          </h3>
          <p className="mt-3 leading-relaxed text-muted">
            <T en={item.bodyEn} id={item.bodyId} />
          </p>
          <ul className="mt-5 space-y-2 text-sm text-ink">
            {item.points.map(([en, id]) => (
              <li key={en} className="grid grid-cols-[1rem_1fr]">
                <span className="text-accent" aria-hidden="true">—</span>
                <T en={en} id={id} />
              </li>
            ))}
          </ul>
        </li>
      ))}
      </ol>
    </div>
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

const groupLabel = 'mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted';

function DevelopmentPanel() {
  const tooling = listedAdditionalGroups.flatMap((group) => group.skills);
  return (
    <div className="grid gap-12 pt-8">
      <CapabilityBoard items={developerServices} />
      <div>
        <h3 className="font-serif text-2xl font-medium text-ink">
          <T en="Core stack" id="Stack inti" />
        </h3>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {coreGroups.map((group) => (
            <div key={group.en}>
              <p className={groupLabel}>
                <T en={group.en} id={group.id} />
              </p>
              <ul className="grid gap-2">
                {group.names.map((name) => (
                  <SkillChip key={name} name={name} image={developerSkills.find((skill) => skill.name === name)?.image} />
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <p className={groupLabel}>
            <T en="Tooling" id="Perkakas" />
          </p>
          <ul className="flex flex-wrap gap-2">
            {tooling.map((skill) => (
              <SkillChip key={skill.name} name={skill.name} image={skill.image} imageDark={'imageDark' in skill ? (skill.imageDark as string) : undefined} />
            ))}
          </ul>
        </div>
        <div className="mt-8 max-w-xl">
          <AdditionalSkillsLauncher />
        </div>
      </div>
    </div>
  );
}

function DesignPanel() {
  return (
    <div className="grid gap-12 pt-8">
      <CapabilityBoard items={designServices} />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div>
          <h3 className="font-serif text-2xl font-medium text-ink">
            <T en="Design tools" id="Alat desain" />
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {designSkills.map((skill) => (
              <SkillChip key={skill.name} name={skill.name} image={skill.image} />
            ))}
          </ul>
        </div>
        <a href={figmaWorkspace} target="_blank" rel="noopener noreferrer" className="paper-card block border border-line">
          <span className="relative block aspect-[3/2] border-b border-line bg-recess">
            <Image src="/assets/my portfolio.webp" alt="" fill sizes="(min-width: 1024px) 560px, 92vw" className="object-cover" />
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
  04 Services — a blueprint board, then selected work with the archive
  drawer behind it (DesignRules.md §4 `04`). Server component; the tabs,
  shelf and skills dialog are the only client leaves.
*/
export function Services() {
  const projects = [
    ...individualProjects.map((project) => toShelf(project, 'individual')),
    ...groupProjects.map((project) => toShelf(project, 'group')),
    ...designProjects.map((project) => toShelf(project, 'design')),
  ];

  return (
    <section id="services" data-studio="draft" aria-labelledby="services-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
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

        <TabbedPanels
          idBase="services"
          eqbot="services-tabs"
          label={{ en: 'Service area', id: 'Bidang layanan' }}
          tabs={[
            { id: 'development', en: 'Development', idn: 'Pengembangan', panel: <DevelopmentPanel /> },
            { id: 'design', en: 'Interface design', idn: 'Desain antarmuka', panel: <DesignPanel /> },
          ]}
        />

        <div id="projects" className="mt-20 scroll-mt-24 md:mt-28">
          <div className="mb-10 flex flex-col gap-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              <T en="Pinned to the board" id="Disematkan di papan" />
            </p>
            <h3 data-eqbot="projects-title" data-eqbot-at="above" className="font-serif text-3xl font-medium tracking-tight text-ink md:text-4xl">
              <T en="Selected work" id="Karya pilihan" />
            </h3>
          </div>
          <div data-eqbot="projects-filters" data-eqbot-at="above">
            <ProjectShelf projects={projects} featured={featured} />
          </div>
        </div>
      </div>
    </section>
  );
}
