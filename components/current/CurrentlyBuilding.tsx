"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { CurrentlyBuildingData } from "@/types/portfolio";

interface CurrentlyBuildingProps {
  buildingData: CurrentlyBuildingData;
}

export default function CurrentlyBuilding({ buildingData }: CurrentlyBuildingProps) {
  return (
    <section id="building" className="py-24 relative overflow-hidden bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={buildingData.sectionTag}
          title={buildingData.heading}
          subtitle={buildingData.subheading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {buildingData.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard
                glow="cyan"
                className="h-full p-6 sm:p-8 bg-slate-900/60 border-white/[0.08] hover:border-cyan-400/40 flex flex-col justify-between"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono uppercase font-bold">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-mono font-bold text-xl sm:text-2xl text-white tracking-tight mb-1">
                    {item.title}
                  </h3>

                  <p className="font-mono text-xs text-cyan-400 mb-4">
                    FOCUS: {item.focus}
                  </p>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Tech pills */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
