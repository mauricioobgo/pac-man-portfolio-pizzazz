## Mauricio Cloud Console — TS/React Refactor of the Flet Portfolio

A faithful refactor of `mauricioobgo/portfolioMauricioobgo` (Python/Flet) into the current TanStack Start + React + Tailwind v4 project — same content and "Mauricio Cloud Console" identity, but elevated with a scroll-driven Pac-Man border, a real interactive Linux terminal with Matrix rain, and a richer cinematic motion system.

### Source-of-truth content (ported from the Flet repo)

I'll mirror the YAML/JSON content from the repo into a typed TypeScript module so nothing drifts:

- `src/lib/portfolio-data.ts` — typed exports for `profile`, `experience`, `projects`, `certifications`, `stack`, `heroCommands`, `assistantPrompts`, `socials`. Values copied from `portfolio_app/data/{profile,experience,featured_projects,certifications}.yaml` and `src/assets/portfolio_content.json`.
- Profile: Mauricio Obando — Backend, Data, Cloud, and AI Engineer · Bogotá, Colombia · Globant · `mauricioobgo@gmail.com` · GitHub `mauricioobgo` · LinkedIn `mauricioobgo`.
- Experience: Globant (current Data Engineer), AWS Technical Account Manager, Publicis Media Data Engineer Specialist.
- Projects: AI DataOps Platform, Redshift Performance & Cost Analyzer, LLM Healthcare / HL7 Agent, Cloud Cost Intelligence Dashboard, FastAPI Production Template.
- Certifications: AWS Solutions Architect Professional, AWS ML Specialty, DS4A, Google Analytics, TensorFlow intro, etc.
- Hero commands: `$ whoami` → `mauricio_obando`, `$ current_focus`, `$ stack --top` (verbatim).

### Design system (refined arcade, ported + elevated)

Tokens added to `src/styles.css` (oklch equivalents of the Flet palette):

- `--console-bg` ≈ `#020617`, `--console-panel` ≈ `#0F172A`, `--console-card` ≈ `#111827`, `--console-border` ≈ `#1E293B`
- `--accent-cyan` ≈ `#38BDF8` (primary), `--accent-green` ≈ `#22C55E` (terminal/secondary), `--accent-violet` ≈ `#A855F7`, `--accent-amber` ≈ `#F59E0B` (Pac-Man dots), `--accent-rose` ≈ `#FB7185`
- `--text` ≈ `#F8FAFC`, `--muted` ≈ `#94A3B8`
- Shadows/gradients: `--shadow-neon-cyan`, `--shadow-neon-green`, `--gradient-console`, `--grid-overlay`

Typography: **Poppins** (display) + **IBM Plex Mono** (mono/CLI/labels) — matches the repo's bundled fonts. Loaded from Google Fonts.

### Page structure (single landing route, true sections + scroll-spy nav)

Order matches the Flet app: **Focus, Projects, Experience, Certifications, GitHub, AI, Stack, Contact**.

1. **Topbar** — "MAURICIO CLOUD CONSOLE" eyebrow, "Mauricio Obando" name, pill nav with magic-pill active state.
2. **Hero** — left: typing terminal block of `hero_commands`, big H1, subtitle, CTAs (Resume → `resume_link`, Contact). Right: animated "AI / Cloud command center" panel with pulsing signal bars + status chips (`retro droid runway`, `kinetic scan online`).
3. **Focus** — three pillar cards (Backend & APIs, Data & Cloud, AI Systems).
4. **Projects** — console-panel grid from `featured_projects.yaml`, each card with problem/solution/architecture, tech tag pills, GitHub link, hover lift + neon edge sweep.
5. **Experience** — vertical timeline; nodes light up on scroll-in.
6. **Terminal** — flagship interactive Linux CLI section (details below).
7. **Certifications** — badge marquee with featured AWS certs prominent.
8. **GitHub** — contribution heatmap mock + top repos linking to `github.com/mauricioobgo`.
9. **AI** — assistant card with the four `assistant_prompts` as clickable suggestions that pre-fill the terminal.
10. **Stack** — categorized pill chips (Languages, Cloud, Data, AI, DevOps).
11. **Contact** — terminal-prompt styled form (`> name:`, `> message:`) + email/socials.
12. **Footer** — minimal, Konami code easter-egg hint.

### The Pac-Man border (signature feature)

Fixed full-viewport SVG overlay (pointer-events: none) drawing a rounded-rectangle path 24px inside viewport edges:

- Amber pellet rail along the path; Pac-Man rides it via `getPointAtLength(scrollProgress * pathLength)`.
- Pellets behind fade ("eaten"); pellets ahead glow.
- Mouth chomps on a sine wave; rotation auto-aligns to path tangent at corners.
- 4 corner power pellets pulse the cyan frame when passed.
- Faint cyan ghost trails ~15% behind on long pages.
- Reduced-motion / small-screen fallback: static dotted frame, no Pac-Man.

### Matrix Terminal (interactive Linux CLI with Matrix rain)

A full-width "console panel" titled `mauricio@cloud:~$` that behaves like a real shell.

**Visual**:
- Behind the terminal: canvas-rendered Matrix rain (falling green katakana + 0/1), low opacity, slows on hover, speeds up while typing.
- Three traffic-light dots, prompt line, blinking block cursor, scrollback area, monospace IBM Plex.
- Boot sequence on first reveal: `Booting MauricioOS v3.14...` → `Loading neural cores...` → `Welcome. Type 'help' to begin.`
- Auto-focus when the section enters the viewport.

**Behavior**: command history (↑/↓), Tab autocomplete, ARIA live region for accessibility.

**Command set** (all return styled output, async typewriter for long ones):

| Command | Output |
|---|---|
| `help` | grouped command list |
| `whoami` | `mauricio` |
| `hostname` / `host` | `mauricio` |
| `uname -a` | `MauricioOS 3.14 #1 SMP cloud-native x86_64 GNU/Engineer` |
| `pwd` | `/home/mauricio` |
| `ls` / `ls -la` | virtual file tree: `about.md  experience/  projects/  skills.json  certifications/  contact.vcf  resume.pdf` |
| `cat about.md` | `profile.about` from data |
| `cat skills.json` | pretty JSON of `profile.skills` |
| `cat contact.vcf` | email + socials |
| `experience` | timeline of roles from `experience` data |
| `projects --list` | top projects with one-liner + GitHub link |
| `projects <name>` | full project case study |
| `certifications` | AWS/GCP/etc list |
| `stack` | grouped tech list |
| `ai` | summary of LLM/agent work + assistant prompt suggestions |
| `github` | profile link + top repos |
| `resume` / `cv` | opens `resume_link` in new tab |
| `date` | live current date |
| `echo <text>` | echoes args |
| `history` | command history |
| `clear` | clears scrollback |
| `sudo <anything>` | `Permission denied. Nice try.` |
| `rm -rf /` | ascii-art warning + `just kidding 😉` |
| `coffee` | ascii cup + `brewing...` |
| `matrix` | full Matrix takeover for 4s + "Wake up, Neo..." overlay |
| unknown | `command not found: X — try 'help'` |

**Natural-language fallback**: if input doesn't match a command and looks like a question (contains `?` or starts with what/where/how/why/who), it answers from a small local FAQ map seeded from the YAML content (e.g. "what stack do you use?" → derived from `profile.skills`; "where are you based?" → `Bogotá, Colombia`; "how can I hire you?" → email + LinkedIn). Fully offline. Easy to swap for a real LLM via Lovable AI Gateway later (one-line replacement in `commands.ts`).

### Motion system

- Library: Framer Motion + a single `useScrollProgress` hook for Pac-Man.
- Section reveals: stagger fade + 16px rise + slight blur, spring `{ damping: 22, stiffness: 180 }`, IntersectionObserver once.
- Headline: per-word clip-path reveal; subtitle types in.
- Cards: hover lift + cyan glow + dotted underline sweep.
- Background: slow-drifting cyan + violet radial blobs, parallax dot grid, subtle scanline overlay.
- Konami code easter egg: brief Pac-Man chase across the hero.

### File layout

- `src/routes/index.tsx` — replaces placeholder, composes sections.
- `src/components/portfolio/PacmanBorder.tsx`
- `src/components/portfolio/Topbar.tsx`, `Hero.tsx`, `Focus.tsx`, `Projects.tsx`, `Experience.tsx`, `Certifications.tsx`, `GitHub.tsx`, `AI.tsx`, `Stack.tsx`, `Contact.tsx`, `Footer.tsx`, `ConsolePanel.tsx`, `SectionHeading.tsx`, `BackgroundFX.tsx`, `TypingLine.tsx`
- `src/components/portfolio/Terminal/Terminal.tsx`
- `src/components/portfolio/Terminal/MatrixRain.tsx`
- `src/components/portfolio/Terminal/commands.ts`
- `src/hooks/useScrollProgress.ts`, `src/hooks/useReducedMotion.ts`, `src/hooks/useScrollSpy.ts`
- `src/lib/portfolio-data.ts` — typed mirror of the Flet repo's YAML/JSON content

### SEO & accessibility

- Title: "Mauricio Obando — Backend, Data, Cloud & AI Engineer"
- Meta description from `profile.subtitle`; og/twitter tags; JSON-LD `Person` schema with sameAs (GitHub, LinkedIn).
- Single H1, semantic `<header>/<main>/<section>/<footer>`, alt text everywhere.
- Respects `prefers-reduced-motion` (Pac-Man + matrix become static, reveals instant); terminal is keyboard-first; AA contrast verified against the dark palette.

### Out of scope (this pass)

- No live GitHub API integration or working contact-form backend (keeps the site fully static like the Flet original); easy to add via Lovable Cloud later.
- No real LLM in the terminal — local FAQ map only. Wiring Lovable AI Gateway is a one-line swap.
- No content pipeline / GitHub Actions sync from the original repo — TS data file is the manual source of truth here.
