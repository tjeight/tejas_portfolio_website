"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project, Projects } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
  project: Project;
  labels: Projects["labels"];
  visualFirst?: boolean;
}

export function ProjectCard({ project, labels, visualFirst = false }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <article
      className="border-t border-ink/15 pt-10 sm:pt-12"
      data-reveal
      aria-labelledby={`project-${project.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-16">
        <div className={cn(visualFirst ? "lg:order-2" : "lg:order-1")}>
          <div className="flex items-center justify-between gap-4">
            <span className="mono-label text-paper-muted">
              {labels.projectLabel} / {project.number}
            </span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
          </div>

          <h3
            id={`project-${project.id}`}
            className="display mt-6 text-[clamp(2.8rem,6.2vw,5.4rem)] text-ink"
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-[0.7rem] font-medium uppercase tracking-[0.13em] text-paper-muted">
            {project.subtitle}
          </p>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-[1.5] tracking-[-0.02em] text-ink/85 sm:text-xl">
            {project.summary}
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-[1.75] text-ink/60">
            {project.description}
          </p>

          <div className="mt-9">
            <p className="mono-label text-paper-muted">{labels.notesLabel}</p>
            <ol className="mt-3 border-t border-ink/15">
              {project.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="grid grid-cols-[1.8rem_1fr] gap-3 border-b border-ink/15 py-3.5 sm:grid-cols-[2.4rem_1fr] sm:gap-4"
                >
                  <span className="font-mono text-[0.56rem] leading-[1.7] tracking-[0.08em] text-paper-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-pretty text-[0.82rem] leading-[1.65] text-ink/65 sm:text-[0.86rem]">
                    {highlight}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 border-t border-ink/15 pt-5">
            <p className="mono-label text-paper-muted">{labels.stackLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-ink/20 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.03em] text-ink/65"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {project.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="btn btn-dark group"
              >
                {link.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.6}
                />
                <span className="sr-only">({labels.linkNote})</span>
              </a>
            ))}
          </div>
        </div>

        <motion.div
          className={cn(
            "lg:sticky lg:top-28 lg:self-start",
            visualFirst ? "lg:order-1" : "lg:order-2",
          )}
          whileHover={reduceMotion ? undefined : { y: -6 }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        >
          <ProjectVisual project={project} labels={labels} />
        </motion.div>
      </div>
    </article>
  );
}
