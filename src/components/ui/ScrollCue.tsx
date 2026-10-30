import { ArrowDown } from "lucide-react";
import { ui } from "@/lib/data";

interface ScrollCueProps {
  href: string;
}

export function ScrollCue({ href }: ScrollCueProps) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-bone"
    >
      <span className="flex size-8 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-bone">
        <ArrowDown
          aria-hidden="true"
          className="size-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
          strokeWidth={1.6}
        />
      </span>
      <span>{ui.scrollToExplore}</span>
    </a>
  );
}
