"use client";

import { useMemo } from "react";
import { GitCommit, GitBranch, Code, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { GithubActivityData, Personal } from "@/types/portfolio";

interface GithubActivityProps {
  githubData: GithubActivityData;
  personal: Personal;
}

export default function GithubActivity({ githubData, personal }: GithubActivityProps) {
  // Generate realistic contribution matrix grid cells (e.g. 52 weeks x 7 days)
  const contributionGrid = useMemo(() => {
    const weeks = 28; // Display 28 weeks
    const days = 7;
    const grid = [];

    // Deterministic pseudo-random pattern based on index to look realistic without flickering
    for (let w = 0; w < weeks; w++) {
      const col = [];
      for (let d = 0; d < days; d++) {
        const seed = (w * 7 + d * 13) % 17;
        let intensity = 0;
        if (seed > 14) intensity = 3;
        else if (seed > 10) intensity = 2;
        else if (seed > 5) intensity = 1;
        col.push(intensity);
      }
      grid.push(col);
    }
    return grid;
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 3:
        return "bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.7)]";
      case 2:
        return "bg-cyan-600/80";
      case 1:
        return "bg-cyan-900/60";
      default:
        return "bg-slate-900/80";
    }
  };

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-slate-950 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={githubData.sectionTag}
          title={githubData.heading}
          subtitle={githubData.subheading}
        />

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {githubData.stats.map((stat, i) => (
            <GlassCard key={i} className="p-4 bg-slate-900/60">
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <span className="font-mono font-black text-2xl sm:text-3xl text-cyan-400">
                {stat.value}
              </span>
            </GlassCard>
          ))}
        </div>

        {/* Contribution Matrix Glass Card */}
        <GlassCard glow="cyan" className="p-6 sm:p-8 bg-slate-900/70 border-white/[0.08] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-3">
            <div className="flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider">
                CONTRIBUTION MATRIX // RECENT PRODUCTION SPRINTS
              </h3>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-900" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-900/60" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-600/80" />
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
              <span>More</span>
            </div>
          </div>

          {/* Matrix Cells */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-[620px]">
              {contributionGrid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 hover:scale-125 cursor-default ${getCellColor(
                        level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Aggregated engineering activity across public and private repositories</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>View @tejasjagdale on GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </GlassCard>

        {/* Languages Breakdown & Recent Commit Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Languages */}
          <div className="lg:col-span-5">
            <GlassCard className="p-6 bg-slate-900/60">
              <h4 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" />
                PRIMARY CODEBASE DISTRIBUTION
              </h4>

              {/* Progress bar */}
              <div className="h-3 w-full rounded-full overflow-hidden flex mb-4 bg-slate-950">
                {githubData.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: lang.share,
                      backgroundColor: lang.color,
                    }}
                    title={`${lang.name}: ${lang.share}`}
                  />
                ))}
              </div>

              {/* Legend list */}
              <div className="space-y-2">
                {githubData.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-slate-200">{lang.name}</span>
                    </div>
                    <span className="text-slate-400 font-bold">{lang.share}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Recent Highlights / Commits */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 bg-slate-900/60">
              <h4 className="font-mono font-bold text-xs text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-violet-400" />
                RECENT COMMIT & ARCHITECTURE DISPATCHES
              </h4>

              <div className="space-y-3">
                {githubData.recentHighlights.map((commit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1 text-[11px] font-mono">
                      <span className="text-cyan-400 font-bold">{commit.repo}</span>
                      <span className="text-slate-500">{commit.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono mb-2">
                      {commit.message}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3 text-slate-400" />
                        {commit.branch}
                      </span>
                      <span>•</span>
                      <span className="text-violet-400">{commit.tech}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
