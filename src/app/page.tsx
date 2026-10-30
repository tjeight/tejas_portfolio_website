import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { ScrollEffects } from "@/components/animations/ScrollEffects";
import {
  about,
  contact,
  education,
  experience,
  footer,
  hero,
  nav,
  projects,
  sections,
  site,
  skills,
  ui,
} from "@/lib/data";

export default function Home() {
  const knowsAbout = skills.categories.flatMap((category) => category.items);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.website,
    email: `mailto:${site.email}`,
    jobTitle: site.title,
    description: site.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    sameAs: site.socials.map((social) => social.url),
    knowsAbout,
    alumniOf: education.items.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
  };

  return (
    <>
      <Header nav={nav} site={site} ui={ui} />
      <main id="main">
        <Hero hero={hero} site={site} />
        <About about={about} section={sections.about} site={site} />
        <Skills skills={skills} section={sections.skills} />
        <Experience experience={experience} section={sections.experience} />
        <Projects projects={projects} section={sections.projects} />
        <Education education={education} section={sections.education} />
        <Contact contact={contact} section={sections.contact} site={site} />
      </main>
      <Footer footer={footer} nav={nav} site={site} />
      <ScrollEffects />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
