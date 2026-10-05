"use client";

interface ProductMockupProps {
  projectId: string;
}

export function ProductMockup({ projectId }: ProductMockupProps) {
  switch (projectId) {
    case "fastpik":
      return <FastPikVisual />;
    case "url-shortener":
    default:
      return <UrlShortenerVisual />;
  }
}

// 01. URL SHORTENER: Simple, Clean, High-Speed Cache Architecture
function UrlShortenerVisual() {
  return (
    <div className="w-full bg-[#0c0c10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs select-none">
      {/* Top Application Window Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#08080b] border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-white/50 text-[11px] font-mono ml-2 tracking-wide">
            api.urlshort.dev // redirect_service
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            TESTED LATENCY &lt;50MS
          </span>
        </div>
      </div>

      {/* Main Spacious Canvas */}
      <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[380px] bg-gradient-to-b from-[#111118] to-[#0c0c10] space-y-6">
        {/* Ingress Strip */}
        <div className="p-3.5 rounded-xl bg-[#09090d] border border-white/[0.08] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">GET</span>
            <span className="text-white font-bold">/r/{'{short_code}'}</span>
          </div>
          <span className="text-white/40 text-[10px]">Nginx ──&gt; FastAPI ──&gt; Cache First</span>
        </div>

        {/* 2 Clear, Spacious Architecture Paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Fast Cache Path */}
          <div className="p-5 rounded-xl bg-[#151520] border border-[#ff4d00]/30 shadow-lg shadow-[#ff4d00]/5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#ff4d00] font-bold tracking-wider">FAST PATH // CACHE HIT</span>
              <span className="px-2 py-0.5 rounded bg-[#ff4d00]/15 text-[#ff4d00] text-[9px] font-semibold">&lt;2ms</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white font-sans">Redis In-Memory Cache</div>
              <div className="text-[10px] text-white/50 mt-1.5 leading-relaxed">
                Direct lookup of active redirect URLs without database query roundtrip.
              </div>
            </div>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/60">
              <span>Return 302 Redirect</span>
              <span className="text-emerald-400 font-bold">HTTP 302</span>
            </div>
          </div>

          {/* Database & Analytics Fallback Path */}
          <div className="p-5 rounded-xl bg-[#151520] border border-white/[0.08] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/40 font-bold tracking-wider">PERSISTENCE &amp; STATS</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-white/50 text-[9px]">Async Tasks</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white font-sans">PostgreSQL + Background Worker</div>
              <div className="text-[10px] text-white/50 mt-1.5 leading-relaxed">
                Stores URLs, expiration dates, user authentication, and click analytics.
              </div>
            </div>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/60">
              <span>JWT Auth · Expiration Check</span>
              <span className="text-sky-400 font-bold">SQLAlchemy</span>
            </div>
          </div>
        </div>

        {/* Bottom Deployment Infrastructure Bar */}
        <div className="p-3.5 rounded-xl bg-[#09090d] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[10px] text-white/50">
          <div className="flex items-center gap-4">
            <span>CONTAINER: Docker Compose</span>
            <span>REVERSE PROXY: Nginx</span>
            <span>CLOUD: AWS EC2</span>
          </div>
          <span className="text-white/30">GITHUB ACTIONS CI/CD</span>
        </div>
      </div>
    </div>
  );
}

// 03. FASTPIK: Simple, Clean, Professional Multi-Vendor E-Commerce Backend
function FastPikVisual() {
  return (
    <div className="w-full bg-[#0c0c10] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs select-none">
      {/* Top Application Window Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#08080b] border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-white/50 text-[11px] font-mono ml-2 tracking-wide">
            fastpik.commerce // multi_vendor_backend
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            RBAC ISOLATION ACTIVE
          </span>
        </div>
      </div>

      {/* Main Spacious Canvas */}
      <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[380px] bg-gradient-to-b from-[#111118] to-[#0c0c10] space-y-6">
        {/* Tier 1: 3 Role Pillars with Generous Spacing */}
        <div>
          <div className="text-[10px] text-white/40 tracking-widest uppercase mb-3">01 // ROLE-BASED ACCESS CONTROL (RBAC)</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-3.5 rounded-xl bg-[#151520] border border-white/[0.08] text-center">
              <div className="font-bold text-white text-xs font-sans">Admin Module</div>
              <div className="text-[9px] text-white/40 mt-1">Vendor onboarding &amp; approvals</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#151520] border border-[#ff4d00]/30 text-center">
              <div className="font-bold text-white text-xs font-sans">Vendor Module</div>
              <div className="text-[9px] text-[#ff4d00] mt-1 font-semibold">Product &amp; stock management</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#151520] border border-white/[0.08] text-center">
              <div className="font-bold text-white text-xs font-sans">Customer Module</div>
              <div className="text-[9px] text-white/40 mt-1">Catalog, cart &amp; order workflow</div>
            </div>
          </div>
        </div>

        {/* Tier 2: Core Domain Engine */}
        <div className="p-4 rounded-xl bg-[#13131b] border border-white/[0.08] flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff4d00]" />
            <div>
              <div className="font-bold text-white font-sans text-xs">FastAPI Marketplace Engine</div>
              <div className="text-[10px] text-white/40">SQLAlchemy ORM · Alembic Migrations · Pydantic Validation</div>
            </div>
          </div>
          <div className="text-[10px] text-white/50 font-mono">
            JWT / JWE Auth
          </div>
        </div>

        {/* Tier 3: Storage Dual Block (PostgreSQL + MinIO) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#09090d] border border-white/[0.08] space-y-1">
            <div className="text-[10px] text-white/40 uppercase">RELATIONAL PERSISTENCE</div>
            <div className="font-bold text-white text-xs font-sans">PostgreSQL</div>
            <div className="text-[10px] text-white/50">Normalized products, inventory, orders, and user tables</div>
          </div>

          <div className="p-4 rounded-xl bg-[#09090d] border border-white/[0.08] space-y-1">
            <div className="text-[10px] text-white/40 uppercase">OBJECT STORAGE</div>
            <div className="font-bold text-white text-xs font-sans">MinIO (S3-Compatible)</div>
            <div className="text-[10px] text-white/50">High-throughput product media and vendor asset storage</div>
          </div>
        </div>
      </div>
    </div>
  );
}
