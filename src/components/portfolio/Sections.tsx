import { motion } from "framer-motion";
import { Github, ExternalLink, MapPin, Mail, Linkedin, Award, Cpu, Cloud, Database } from "lucide-react";
import { ConsolePanel, SectionHeading } from "./ConsolePanel";
import {
  certifications,
  experience,
  focusPillars,
  profile,
  projects,
  stack,
  assistantPrompts,
} from "@/lib/portfolio-data";

const reveal = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { type: "spring" as const, damping: 22, stiffness: 180 },
};

function Container({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto mt-28 w-[min(96%,1240px)] scroll-mt-32">
      <motion.div {...reveal}>{children}</motion.div>
    </section>
  );
}

const accentMap = {
  cyan: "var(--accent-cyan)",
  amber: "var(--accent-amber)",
  violet: "var(--accent-violet)",
} as const;

const focusIcons = [Cpu, Cloud, Database] as const;

export function Focus() {
  return (
    <Container id="focus">
      <SectionHeading
        eyebrow="focus"
        title="What I build"
        description="Three pillars where my delivery work compounds."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {focusPillars.map((p, i) => {
          const Icon = focusIcons[i];
          return (
            <ConsolePanel
              key={p.title}
              className="group relative overflow-hidden p-6 transition-transform hover:-translate-y-1"
            >
              <div
                className="mb-4 inline-flex rounded-lg border p-2"
                style={{ borderColor: accentMap[p.accent], color: accentMap[p.accent] }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-hi)]">{p.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-mu)]">{p.body}</p>
              <div
                className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: accentMap[p.accent], boxShadow: `0 0 18px ${accentMap[p.accent]}` }}
              />
            </ConsolePanel>
          );
        })}
      </div>
    </Container>
  );
}

export function Projects() {
  return (
    <Container id="projects">
      <SectionHeading
        eyebrow="projects"
        title="Selected work"
        description="Production patterns from backend, data, cloud, and LLM delivery."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ConsolePanel key={p.name} className="group relative overflow-hidden p-6 transition hover:-translate-y-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                  {p.category} · {p.status}
                </div>
                <h3 className="mt-1 text-xl font-bold text-[var(--text-hi)]">{p.name}</h3>
              </div>
              {p.github_url && (
                <a
                  href={p.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-[var(--console-border)] p-1.5 text-[var(--text-mu)] transition-colors hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]"
                  aria-label={`${p.name} on GitHub`}
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="mt-3 text-sm text-[var(--text-mu)]">{p.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--accent-amber)]">problem</div>
                <p className="mt-1 text-xs text-[var(--text-mu)]">{p.problem}</p>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase text-[var(--accent-green)]">solution</div>
                <p className="mt-1 text-xs text-[var(--text-mu)]">{p.solution}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech_stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--console-border)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--text-mu)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: "var(--accent-cyan)", boxShadow: "var(--shadow-neon-cyan)" }}
            />
          </ConsolePanel>
        ))}
      </div>
    </Container>
  );
}

export function Experience() {
  return (
    <Container id="experience">
      <SectionHeading eyebrow="experience" title="Where I've shipped" />
      <div className="relative space-y-5 border-l border-dashed border-[var(--console-border)] pl-6">
        {experience.map((e) => (
          <ConsolePanel key={e.role + e.company} className="relative p-6">
            <span
              className="absolute -left-[34px] top-7 h-3 w-3 rounded-full bg-[var(--accent-cyan)]"
              style={{ boxShadow: "var(--shadow-neon-cyan)" }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-[var(--text-hi)]">
                {e.role} ·{" "}
                {e.company_url ? (
                  <a
                    href={e.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent-cyan)] hover:underline"
                  >
                    {e.company}
                  </a>
                ) : (
                  <span className="text-[var(--accent-cyan)]">{e.company}</span>
                )}
              </h3>
              <div className="font-mono text-xs text-[var(--text-mu)]">{e.date} · {e.location}</div>
            </div>
            <p className="mt-2 text-sm text-[var(--text-mu)]">{e.description}</p>
            <ul className="mt-3 space-y-1.5">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-[var(--text-mu)]">
                  <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--accent-amber)]" />
                  {h}
                </li>
              ))}
            </ul>
          </ConsolePanel>
        ))}
      </div>
    </Container>
  );
}

export function Certifications() {
  return (
    <Container id="certifications">
      <SectionHeading eyebrow="certifications" title="Validated credentials" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <a
            key={c.title}
            href={c.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <ConsolePanel
              className="h-full p-5 transition hover:-translate-y-1"
              glow={c.featured}
            >
              <div className="flex items-start gap-3">
                <Award
                  className="h-5 w-5 flex-none"
                  style={{ color: c.featured ? "var(--accent-amber)" : "var(--accent-cyan)" }}
                />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-mu)]">
                    {c.issuer} · {c.level}
                  </div>
                  <h3 className="mt-1 text-sm font-bold text-[var(--text-hi)]">{c.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--console-border)] px-2 py-0.5 font-mono text-[9px] text-[var(--text-mu)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ConsolePanel>
          </a>
        ))}
      </div>
    </Container>
  );
}

export function GitHubFeed() {
  // Mock heatmap
  const cells = Array.from({ length: 7 * 26 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const v = seed / 233280;
    return v < 0.3 ? 0 : v < 0.55 ? 1 : v < 0.8 ? 2 : v < 0.95 ? 3 : 4;
  });
  const colors = ["transparent", "20%", "45%", "70%", "100%"];
  return (
    <Container id="github">
      <SectionHeading
        eyebrow="github"
        title="Open work"
        description="Selected repositories on GitHub."
      />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <ConsolePanel title="contributions @ mauricioobgo" className="p-5">
          <div
            className="mt-3 grid w-full gap-1"
            style={{ gridTemplateColumns: "repeat(26, minmax(0, 1fr))", gridAutoFlow: "column", gridTemplateRows: "repeat(7, 1fr)" }}
          >
            {cells.map((v, i) => (
              <div
                key={i}
                className="aspect-square rounded-[3px] border border-[var(--console-border)]"
                style={{
                  background:
                    v === 0
                      ? "transparent"
                      : `color-mix(in oklab, var(--accent-green) ${colors[v]}, transparent)`,
                }}
              />
            ))}
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-[var(--accent-cyan)] hover:underline"
          >
            <Github className="h-4 w-4" /> github.com/mauricioobgo <ExternalLink className="h-3 w-3" />
          </a>
        </ConsolePanel>
        <div className="space-y-3">
          {projects.filter((p) => p.github_url).slice(0, 3).map((p) => (
            <a
              key={p.name}
              href={p.github_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <ConsolePanel className="p-4 transition hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-xs text-[var(--accent-cyan)]">{p.category}</div>
                    <div className="font-bold text-[var(--text-hi)]">{p.name}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[var(--text-mu)]" />
                </div>
              </ConsolePanel>
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}

export function AISection() {
  return (
    <Container id="ai">
      <SectionHeading
        eyebrow="ai"
        title="Talk to MauricioOS"
        description="Click any prompt to send it to the terminal above."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {assistantPrompts.map((q) => (
          <button
            key={q}
            onClick={() => {
              const evt = new CustomEvent("term:prefill", { detail: q });
              window.dispatchEvent(evt);
              document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group text-left"
          >
            <ConsolePanel className="p-5 transition hover:-translate-y-0.5">
              <div className="font-mono text-xs text-[var(--accent-violet)]">$ ask</div>
              <div className="mt-1 text-[var(--text-hi)] group-hover:text-[var(--accent-cyan)]">{q}</div>
            </ConsolePanel>
          </button>
        ))}
      </div>
    </Container>
  );
}

export function Stack() {
  return (
    <Container id="stack">
      <SectionHeading eyebrow="stack" title="Tooling I reach for" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(stack).map(([cat, items]) => (
          <ConsolePanel key={cat} className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
              {cat}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--console-border)] bg-[color-mix(in_oklab,var(--console-card)_60%,transparent)] px-2.5 py-1 font-mono text-xs text-[var(--text-hi)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </ConsolePanel>
        ))}
      </div>
    </Container>
  );
}

export function Contact() {
  return (
    <Container id="contact">
      <SectionHeading eyebrow="contact" title="Open a connection" />
      <ConsolePanel title="mauricio@cloud:~$ contact" className="p-6">
        <div className="space-y-2 font-mono text-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-[var(--accent-cyan)]" />
            <a href={`mailto:${profile.email}`} className="text-[var(--text-hi)] hover:underline">
              {profile.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="h-4 w-4 text-[var(--accent-cyan)]" />
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-hi)] hover:underline"
            >
              linkedin.com/in/mauricioobgo
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Github className="h-4 w-4 text-[var(--accent-cyan)]" />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-hi)] hover:underline"
            >
              github.com/mauricioobgo
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-[var(--accent-cyan)]" />
            <span className="text-[var(--text-mu)]">{profile.location}</span>
          </div>
        </div>
      </ConsolePanel>
      <footer className="mt-10 pb-10 text-center font-mono text-xs text-[var(--text-mu)]">
        © {new Date().getFullYear()} {profile.name} · built with TanStack + React ·{" "}
        <span className="text-[var(--accent-amber)]">try ↑↑↓↓←→←→BA</span>
      </footer>
    </Container>
  );
}