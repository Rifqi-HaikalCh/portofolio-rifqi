import { Download, GraduationCap, Briefcase, Trophy, Users, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { aboutHighlights, cvFile } from '../../data/portfolio';
import { Beat, Chapter } from '../scenes/chapter/Chapter';
import { PINBOARD_CHAPTER } from '../scenes/pinboard/beats';
import { PinboardStation } from '../scenes/pinboard/PinboardStation';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';

const glyphs: Record<string, ReactNode> = {
  'graduation-cap': <GraduationCap size={18} aria-hidden="true" />,
  briefcase: <Briefcase size={18} aria-hidden="true" />,
  trophy: <Trophy size={18} aria-hidden="true" />,
  users: <Users size={18} aria-hidden="true" />,
};

/*
  02 About — the Pinboard chapter (DesignRules.md §4.5 `02`): three beats over
  the fullscreen board. The title drops onto a pin, the dossier unfolds out of
  the photo card, and the four index cards are handed to the board one by one.
  Server component; the bust on the board is the hero figurine, not a photo.
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

      <Beat id="cards" className="bg-paper">
        <dl className="grid gap-3 sm:grid-cols-2">
          {aboutHighlights.map((item, index) => (
            <div key={item.title} data-step={index} className="index-card border border-line bg-raised p-4">
              <dt className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                <span className="text-accent">{glyphs[item.icon]}</span>
                <T en={item.title} id={item.titleId} />
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-muted">
                <T en={item.description} id={item.descriptionId} />
              </dd>
            </div>
          ))}
        </dl>
      </Beat>
    </Chapter>
  );
}
