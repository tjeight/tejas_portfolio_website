"use client";

import { Download, GraduationCap, Award, FileText } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { PortfolioData } from "@/types/portfolio";

interface ResumeSectionProps {
  portfolioData: PortfolioData;
}

export default function ResumeSection({ portfolioData }: ResumeSectionProps) {
  const { personal, education } = portfolioData;

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-slate-950 cyber-grid-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="08 // CURRICULUM VITAE"
          title="THE ENGINEERING JOURNEY"
          subtitle="Comprehensive academic foundations and verified industry engineering trajectory."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Education & Credentials */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-mono font-bold text-base text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              ACADEMIC SPECIALIZATION
            </h3>

            {education.map((edu, idx) => (
              <GlassCard key={idx} className="p-6 bg-slate-900/60">
                <div className="flex items-start justify-between pb-3 mb-3 border-b border-white/[0.08]">
                  <div>
                    <h4 className="font-mono font-bold text-lg text-white">
                      {edu.degree}
                    </h4>
                    <p className="font-mono text-xs text-cyan-400 mt-0.5">
                      {edu.institution} — {edu.location}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-xs border border-white/10 shrink-0">
                    {edu.period}
                  </span>
                </div>

                <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
                  {edu.details}
                </p>

                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                    CORE SYSTEMS COURSEWORK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-xs font-mono text-slate-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Right Column: Key Competencies & Stats */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-mono font-bold text-base text-violet-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-5 h-5 text-violet-400" />
              CORE COMPETENCIES SUMMARY
            </h3>

            <GlassCard className="p-6 bg-slate-900/60 space-y-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider block mb-1">
                  BACKEND & DISTRIBUTED SYSTEMS
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Asynchronous API architecture in FastAPI, database schema design & indexing in PostgreSQL, distributed caching with Redis, message queues with Celery, and Linux containerization.
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <span className="font-mono text-xs text-violet-400 uppercase tracking-wider block mb-1">
                  ARTIFICIAL INTELLIGENCE & AGENTS
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Deterministic agent state machines using LangGraph, semantic search & hybrid retrieval (RAG) with ChromaDB and BM25, and structured prompt engineering with function calling.
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <span className="font-mono text-xs text-sky-400 uppercase tracking-wider block mb-1">
                  INFRASTRUCTURE & DEVOPS
                </span>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Multi-stage Docker builds, AWS cloud deployment (EC2, S3, RDS, ECS), Nginx reverse proxying, SSL termination, and automated CI/CD pipelines via GitHub Actions.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Download Resume Banner CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-mono font-black text-xl text-white tracking-tight">
                OFFICIAL RESUME / CV
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Full chronological employment, patents, publications, and verified production achievements.
              </p>
            </div>
          </div>

          <MagneticButton
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            download="Tejas_Jagdale_Resume.pdf"
            variant="primary"
            size="lg"
            dataCursor="DOWNLOAD"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Resume</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
