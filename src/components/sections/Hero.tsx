import { ArrowDown, ArrowUpRight, MousePointer2 } from "lucide-react";
import type { Hero as HeroCopy, Site } from "@/lib/types";
import { cn } from "@/lib/utils";
import { HeroCanvas } from "@/components/3d/HeroCanvas";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ScrollCue } from "@/components/ui/ScrollCue";

interface HeroProps {
  hero: HeroCopy;
  site: Site;
}

export function Hero({ hero, site }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-[4.5rem]"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container-x relative grid min-h-[calc(100svh-4.5rem)] items-center gap-6 pb-12 pt-10 sm:gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(23rem,0.92fr)] lg:gap-4 lg:pb-16 lg:pt-4">
        <div className="relative z-10 max-w-[52rem]">
          <div className="hero-fade flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow">{hero.eyebrow}</span>
            <span className="hidden h-1 w-1 rounded-full bg-faint sm:block" aria-hidden="true" />
            <span className="font-mono text-[0.66rem] tracking-[0.04em] text-faint">
              {site.location.shortLabel}
            </span>
          </div>

          <h1
            id="hero-heading"
            className="display mt-7 text-[clamp(3.25rem,8.7vw,8.6rem)]"
          >
            {hero.headline.map((line, index) => (
              <span
                key={line.text}
                className={cn(
                  "block overflow-hidden pb-[0.075em] -mb-[0.075em]",
                  line.emphasis ? "text-accent" : "text-bone",
                )}
              >
                <span
                  className="hero-line block"
                  style={{ animationDelay: `${0.08 + index * 0.09}s` }}
                >
                  {line.emphasis ? (
                    <span className="display-serif">{line.text}</span>
                  ) : (
                    line.text
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-fade mt-7 max-w-[34rem] text-pretty text-[0.95rem] leading-[1.7] text-muted sm:mt-8 sm:text-base"
            style={{ animationDelay: "0.34s" }}
          >
            {hero.intro}
          </p>

          <div
            className="hero-fade mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
            style={{ animationDelay: "0.42s" }}
          >
            <MagneticLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowDown
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
                strokeWidth={1.7}
              />
            </MagneticLink>
            <a
              href={hero.secondaryCta.href}
              className="btn btn-ghost group"
            >
              {hero.secondaryCta.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.6}
              />
            </a>
          </div>

          <div
            className="hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ animationDelay: "0.5s" }}
          >
            <SocialLinks
              socials={site.socials}
              linkClassName="text-faint hover:text-bone"
            />
            <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
            <span className="font-mono text-[0.64rem] leading-relaxed tracking-[0.04em] text-faint">
              {hero.status}
            </span>
          </div>
        </div>

        <div
          className="hero-fade relative z-0 -mx-2 sm:mx-0 lg:pl-2"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] lg:max-w-[41rem]">
            <HeroCanvas scene={hero.scene} />

            <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between font-mono text-[0.56rem] uppercase tracking-[0.16em] text-faint sm:inset-x-5 sm:top-5">
              <span>{hero.portraitCaption}</span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {hero.scene.engineLabel}
              </span>
            </div>

            <span className="pointer-events-none absolute bottom-4 right-3 hidden items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint sm:right-5 sm:bottom-5 sm:flex">
              <MousePointer2 aria-hidden="true" className="size-3" strokeWidth={1.5} />
              {hero.scene.hint}
            </span>
          </div>
        </div>
      </div>

      <div className="container-x relative z-10">
        <div className="grid grid-cols-3 border-t border-line">
          {hero.metrics.map((metric) => (
            <div
              key={metric.label}
              className="border-r border-line px-3 py-5 last:border-r-0 sm:px-5 sm:py-6 lg:px-6"
            >
              <p className="display text-[clamp(1.35rem,2.5vw,2.35rem)] leading-none tracking-[-0.045em] text-bone">
                {metric.value}
                {metric.suffix ? (
                  <span className="text-[0.55em] text-muted">{metric.suffix}</span>
                ) : null}
              </p>
              <p className="mt-2 max-w-[12rem] text-pretty text-[0.62rem] leading-relaxed text-faint sm:text-[0.7rem]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between py-5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
            {site.location.label}
          </span>
          <div className="hidden sm:block">
            <ScrollCue href="#about" />
          </div>
        </div>
      </div>
    </section>
  );
}
