"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Layers } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import CanvasContainer from "@/components/3d/CanvasContainer";
import FeaturedProject3D from "@/components/3d/FeaturedProject3D";
import ProjectModal from "@/components/projects/ProjectModal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Project, ArchitectureNode } from "@/types/portfolio";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArchNode, setSelectedArchNode] = useState<ArchitectureNode | null>(null);

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-950 cyber-grid">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="04 // PRODUCTION SHOWCASE"
          title="SYSTEMS I'VE BUILT"
          subtitle="Distributed platforms, autonomous agent graphs, and high-concurrency microservices engineered for production resilience."
        />

        {/* 1. FEATURED PROJECT 3D SHOWCASE */}
        {featuredProject && (
          <div className="mb-20">
            <div className="relative rounded-2xl border border-cyan-400/40 bg-gradient-to-b from-slate-900/90 to-slate-950/95 backdrop-blur-xl p-6 sm:p-10 shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden">
              {/* Corner HUD tags */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider uppercase">
                    FEATURED SYSTEM // 3D INTERACTIVE ARCHITECTURE
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] uppercase">
                    {featuredProject.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] uppercase">
                    {featuredProject.status}
                  </span>
                </div>
              </div>

              {/* Title and Tagline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                <div className="lg:col-span-8">
                  <h3 className="font-mono font-black text-3xl sm:text-4xl text-white tracking-tight">
                    {featuredProject.name}
                  </h3>
                  <p className="text-cyan-300 font-mono text-base sm:text-lg mt-1">
                    {featuredProject.tagline}
                  </p>
                  <p className="mt-3 text-slate-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
                  <MagneticButton
                    onClick={() => setSelectedProject(featuredProject)}
                    variant="primary"
                    size="md"
                    dataCursor="DETAILS"
                  >
                    <span>Inspect System</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  {featuredProject.github && (
                    <MagneticButton
                      href={featuredProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="md"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Code</span>
                    </MagneticButton>
                  )}
                </div>
              </div>

              {/* 3D Interactive Pipeline Canvas */}
              {featuredProject.architectureNodes && (
                <div className="space-y-4">
                  <div className="w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-xl border border-white/[0.08] bg-slate-950/80 overflow-hidden relative">
                    <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-cyan-400 pointer-events-none">
                      HOVER / CLICK ARCHITECTURE NODES TO INSPECT
                    </div>
                    <div className="absolute top-3 right-3 z-10 font-mono text-[10px] text-slate-500 pointer-events-none">
                      DATA PULSES FLOWING REAL-TIME
                    </div>

                    <CanvasContainer camera={{ position: [0, 0, 5], fov: 50 }}>
                      <FeaturedProject3D
                        nodes={featuredProject.architectureNodes}
                        onSelectNode={setSelectedArchNode}
                        selectedNodeId={selectedArchNode?.id || null}
                      />
                    </CanvasContainer>

                    {/* Active Architecture Node Detail HUD */}
                    {selectedArchNode && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-3 left-3 right-3 z-20 p-3 rounded-lg bg-slate-950/95 border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-md"
                      >
                        <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                          <span className="font-mono text-xs font-bold text-cyan-300">
                            {selectedArchNode.label}
                          </span>
                          <span className="font-mono text-[10px] uppercase text-slate-400">
                            NODE TYPE: {selectedArchNode.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-sans">
                          {selectedArchNode.desc}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* 8-Node Quick Status Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
                    {featuredProject.architectureNodes.map((n, i) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => setSelectedArchNode(n)}
                        className={`p-2 rounded text-left transition-all ${
                          selectedArchNode?.id === n.id
                            ? "bg-cyan-500/20 border border-cyan-400 text-cyan-200"
                            : "bg-slate-900/50 border border-white/[0.06] text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span className="font-mono text-[9px] block text-cyan-400/80">
                          0{i + 1}
                        </span>
                        <span className="font-mono text-[11px] font-bold block truncate">
                          {n.label.split(" ")[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. OTHER PRODUCTION SYSTEMS GRID */}
        <div className="mb-6 flex items-center justify-between">
          <h4 className="font-mono font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            ADDITIONAL PRODUCTION ARCHITECTURES
          </h4>
          <span className="font-mono text-xs text-slate-500">
            {regularProjects.length} SYSTEMS DEPLOYED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full [perspective:800px]"
            >
              <GlassCard
                glow="cyan"
                className="h-full flex flex-col justify-between p-6 bg-slate-900/50 border-white/[0.08] hover:border-cyan-400/40"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-white/10">
                      {project.category}
                    </span>
                    <span className="text-slate-400">{project.status}</span>
                  </div>

                  {/* Project Name & Tagline */}
                  <h3 className="font-mono font-bold text-xl text-white tracking-tight mb-1">
                    {project.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/90 mb-3">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-white/[0.06] text-[10px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none"
                    data-cursor="EXPAND"
                  >
                    <span>Full System Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-white hover:border-cyan-400 border border-white/10 transition-colors"
                        aria-label={`View ${project.name} on GitHub`}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded bg-slate-950 text-slate-400 hover:text-white hover:border-cyan-400 border border-white/10 transition-colors"
                        aria-label={`View ${project.name} live demo`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Project Experience Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
