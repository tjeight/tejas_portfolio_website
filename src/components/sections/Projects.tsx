import type { Projects as ProjectsCopy, SectionCopy } from "@/lib/types";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  projects: ProjectsCopy;
  section: SectionCopy;
}

export function Projects({ projects, section }: ProjectsProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="paper section-shell"
    >
      <div className="container-x">
        <SectionIntro section={section} headingId="projects-heading" tone="light" />

        <div className="mt-14 space-y-20 sm:mt-20 sm:space-y-28">
          {projects.items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              labels={projects.labels}
              visualFirst={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
