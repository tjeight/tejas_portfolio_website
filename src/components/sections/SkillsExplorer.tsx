"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Skills } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SkillsExplorerProps {
  categories: Skills["categories"];
  labels: Skills["labels"];
}

export function SkillsExplorer({ categories, labels }: SkillsExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCategory = categories[activeIndex];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % categories.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + categories.length) % categories.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = categories.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[minmax(19rem,0.88fr)_minmax(0,1.12fr)] lg:gap-14">
      <div
        role="group"
        aria-label={labels.categoryLabel}
        className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0 md:pb-0 lg:sticky lg:top-28 lg:self-start"
      >
        {categories.map((category, index) => {
          const selected = index === activeIndex;
          const count = category.items.length;

          return (
            <button
              key={category.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "group flex shrink-0 snap-start items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-colors duration-300 md:w-full md:rounded-none md:border-0 md:border-t md:px-0 md:py-5",
                selected
                  ? "border-accent/45 bg-accent/10 text-bone md:bg-transparent"
                  : "border-line text-muted hover:border-line-strong hover:text-bone",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[0.56rem] tracking-[0.08em]",
                  selected ? "text-accent" : "text-faint",
                )}
              >
                {category.number}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-[0.78rem] transition-colors duration-300 md:flex-1 md:text-lg md:tracking-[-0.03em]",
                  selected ? "text-bone" : "text-muted group-hover:text-bone",
                )}
              >
                {category.title}
              </span>
              <span className="hidden font-mono text-[0.58rem] text-faint md:inline">
                {String(count).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "hidden size-1.5 rounded-full transition-colors md:block",
                  selected ? "bg-accent" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        role="region"
        aria-label={`${labels.activeLabel}: ${activeCategory.title}`}
        tabIndex={0}
        className="min-h-[26rem] rounded-2xl border border-line bg-ink-soft/70 p-6 focus-visible:outline-accent sm:p-8 lg:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory.id}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="mono-label text-faint">
                  {labels.activeLabel} / {activeCategory.number}
                </p>
                <h3 className="display mt-4 text-[clamp(1.9rem,3.5vw,3.2rem)] text-bone">
                  {activeCategory.title}
                </h3>
                <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted">
                  {activeCategory.description}
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent">
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.4} />
              </span>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
              <span className="mono-label text-faint">
                {activeCategory.items.length}{" "}
                {activeCategory.items.length === 1
                  ? labels.countSingular
                  : labels.countPlural}
              </span>
              <span className="font-mono text-[0.58rem] tracking-[0.1em] text-faint">
                {activeCategory.number} / {String(categories.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="mt-2">
              {activeCategory.items.map((item, index) => (
                <motion.li
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    delay: reduceMotion ? 0 : 0.02 * index,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex items-center gap-4 border-b border-line/70 py-3.5 sm:gap-6"
                >
                  <span className="w-6 shrink-0 font-mono text-[0.56rem] text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.95rem] text-bone/85 transition-colors group-hover:text-accent sm:text-base">
                    {item}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto h-px w-0 bg-accent/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8"
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
