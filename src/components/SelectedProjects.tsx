"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { ProductMockup } from "./ProductMockup";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types/portfolio";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";
import { playSubtleClick } from "@/components/SoundEffects";

export function SelectedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    playSubtleClick();
    setSelectedProject(project);
  };

  const projectShortCopy: Record<string, string> = {
    "url-shortener":
      "Production-ready URL shortening backend deployed with FastAPI, Redis caching, PostgreSQL, Docker, Nginx, and AWS EC2.",
    fastpik:
      "Multi-vendor e-commerce backend with separate Admin, Vendor, and Customer modules, RBAC, PostgreSQL schemas, and MinIO storage.",
  };

  const projectMetadataPills: Record<string, string> = {
    "url-shortener": "REDIS CACHE · DOCKER · AWS EC2 · <50MS",
    fastpik: "RBAC · MULTI-TENANT · MINIO S3 · SQLALCHEMY",
  };

  return (
    <section id="projects" className="relative pt-16 pb-24 lg:pt-20 lg:pb-32 bg-[#0c0c0e] text-white border-b border-[#222228] overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="projects-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#33333f" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projects-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header: Compact vertical spacing (Fixes empty space) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
              <span>01 // SELECTED WORK</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[0.98]">
              Selected{" "}
              <span className="font-serif-italic font-normal lowercase tracking-normal text-white">
                Projects<span className="text-[#ff4d00] font-sans">.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 max-w-md">
            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
              Real systems built for scale, intelligence, and reliable product execution.
            </p>
            <a
              href="https://github.com/tjeight"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#ff4d00] hover:text-[#ff6b2c] tracking-wider uppercase transition-colors"
            >
              <span>VIEW ALL ON GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Project Presentations */}
        <div className="space-y-24 lg:space-y-32">
          {PROJECTS.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                className={`group relative transition-all duration-300 ${
                  index === 0 ? "pt-2 sm:pt-4" : "border-t border-white/10 pt-16 lg:pt-20"
                }`}
              >
                {/* Project Number & Category */}
                <div className="flex items-baseline justify-between select-none mb-3 sm:mb-5">
                  <span className="font-mono text-5xl sm:text-7xl font-black text-white/[0.08] group-hover:text-white/[0.14] transition-colors -ml-1 sm:-ml-3">
                    0{index + 1}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-[#ff4d00] uppercase font-semibold">
                    {project.category}
                  </span>
                </div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:grid-flow-dense" : ""
                  }`}
                >
                    {/* Left or Right Details Column (35% Width: 4 Cols on xl) */}
                    <div
                      className={`flex flex-col justify-center space-y-5 order-2 lg:order-none ${
                        isReversed ? "lg:col-span-5 xl:col-span-4 lg:col-start-8 xl:col-start-9" : "lg:col-span-5 xl:col-span-4"
                      }`}
                    >
                      <div>
                        <h3
                          onClick={() => handleOpenModal(project)}
                          data-cursor="VIEW"
                          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase group-hover:text-white/90 transition-colors cursor-pointer"
                        >
                          {project.title}
                        </h3>
                        <div className="font-mono text-xs text-[#ff4d00] mt-1.5 tracking-wider uppercase font-semibold">
                          {project.tagline}
                        </div>
                      </div>

                      {/* Single Concise Description */}
                      <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                        {projectShortCopy[project.id] || project.description}
                      </p>

                      {/* Typographic Tech Stack */}
                      <div className="font-mono text-xs text-white/60 tracking-wide">
                        {project.techStack.slice(0, 5).join(" · ")}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/[0.08]">
                        <button
                          onClick={() => handleOpenModal(project)}
                          data-cursor="VIEW"
                          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-[#ff4d00] hover:text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                        >
                          <span>VIEW CASE STUDY</span>
                          <ArrowUpRight
                            size={14}
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                          />
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playSubtleClick()}
                          data-cursor="GITHUB"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 hover:border-white/40 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                          <GithubIcon size={14} />
                          <span>GITHUB</span>
                        </a>
                      </div>
                    </div>

                    {/* Dominant Visual Presentation Column (~65% Width: 8 Cols on xl) */}
                    <div
                      onClick={() => handleOpenModal(project)}
                      data-cursor="VIEW"
                      className={`relative cursor-pointer transition-all duration-500 ease-out group-hover:scale-[1.015] order-1 lg:order-none ${
                        isReversed
                          ? "lg:col-span-7 xl:col-span-8 lg:col-start-1"
                          : "lg:col-span-7 xl:col-span-8"
                      }`}
                    >
                      {/* Floating Architectural Metadata Pill */}
                      <div className="absolute -top-3 right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#121216] border border-white/20 text-[#ff4d00] font-mono text-[9px] tracking-widest shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-pulse" />
                        <span>{projectMetadataPills[project.id] || "AI + BACKEND"}</span>
                      </div>

                      {/* Visual Container */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:ring-[#ff4d00]/50 transition-all duration-300">
                        <ProductMockup projectId={project.id} />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <div className="px-5 py-2.5 rounded-full bg-[#ff4d00] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-[#ff4d00]/30 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span>EXPLORE ARCHITECTURE</span>
                            <ArrowUpRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal Drawer */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
