"use client";

import { useState } from "react";
import { Project } from "@/types/portfolio";
import { ProjectVisualPreview } from "./ProjectVisualPreview";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { playSubtleClick } from "@/components/SoundEffects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 === 1; // Alternating layout rhythm

  const handleOpenCase = () => {
    playSubtleClick();
    onSelect(project);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-white/[0.08] pt-12 lg:pt-16 pb-12 lg:pb-16 transition-colors duration-300"
    >
      {/* Editorial Index Badge */}
      <div className="flex items-center justify-between mb-8 font-mono text-xs">
        <div className="flex items-center gap-3 text-white/40">
          <span className="text-[#ff4800] font-bold">PROJECT 0{index + 1}</span>
          <span>/</span>
          <span className="tracking-wider uppercase">{project.category}</span>
        </div>
        <div className="text-white/30 hidden sm:block">
          STATUS: PRODUCTION-GRADE // {project.year}
        </div>
      </div>

      {/* Alternating Asymmetric Grid */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isReversed ? "lg:grid-flow-dense" : ""
        }`}
      >
        {/* Visual Preview (~65% width on desktop) */}
        <div
          onClick={handleOpenCase}
          data-cursor="CASE"
          className={`cursor-pointer transition-transform duration-500 ${
            isHovered ? "scale-[1.01]" : "scale-100"
          } ${isReversed ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-7"}`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ring-1 ring-white/10 group-hover:ring-[#ff4800]/40">
            <ProjectVisualPreview project={project} isHovered={isHovered} />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="px-5 py-2.5 rounded-full bg-[#ff4800] text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-[#ff4800]/30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span>Inspect Full Case Study</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Specifications (~35% width on desktop) */}
        <div
          className={`flex flex-col justify-center space-y-6 ${
            isReversed ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5"
          }`}
        >
          <div>
            <div className="font-mono text-[11px] text-[#ff4800] mb-2 tracking-wider uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4800]" />
              {project.role}
            </div>
            <h3
              onClick={handleOpenCase}
              data-cursor="OPEN"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors cursor-pointer"
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light mt-3">
              {project.description}
            </p>
          </div>

          {/* Quick Problem & Solution summary */}
          <div className="space-y-3 pt-2">
            <div className="border-l-2 border-red-500/40 pl-3">
              <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider block">
                The Problem
              </span>
              <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                {project.problem}
              </p>
            </div>
            <div className="border-l-2 border-emerald-500/40 pl-3">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block">
                Engineering Approach
              </span>
              <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-white/75 group-hover:border-white/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
            <button
              onClick={handleOpenCase}
              data-cursor="INSPECT"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded hover:bg-[#ff4800] hover:text-white transition-all duration-200"
            >
              <span>Explore Architecture</span>
              <ArrowRight size={13} />
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSubtleClick()}
              data-cursor="GITHUB"
              className="p-2.5 text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon size={16} />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSubtleClick()}
                data-cursor="DEMO"
                className="p-2.5 text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded transition-colors"
                title="Live Demonstration"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
