"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types/portfolio";

export function SelectedWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-24 lg:py-32 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff4800] uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
              <span>01 // Selected Work</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase">
              Production <br className="hidden sm:block" />
              Case Studies<span className="text-[#ff4800]">.</span>
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs text-white/50 leading-relaxed">
            Scalable backend architectures, autonomous LangGraph workflows, and zero-trust authentication microservices tested in real workloads.
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
