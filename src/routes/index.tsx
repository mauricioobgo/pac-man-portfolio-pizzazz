import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/portfolio/BackgroundFX";
import { PacmanBorder } from "@/components/portfolio/PacmanBorder";
import { Topbar } from "@/components/portfolio/Topbar";
import { Hero } from "@/components/portfolio/Hero";
import {
  Focus,
  Projects,
  Experience,
  Certifications,
  GitHubFeed,
  AISection,
  Stack,
  Contact,
} from "@/components/portfolio/Sections";
import { TerminalSection } from "@/components/portfolio/Terminal/Terminal";
import { profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mauricio Obando — Backend, Data, Cloud & AI Engineer" },
      { name: "description", content: profile.subtitle },
      { property: "og:title", content: "Mauricio Obando — Cloud Console" },
      { property: "og:description", content: profile.subtitle },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundFX />
      <PacmanBorder />
      <Topbar />
      <main className="pb-32">
        <Hero />
        <Focus />
        <Projects />
        <Experience />
        <TerminalSection />
        <Certifications />
        <GitHubFeed />
        <AISection />
        <Stack />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            email: `mailto:${profile.email}`,
            address: profile.location,
            worksFor: { "@type": "Organization", name: profile.company },
            sameAs: [profile.github, profile.linkedin],
          }),
        }}
      />
    </div>
  );
}
