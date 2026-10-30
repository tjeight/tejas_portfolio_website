import { ArrowUpRight } from "lucide-react";
import { ui } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  ariaLabel?: string;
}

export function ExternalLink({
  href,
  children,
  className,
  iconClassName,
  showIcon = true,
  ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group/link inline-flex items-center gap-2", className)}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5",
            iconClassName,
          )}
          strokeWidth={1.6}
        />
      ) : null}
      <span className="sr-only">({ui.externalLinkNewTab})</span>
    </a>
  );
}
