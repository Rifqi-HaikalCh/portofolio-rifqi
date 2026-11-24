import { Download, GraduationCap, Briefcase, Trophy, Users, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { aboutHighlights, cvFile } from '../../data/portfolio';
import { Beat, Chapter } from '../scenes/chapter/Chapter';
import { PINBOARD_CHAPTER } from '../scenes/pinboard/beats';
import { PinboardStation } from '../scenes/pinboard/PinboardStation';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';
import { PhotoPrint } from '../ui/PhotoPrint';

const glyphs: Record<string, ReactNode> = {
  'graduation-cap': <GraduationCap size={22} aria-hidden="true" />,
  briefcase: <Briefcase size={22} aria-hidden="true" />,
  trophy: <Trophy size={22} aria-hidden="true" />,
  users: <Users size={22} aria-hidden="true" />,
};

/*
  02 About — the Pinboard chapter (DesignRules.md §4.5 `02`, v3.6). The title
  drops onto a pin; the dossier unfolds while the photograph comes off the
  board to stand beside it; then each index card on the board comes forward in
  turn as its own sheet. Server component. Where there is no stage (mobile),
  the photograph is printed at the top of the dossier instead.
*/
export function About() {
  return (
    <Chapter
      spec={PINBOARD_CHAPTER}
      labelledBy="about-title"
      studio="manuscript"
      eqbot="about-photo"
      next={{ id: 'experience', en: 'Experience', idn: 'Pengalaman' }}
      stage={<PinboardStation icons={aboutHighlights.map((item) => item.icon)} wide />}
    >
      <Beat id="title" className="fold-tr [&>header]:mb-0">
        <SectionTitle
          index="02"
          eyebrow={<T en="Dossier" id="Berkas" />}
          title={<T en="About me" id="Tentang saya" />}
          titleId="about-title"
        />
      </Beat>

      <Beat id="dossier">
        <div className="mb-8 max-w-[16rem] md:hidden">
          <PhotoPrint flat alt="Rifqi Haikal" sizes="80vw" />
        </div>
        <p className="text-base leading-relaxed text-ink md:text-lg">
          <T
            en="I'm a software engineer with three years of hands-on development. Most of my work is C#, ASP.NET MVC and .NET Core for enterprise web and data systems: backend services, REST APIs, monitoring dashboards, and secure access with SQL Server, Entity Framework, RBAC, SSO and MFA."
            id="Saya software engineer dengan tiga tahun pengalaman pengembangan. Sebagian besar pekerjaan saya adalah C#, ASP.NET MVC, dan .NET Core untuk sistem web dan data enterprise: layanan backend, REST API, dashboard pemantauan, serta akses aman dengan SQL Server, Entity Framework, RBAC, SSO, dan MFA."
          />
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted">
          <T
            en="I've built systems for telecommunications, oil and gas, research and financial services, and I also work in React, Angular and Spring Boot when a project needs it."
            id="Saya pernah membangun sistem untuk sektor telekomunikasi, minyak dan gas, riset, dan jasa keuangan, serta bekerja dengan React, Angular, dan Spring Boot bila proyek membutuhkannya."
          />
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={cvFile} download className="btn-primary-custom">
            <Download size={16} aria-hidden="true" />
            <T en="Download CV" id="Unduh CV" />
          </a>
          <a href="#contact" className="btn-outline-custom">
            <T en="Get in touch" id="Hubungi saya" />
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </Beat>

      {aboutHighlights.map((item, index) => (
        <Beat key={item.title} id={`card-${index}`} className="index-sheet">
          <p className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
            <T en={`Pinned ${String(index + 1).padStart(2, '0')} / ${String(aboutHighlights.length).padStart(2, '0')}`} id={`Kartu ${String(index + 1).padStart(2, '0')} / ${String(aboutHighlights.length).padStart(2, '0')}`} />
            <span className="text-accent">{glyphs[item.icon]}</span>
          </p>
          <h3 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight text-ink">
            <T en={item.title} id={item.titleId} />
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
            <T en={item.description} id={item.descriptionId} />
          </p>
        </Beat>
      ))
      }
    </Chapter>
  );
}
