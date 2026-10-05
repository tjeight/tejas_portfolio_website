"use client";

export function PhilosophySection() {
  const principles = [
    {
      num: "01",
      title: "BUILD SIMPLE.",
      thesis: "Complexity should earn its place.",
    },
    {
      num: "02",
      title: "THINK DEEP.",
      thesis: "Understand the system before optimizing it.",
    },
    {
      num: "03",
      title: "SHIP REAL.",
      thesis: "Working software beats theoretical perfection.",
    },
  ];

  return (
    <section className="relative py-28 lg:py-36 bg-[#f5f4ef] text-[#121215] border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#ff4d00] uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
          <span>05 // CORE PHILOSOPHY</span>
        </div>

        {/* Section Headline */}
        <div className="max-w-4xl mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#121215] uppercase leading-[1.02]">
            Engineering{" "}
            <span className="font-serif-italic font-normal lowercase tracking-normal text-[#121215]">
              Convictions<span className="text-[#ff4d00] font-sans">.</span>
            </span>
          </h2>
        </div>

        {/* 3 Monumental Typography Columns (Typography doing the work) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {principles.map((p) => (
            <div
              key={p.num}
              className="flex flex-col justify-between pt-6 border-t-2 border-[#121215] group hover:border-[#ff4d00] transition-colors duration-300"
            >
              <div>
                <div className="font-mono text-xs text-[#ff4d00] font-bold mb-6">
                  CONVICTION // {p.num}
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#121215] uppercase mb-4 leading-tight">
                  {p.title}
                </h3>

                <p className="text-base sm:text-lg text-[#121215]/70 font-light leading-relaxed">
                  {p.thesis}
                </p>
              </div>

              <div className="mt-12 pt-4 border-t border-[#e6e4df] font-mono text-[10px] text-[#121215]/40 tracking-wider">
                PRINCIPLE // VERIFIED
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
