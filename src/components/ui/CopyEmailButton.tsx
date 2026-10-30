"use client";

import { Check, Copy, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard, cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "error";

interface CopyEmailButtonProps {
  email: string;
  copyLabel: string;
  copiedLabel: string;
  errorLabel: string;
  className?: string;
}

export function CopyEmailButton({
  email,
  copyLabel,
  copiedLabel,
  errorLabel,
  className,
}: CopyEmailButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await copyToClipboard(email);
      setState("copied");
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setState("idle"), 2200);
    } catch {
      setState("error");
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setState("idle"), 3200);
    }
  }

  const label =
    state === "copied" ? copiedLabel : state === "error" ? errorLabel : copyLabel;

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "group inline-flex items-center gap-2 text-sm transition-colors duration-300",
          className,
        )}
      >
        {state === "copied" ? (
          <Check aria-hidden="true" className="size-4 text-accent" strokeWidth={1.8} />
        ) : state === "error" ? (
          <X aria-hidden="true" className="size-4 text-accent" strokeWidth={1.8} />
        ) : (
          <Copy aria-hidden="true" className="size-4" strokeWidth={1.6} />
        )}
        <span>{label}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? copiedLabel : state === "error" ? errorLabel : ""}
      </span>
    </>
  );
}
