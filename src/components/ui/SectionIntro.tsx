import type { SectionCopy } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DisplayHeading } from "./DisplayHeading";

interface SectionIntroProps {
  section: SectionCopy;
  className?: string;
  headingId?: string;
  tone?: "dark" | "light";
}

export function SectionIntro({
  section,
  className,
  headingId,
  tone = "dark",
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "grid gap-8 border-t pt-7 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:gap-16 md:pt-9",
        tone === "dark" ? "border-line" : "border-ink/15",
        className,
      )}
      data-reveal
    >
      <div>
        <span className="eyebrow">
          {section.index} / {section.eyebrow}
        </span>
        <DisplayHeading
          id={headingId}
          segments={section.heading}
          className="mt-6 max-w-[15ch] text-[clamp(2.75rem,5.4vw,5.25rem)]"
        />
      </div>
      <p
        className={cn(
          "max-w-md self-end text-pretty text-[0.95rem] leading-relaxed md:justify-self-end md:text-base",
          tone === "dark" ? "text-muted" : "text-ink/65",
        )}
      >
        {section.description}
      </p>
    </div>
  );
}
