import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ScrollTransformation from "@/components/hero/ScrollTransformation";
import About from "@/components/about/About";
import TechStack from "@/components/stack/TechStack";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import AgentWorkflow from "@/components/agents/AgentWorkflow";
import BackendArchitecture from "@/components/architecture/BackendArchitecture";
import GithubActivity from "@/components/github/GithubActivity";
import CurrentlyBuilding from "@/components/current/CurrentlyBuilding";
import ResumeSection from "@/components/resume/ResumeSection";
import Contact from "@/components/contact/Contact";

import portfolioData from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";

export default function Home() {
  const data = portfolioData as unknown as PortfolioData;

  return (
    <main className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200 overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* 1. Hero — 3D Developer Core */}
      <Hero heroData={data.hero} personal={data.personal} />

      {/* 2. Scroll Transformation Metamorphosis */}
      <ScrollTransformation />

      {/* 3. About Me — Floating 3D Identity Card */}
      <About aboutData={data.about} personal={data.personal} />

      {/* 4. Tech Stack — 3D Technology Universe */}
      <TechStack skillsData={data.skills} />

      {/* 5. Engineering Experience — Futuristic Timeline */}
      <Experience experienceData={data.experience} />

      {/* 6, 7, 8. Systems I've Built — Featured 3D Pipeline & Projects Showcase */}
      <Projects projects={data.projects} />

      {/* 9. AI / Agent System — Interactive Deterministic Workflow */}
      <AgentWorkflow workflowData={data.aiWorkflow} />

      {/* 10. Backend Architecture — Behind The API */}
      <BackendArchitecture architectureData={data.backendArchitecture} />

      {/* 11. GitHub / Build Activity — Building in Public */}
      <GithubActivity githubData={data.githubActivity} personal={data.personal} />

      {/* 12. Learning / Current Focus — Currently Building */}
      <CurrentlyBuilding buildingData={data.currentlyBuilding} />

      {/* 13. Resume — The Engineering Journey */}
      <ResumeSection portfolioData={data} />

      {/* 14. Contact — 3D Digital Planet & Channel */}
      <Contact personal={data.personal} socials={data.socials} />
    </main>
  );
}
