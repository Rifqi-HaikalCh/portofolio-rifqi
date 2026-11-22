import { Download, GraduationCap, Briefcase, Trophy, Users, ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { aboutHighlights, cvFile } from '../../data/portfolio';
import { RifqiFigurine } from '../scene/RifqiFigurine';
import { SectionTitle } from '../ui/SectionTitle';
import { T } from '../ui/T';

const icons: Record<string, ReactNode> = {
  'graduation-cap': <GraduationCap size={18} aria-hidden="true" />,
  briefcase: <Briefcase size={18} aria-hidden="true" />,
  trophy: <Trophy size={18} aria-hidden="true" />,
  users: <Users size={18} aria-hidden="true" />,
};

/*
  02 About — a dossier sheet arriving over the desk (DesignRules.md §4 `02`).
  Server component: no client JS. The paper clip holds a head crop of the same
  figurine as the hero, so there is one identity and no photograph.
*/
export function About() {
  return (
    <section id="about" data-studio="manuscript" aria-labelledby="about-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <article className="paper-sheet sheet-arrival fold-tr relative border border-line bg-raised p-6 sm:p-10 lg:p-14">
          <SectionTitle
            index="02"
            eyebrow={<T en="Dossier" id="Berkas" />}
            title={<T en="About me" id="Tentang saya" />}
            titleId="about-title"
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <figure
              data-eqbot="about-photo"
              data-eqbot-at="above"
              className="relative hidden self-start sm:block lg:col-span-4"
            >
              <span className="paper-clip" aria-hidden="true" />
              <div className="crop-marks relative aspect-square max-w-64 border border-line bg-(--ill-wall)">
                <i /><i /><i /><i />
                <RifqiFigurine crop="head" className="h-full w-full" />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                Rifqi Haikal Chairiansyah
              </figcaption>
            </figure>

            <div className="lg:col-span-8">
              <p className="max-w-[62ch] text-base leading-relaxed text-ink md:text-lg">
                <T
                  en="I'm a software engineer with three years of hands-on development. Most of my work is C#, ASP.NET MVC and .NET Core for enterprise web and data systems: backend services, REST APIs, monitoring dashboards, and secure access with SQL Server, Entity Framework, RBAC, SSO and MFA."
                  id="Saya software engineer dengan tiga tahun pengalaman pengembangan. Sebagian besar pekerjaan saya adalah C#, ASP.NET MVC, dan .NET Core untuk sistem web dan data enterprise: layanan backend, REST API, dashboard pemantauan, serta akses aman dengan SQL Server, Entity Framework, RBAC, SSO, dan MFA."
                />
              </p>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted">
                <T
                  en="I've shipped for telecommunications, oil and gas, research and financial services, and I also work in React, Angular and Spring Boot when a project needs it."
                  id="Saya sudah mengirim sistem untuk telekomunikasi, minyak dan gas, riset, dan jasa keuangan, dan juga bekerja dengan React, Angular, dan Spring Boot bila proyek membutuhkannya."
                />
              </p>

              <dl className="mt-10 grid gap-3 sm:grid-cols-2">
                {aboutHighlights.map((item) => (
                  <div key={item.title} className="index-card border border-line bg-paper p-5">
                    <dt className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                      <span className="text-accent">{icons[item.icon]}</span>
                      <T en={item.title} id={item.titleId} />
                    </dt>
                    <dd className="mt-3 text-[15px] leading-relaxed text-muted">
                      <T en={item.description} id={item.descriptionId} />
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={cvFile} download className="btn-primary-custom">
                  <Download size={16} aria-hidden="true" />
                  <T en="Download CV" id="Unduh CV" />
                </a>
                <a href="#contact" className="btn-outline-custom">
                  <T en="Get in touch" id="Hubungi saya" />
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
