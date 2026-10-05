"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Moon, Sun, Terminal } from "lucide-react";
import { playSubtleClick } from "@/components/SoundEffects";

interface NavProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Sync theme on mount
    const isDark =
      document.documentElement.classList.contains("dark") ||
      (typeof window !== "undefined" && localStorage.getItem("theme") === "dark");
    setIsDarkTheme(isDark);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#projects" },
    { label: "Architecture", href: "#architecture" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Experience", href: "#experience" },
  ];

  const handleLinkClick = (href: string) => {
    playSubtleClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleTheme = () => {
    playSubtleClick();
    const nextDark = !isDarkTheme;
    setIsDarkTheme(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch (e) {
        console.error(e);
      }
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#fbfbf9]/85 backdrop-blur-md border-b border-[#e6e4df] py-3.5 shadow-sm"
          : "bg-transparent py-5 lg:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={() => playSubtleClick()}
          className="group flex items-center gap-2.5 font-bold tracking-tight text-[#121215] text-sm uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff4d00]" />
          <span className="group-hover:text-[#ff4d00] transition-colors">
            TEJAS JAGDALE
          </span>
          <span className="hidden sm:inline-block font-mono text-[9px] text-[#121215]/40 tracking-wider px-1.5 py-0.5 border border-[#121215]/15 rounded">
            BACKEND &amp; AI
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              data-cursor="GOTO"
              className="text-[#121215]/70 hover:text-[#121215] transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#ff4d00] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Tools & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Mode Toggle */}
          <button
            onClick={handleToggleTheme}
            title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-[#121215]/70 hover:text-[#121215] border border-[#e6e4df] hover:border-[#121215]/30 rounded transition-all duration-200"
          >
            {isDarkTheme ? <Sun size={14} className="text-[#ff4d00]" /> : <Moon size={14} />}
          </button>

          {onOpenTerminal && (
            <button
              onClick={() => {
                playSubtleClick();
                onOpenTerminal();
              }}
              title="Open System Shell (Shortcut: T)"
              className="p-2 text-[#121215]/50 hover:text-[#121215] border border-[#e6e4df] hover:border-[#121215]/30 rounded transition-colors"
            >
              <Terminal size={14} />
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#contact");
            }}
            data-cursor="TALK"
            className="group flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold text-white bg-[#0c0c0e] hover:bg-[#ff4d00] rounded transition-all duration-200 shadow-sm"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              playSubtleClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-[#121215] border border-[#e6e4df] rounded bg-white shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#e6e4df] bg-[#fbfbf9]/95 backdrop-blur-xl px-6 py-8 shadow-xl"
          >
            <div className="flex flex-col gap-4 text-sm font-mono">
              <div className="text-[10px] text-[#121215]/40 tracking-widest pb-1 border-b border-[#e6e4df]">
                NAVIGATION
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-[#121215]/80 hover:text-[#ff4d00] py-2 text-base font-medium tracking-wide transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-[#e6e4df] flex flex-col gap-3">
                <button
                  onClick={handleToggleTheme}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#e6e4df] text-xs font-mono text-[#121215]/80 hover:text-[#ff4d00] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {isDarkTheme ? <Sun size={15} className="text-[#ff4d00]" /> : <Moon size={15} />}
                    <span>{isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                  </span>
                  <span className="text-[10px] text-[#ff4d00] font-bold">TOGGLE</span>
                </button>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("#contact");
                  }}
                  className="flex items-center justify-center gap-2 py-3 bg-[#ff4d00] text-black font-semibold rounded text-sm tracking-wide"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight size={16} />
                </a>

                <div className="text-[11px] text-center text-[#121215]/40 font-mono pt-1">
                  INDIA (IST) · AVAILABLE FOR CONTRACTS &amp; ROLES
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
