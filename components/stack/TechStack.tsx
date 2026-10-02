"use client";

import { useState } from "react";
import { RotateCcw, ArrowUpRight, CheckCircle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import CanvasContainer from "@/components/3d/CanvasContainer";
import TechUniverse, { FlatSkillNode } from "@/components/3d/TechUniverse";
import GlassCard from "@/components/ui/GlassCard";
import { SkillsData, SkillItem } from "@/types/portfolio";

interface TechStackProps {
  skillsData: SkillsData;
}

export default function TechStack({ skillsData }: TechStackProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedNode, setSelectedNode] = useState<FlatSkillNode | null>(null);

  // Selected item fallback if none actively hovered in 3D
  const activeTechItem: SkillItem = selectedNode?.item || skillsData.categories[0].items[0];
  const activeTechCategory: string = selectedNode?.category || skillsData.categories[0].name;
  const activeTechColor: string = selectedNode?.color || skillsData.categories[0].color;

  return (
    <section id="stack" className="py-24 relative overflow-hidden bg-slate-950 cyber-grid-dense">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={skillsData.sectionTag}
          title={skillsData.heading}
          subtitle={skillsData.subheading}
        />

        {/* Category Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/[0.08]"
            }`}
          >
            All Domains ({skillsData.categories.reduce((acc, c) => acc + c.items.length, 0)})
          </button>

          {skillsData.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-slate-800 text-white border font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/[0.08]"
              }`}
              style={{
                borderColor: activeCategory === cat.id ? cat.color : undefined,
                boxShadow:
                  activeCategory === cat.id ? `0 0 15px ${cat.color}40` : undefined,
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name} ({cat.items.length})
            </button>
          ))}
        </div>

        {/* 3D Universe + Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Universe Canvas */}
          <div className="lg:col-span-8 relative">
            <div className="w-full h-[450px] sm:h-[520px] lg:h-[600px] rounded-2xl border border-white/[0.08] bg-slate-950/70 backdrop-blur-md overflow-hidden relative">
              {/* Instructions HUD */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono text-xs text-cyan-300 font-bold tracking-widest uppercase">
                  3D CONSTELLATION RUNTIME
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/80 border border-white/10 text-slate-400 font-mono text-[10px] pointer-events-none">
                <RotateCcw className="w-3 h-3 text-cyan-400" />
                <span>DRAG TO ROTATE UNIVERSE</span>
              </div>

              {/* 3D Canvas */}
              <CanvasContainer camera={{ position: [0, 0, 7.5], fov: 45 }}>
                <TechUniverse
                  categories={
                    activeCategory === "all"
                      ? skillsData.categories
                      : skillsData.categories.filter((c) => c.id === activeCategory)
                  }
                  onSelectNode={setSelectedNode}
                  selectedNodeName={selectedNode?.item.name}
                />
              </CanvasContainer>

              {/* Mobile swipe helper */}
              <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 pointer-events-none">
                <span>INTERACTIVE NODES</span>
                <span className="text-cyan-400">NO FAKE % // REAL CONTEXT</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deep-Dive Tech Context HUD Inspector */}
          <div className="lg:col-span-4 space-y-4">
            <GlassCard
              glow="cyan"
              className="p-6 bg-slate-950/90 border-cyan-500/30 sticky top-24"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase">
                  ACTIVE NODE TELEMETRY
                </span>
                <span
                  className="font-mono text-[10px] uppercase px-2 py-0.5 rounded font-bold"
                  style={{
                    backgroundColor: `${activeTechColor}20`,
                    color: activeTechColor,
                    border: `1px solid ${activeTechColor}50`,
                  }}
                >
                  {activeTechCategory}
                </span>
              </div>

              {/* Tech Name */}
              <h3 className="font-mono font-black text-3xl text-white tracking-tight flex items-center gap-2">
                {activeTechItem.name}
              </h3>

              {/* Real Engineering Context */}
              <div className="mt-4 pt-3 border-t border-white/[0.08]">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                  ENGINEERING APPLICATION & CONTEXT:
                </span>
                <p className="text-sm text-slate-200 font-sans leading-relaxed">
                  {activeTechItem.context}
                </p>
              </div>

              {/* Related Technologies */}
              {activeTechItem.related && activeTechItem.related.length > 0 && (
                <div className="mt-5 pt-3 border-t border-white/[0.08]">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-2">
                    RELATED STACK COMPONENTS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTechItem.related.map((rel, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Note */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  PRODUCTION TESTED
                </span>
                <span className="text-cyan-400">ACTIVE PRODUCTION RUNTIME</span>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 2D Flat Matrix for Quick Overview on Mobile or Fast Skimming */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.categories.map((category) => (
            <GlassCard key={category.id} className="p-5 bg-slate-950/60">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.08]">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h4 className="font-mono font-bold text-sm text-white uppercase tracking-wider">
                  {category.name}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
                {category.description}
              </p>
              <div className="space-y-2">
                {category.items.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setSelectedNode({
                        category: category.name,
                        categoryId: category.id,
                        color: category.color,
                        item,
                        position: [0, 0, 0],
                      });
                    }}
                    className={`w-full text-left p-2 rounded transition-colors text-xs font-mono flex items-center justify-between ${
                      activeTechItem.name === item.name
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "hover:bg-slate-900 text-slate-300 border border-transparent"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
