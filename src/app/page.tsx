"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechnologyStrip } from "@/components/TechnologyStrip";
import { SelectedProjects } from "@/components/SelectedProjects";
import { SystemsThinking } from "@/components/SystemsThinking";
import { BuiltWithIntent } from "@/components/BuiltWithIntent";
import { AboutSection } from "@/components/AboutSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { EngineeringStack } from "@/components/EngineeringStack";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SystemPulse } from "@/components/SystemPulse";
import { TerminalDrawer } from "@/components/TerminalDrawer";
import { playSubtleClick } from "@/components/SoundEffects";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        return;
      }

      if (e.key === "t" || e.key === "T" || e.key === "`") {
        e.preventDefault();
        playSubtleClick();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fbfbf9] text-[#121215] selection:bg-[#ff4d00] selection:text-white grain-overlay">
      {/* Signature System Pulse Spine & Top Progress */}
      <SystemPulse />

      {/* Desktop Follower Cursor */}
      <CustomCursor />

      {/* Minimal Sticky Navigation */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Page Flow strictly structured by visual priority */}
      <main className="relative">
        {/* 1. HERO: Asymmetric Editorial & Interactive 3D System Object */}
        <Hero />

        {/* 2. TECHNOLOGY STRIP: Clean Brand Ticker */}
        <TechnologyStrip />

        {/* 3. SELECTED PROJECTS: Hero of the Portfolio (~65-70% Viewport Visual Dominance) */}
        <SelectedProjects />

        {/* 4. ARCHITECTURE: Interactive Layer Inspector & Pipeline */}
        <SystemsThinking />

        {/* 5. BUILT WITH INTENT: Editorial Manifesto */}
        <BuiltWithIntent />

        {/* 6. ABOUT: Reduced Density + Complex -> Simple Transformation Visual */}
        <AboutSection />

        {/* 7. PHILOSOPHY: Build Simple / Think Deep / Ship Real (Monumental Typography) */}
        <PhilosophySection />

        {/* 8. STACK: Typographic Ecosystem (No Boxy Cards) */}
        <EngineeringStack />

        {/* 9. EXPERIENCE: Minimal Production Timeline */}
        <ExperienceTimeline />

        {/* 10. CONTACT: Closing Statement & Terminating Pulse */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Diagnostic Terminal Drawer (Triggered by Navbar or 'T') */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
