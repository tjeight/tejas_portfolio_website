import { GraduationCap } from "lucide-react";
import type { Education as EducationCopy, SectionCopy } from "@/lib/types";
import { formatRange } from "@/lib/utils";
import { SectionIntro } from "@/components/ui/SectionIntro";

interface EducationProps {
  education: EducationCopy;
  section: SectionCopy;
}

export function Education({ education, section }: EducationProps) {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-shell border-t border-line bg-ink"
    >
      <div className="container-x">
        <SectionIntro section={section} headingId="education-heading" />

        <ol className="mt-14 border-t border-line sm:mt-20">
          {education.items.map((item, index) => (
            <li
              key={item.id}
              className="grid gap-6 border-b border-line py-8 sm:py-10 md:grid-cols-[2.5rem_minmax(0,1fr)_10rem_8rem] md:items-start md:gap-8"
              data-reveal
            >
              <span className="font-mono text-[0.6rem] tracking-[0.08em] text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent">
                    <GraduationCap
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.5}
                    />
                  </span>
                  <div>
                    <h3 className="display text-[clamp(1.65rem,3.1vw,2.75rem)] text-bone">
                      {item.degree}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{item.institution}</p>
                    <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-faint">
                      {item.shortDegree} · {item.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:pt-1">
                <p className="mono-label text-faint">{education.labels.periodLabel}</p>
                <p className="mt-2 text-sm text-muted">
                  {formatRange(item.start, item.end)}
                </p>
              </div>

              <div className="md:text-right">
                <p className="mono-label text-faint">{education.labels.cgpaLabel}</p>
                <p className="mt-1 font-mono text-2xl tracking-[-0.04em] text-accent">
                  {item.cgpa}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mono-label mt-6 text-right text-faint">
          {education.items.length.toString().padStart(2, "0")}{" "}
          {education.labels.countLabel}
        </p>
      </div>
    </section>
  );
}
