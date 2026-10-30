import type { SectionCopy, Skills as SkillsCopy } from "@/lib/types";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SkillsExplorer } from "./SkillsExplorer";

interface SkillsProps {
  skills: SkillsCopy;
  section: SectionCopy;
}

export function Skills({ skills, section }: SkillsProps) {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-shell border-t border-line bg-ink"
    >
      <div className="container-x">
        <SectionIntro section={section} headingId="skills-heading" />
        <SkillsExplorer categories={skills.categories} labels={skills.labels} />
      </div>
    </section>
  );
}
