import type { TextSegment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DisplayHeadingProps {
  segments: TextSegment[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}

export function DisplayHeading({
  segments,
  as = "h2",
  className,
  id,
}: DisplayHeadingProps) {
  const Tag = as;

  return (
    <Tag id={id} className={cn("display", className)}>
      {segments.map((segment, index) => (
        <span key={`${segment.text}-${index}`}>
          {segment.emphasis ? (
            <span className="display-serif">{segment.text}</span>
          ) : (
            segment.text
          )}
          {index < segments.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
