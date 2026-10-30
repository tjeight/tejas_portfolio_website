import { ArrowUpRight } from "lucide-react";
import type { About as AboutCopy, SectionCopy, Site } from "@/lib/types";
import { SectionIntro } from "@/components/ui/SectionIntro";

interface AboutProps {
  about: AboutCopy;
  section: SectionCopy;
  site: Site;
}

export function About({ about, section, site }: AboutProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="paper section-shell"
    >
      <div className="container-x">
        <SectionIntro section={section} headingId="about-heading" tone="light" />

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20">
          <div data-reveal>
            <p className="display-serif max-w-[19ch] text-[clamp(2.1rem,4.4vw,4.1rem)] leading-[1.02] text-ink">
              {about.lead}
            </p>

            <div className="mt-10 max-w-2xl space-y-5 text-pretty text-[0.95rem] leading-[1.75] text-ink/70">
              {about.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-ink/15 pt-6">
              <p className="mono-label text-paper-muted">{about.focusLabel}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.focusItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/20 px-3.5 py-1.5 text-[0.72rem] text-ink/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <p className="mono-label text-paper-muted">{about.principlesLabel}</p>
            <div className="mt-4 border-t border-ink/15">
              {about.principles.map((principle) => (
                <article
                  key={principle.number}
                  className="group grid grid-cols-[2.25rem_1fr] gap-3 border-b border-ink/15 py-6 sm:grid-cols-[3rem_1fr] sm:gap-5"
                  data-reveal
                >
                  <span className="font-mono text-[0.62rem] tracking-[0.08em] text-paper-muted">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="flex items-center justify-between gap-4 text-lg font-medium tracking-[-0.03em] text-ink">
                      {principle.title}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-ink/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        strokeWidth={1.4}
                      />
                    </h3>
                    <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-ink/60">
                      {principle.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-x-5 gap-y-7">
              {about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="mono-label text-paper-muted">{fact.label}</dt>
                  <dd className="mt-2 text-sm leading-snug text-ink/80">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 border-t border-ink/15 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-paper-muted">
              {site.location.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
