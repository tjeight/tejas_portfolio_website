import type { SVGProps } from "react";
import type { SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

function GithubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .7a11.3 11.3 0 0 0-3.57 22.02c.57.1.78-.24.78-.55v-2.15c-3.18.69-3.85-1.35-3.85-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.54-.29-5.21-1.27-5.21-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.74.8 1.18 1.82 1.18 3.07 0 4.38-2.68 5.34-5.23 5.63.41.35.77 1.05.77 2.12v3.14c0 .31.21.66.79.55A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function LinkedinMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.27ZM5.32 7.42a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  );
}

const icons: Record<string, (props: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  github: GithubMark,
  linkedin: LinkedinMark,
};

interface SocialLinksProps {
  socials: SocialLink[];
  className?: string;
  linkClassName?: string;
  showHandle?: boolean;
}

export function SocialLinks({
  socials,
  className,
  linkClassName,
  showHandle = false,
}: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-5", className)}>
      {socials.map((social) => {
        const Icon = icons[social.id];

        return (
          <li key={social.id}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                showHandle && !social.ariaLabel.includes(social.handle)
                  ? `${social.ariaLabel} ${social.handle}`
                  : social.ariaLabel
              }
              className={cn(
                "group inline-flex items-center gap-2 text-sm transition-colors duration-300",
                linkClassName,
              )}
            >
              {Icon ? <Icon className="size-4" /> : null}
              <span className={showHandle ? "inline" : "sr-only"}>
                {showHandle ? social.handle : social.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
