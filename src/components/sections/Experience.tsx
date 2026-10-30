import { BriefcaseBusiness, MapPin } from "lucide-react";
import type { Experience as ExperienceCopy, SectionCopy } from "@/lib/types";
import { formatRange } from "@/lib/utils";
import { SectionIntro } from "@/components/ui/SectionIntro";

interface ExperienceProps {
  experience: ExperienceCopy;
  section: SectionCopy;
}

export function Experience({ experience, section }: ExperienceProps) {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-shell border-t border-line bg-ink-soft"
    >
      <div className="container-x">
        <SectionIntro section={section} headingId="experience-heading" />

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-20">
          {experience.items.map((item, itemIndex) => (
            <div key={item.id} className="contents">
              <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
                <span className="mono-label text-faint">
                  {experience.labels.roleLabel} /{" "}
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-5 max-w-[14ch] text-[clamp(2rem,3.8vw,3.5rem)] text-bone">
                  {item.role}
                </h3>
                <p className="mt-4 text-lg tracking-[-0.025em] text-accent">
                  {item.company}
                </p>

                <dl className="mt-8 grid gap-4 border-t border-line pt-5 text-sm">
                  <div className="flex items-center gap-3 text-muted">
                    <dt className="sr-only">{experience.labels.roleLabel}</dt>
                    <dd className="flex items-center gap-3">
                      <BriefcaseBusiness
                        aria-hidden="true"
                        className="size-4 shrink-0 text-faint"
                        strokeWidth={1.5}
                      />
                      <span>{formatRange(item.start, item.end)}</span>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <dt className="sr-only">{experience.labels.locationLabel}</dt>
                    <dd className="flex items-center gap-3">
                      <MapPin
                        aria-hidden="true"
                        className="size-4 shrink-0 text-faint"
                        strokeWidth={1.5}
                      />
                      <span>{item.location}</span>
                    </dd>
                  </div>
                </dl>

                <p className="mt-7 max-w-md text-pretty text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>

                <div className="mt-8 border-t border-line pt-5">
                  <p className="mono-label text-faint">{experience.labels.stackLabel}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.stack.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.03em] text-muted"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div data-timeline className="relative pl-7 sm:pl-10">
                <div
                  aria-hidden="true"
                  className="absolute bottom-1 left-[0.3rem] top-1 w-px bg-line sm:left-[0.6rem]"
                >
                  <div
                    data-timeline-line
                    className="h-full w-full origin-top bg-accent/70"
                  />
                </div>

                <p className="mono-label text-faint">
                  {experience.labels.responsibilitiesLabel}
                </p>

                <ol className="mt-4">
                  {item.highlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      className="relative border-t border-line py-5 last:border-b sm:py-6"
                      data-reveal
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-7 top-[1.75rem] size-1.5 rounded-full bg-accent sm:-left-10"
                      />
                      <div className="grid grid-cols-[1.75rem_1fr] gap-3 sm:grid-cols-[2.5rem_1fr] sm:gap-5">
                        <span className="font-mono text-[0.58rem] tracking-[0.08em] text-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="max-w-2xl text-pretty text-[0.92rem] leading-[1.7] text-bone/75 sm:text-[0.98rem]">
                          {highlight}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
