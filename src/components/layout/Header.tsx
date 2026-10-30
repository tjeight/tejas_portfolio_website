"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import type { Nav, Site, UiCopy } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/ui/SocialLinks";

interface HeaderProps {
  nav: Nav;
  site: Site;
  ui: UiCopy;
}

export function Header({ nav, site, ui }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = nav.links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav.links]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-colors duration-500",
          scrolled || menuOpen
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
          <a
            href="#top"
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-line-strong font-mono text-[0.66rem] tracking-[0.12em] text-bone transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
              {nav.brand.mark}
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[0.82rem] font-medium tracking-[-0.01em] text-bone">
                {nav.brand.name}
              </span>
              <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.15em] text-faint">
                {nav.brand.role}
              </span>
            </span>
            <span className="sr-only">{nav.brand.homeLabel}</span>
          </a>

          <nav
            aria-label={ui.menuTitle}
            className="hidden items-center gap-7 md:flex"
          >
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={activeSection === link.id ? "location" : undefined}
                className={cn(
                  "group relative flex items-baseline gap-1.5 text-[0.78rem] transition-colors duration-300",
                  activeSection === link.id
                    ? "text-bone"
                    : "text-muted hover:text-bone",
                )}
              >
                <span className="font-mono text-[0.52rem] tracking-[0.08em] text-faint">
                  {link.index}
                </span>
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-2 left-0 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    activeSection === link.id ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={nav.cta.href}
              className="btn btn-ghost hidden h-10 min-h-0 px-4 text-[0.76rem] sm:inline-flex"
            >
              {nav.cta.label}
              <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={ui.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex size-10 items-center justify-center rounded-full border border-line-strong text-bone transition-colors hover:border-bone md:hidden"
            >
              <Menu aria-hidden="true" className="size-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent/70"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={ui.menuTitle}
            className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-ink text-bone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="container-x flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">
                {ui.menuTitle}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={ui.closeMenu}
                className="flex size-10 items-center justify-center rounded-full border border-line-strong text-bone transition-colors hover:border-bone"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <nav
              aria-label={ui.menuTitle}
              className="container-x flex flex-1 flex-col justify-center py-10"
            >
              <ul className="divide-y divide-line border-y border-line">
                {nav.links.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={
                      reducedMotion ? false : { opacity: 0, y: 24 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.5,
                      delay: reducedMotion ? 0 : 0.06 * index,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.6rem] tracking-[0.1em] text-faint">
                          {link.index}
                        </span>
                        <span className="text-[clamp(2rem,8vw,3.5rem)] font-medium tracking-[-0.055em] leading-none">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 text-faint transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                        strokeWidth={1.4}
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="container-x flex flex-col gap-8 border-t border-line py-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mono-label text-faint">{nav.menuFooter.label}</p>
                <SocialLinks
                  socials={site.socials}
                  showHandle
                  linkClassName="mt-4 text-muted hover:text-accent"
                  className="flex-col items-start gap-3"
                />
              </div>
              <div className="sm:text-right">
                <p className="mono-label text-faint">{nav.menuFooter.locationLabel}</p>
                <p className="mt-4 text-sm text-muted">{site.location.label}</p>
              </div>
              <a
                href={nav.cta.href}
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary w-full sm:w-auto"
              >
                {nav.cta.label}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
