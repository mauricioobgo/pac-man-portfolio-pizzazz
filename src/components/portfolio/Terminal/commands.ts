import { profile, projects, experience, certifications, stack } from "@/lib/portfolio-data";

export type Line = { type: "in" | "out" | "err" | "ok" | "ascii"; text: string };

const banner = [
  "Booting MauricioOS v3.14 ...",
  "Loading neural cores ............ [ok]",
  "Mounting /home/mauricio ......... [ok]",
  "Opening port 443 ................ [ok]",
  "",
  "Welcome to MauricioOS. Type 'help' to see available commands.",
];

export function getBanner(): Line[] {
  return banner.map((t) => ({ type: t.includes("[ok]") ? "ok" : "out", text: t }));
}

const helpText = `available commands:
  help                show this help
  whoami              -> mauricio
  hostname / host     -> mauricio
  uname -a            kernel info
  pwd                 print working directory
  ls                  list home directory
  cat <file>          about.md | skills.json | contact.vcf
  experience          work history
  projects [name]     featured projects
  certifications      validated credentials
  stack               tooling i reach for
  ai                  llm / agent work
  github              github profile + repos
  resume / cv         open the resume
  date                current date
  echo <text>         echo arguments
  history             command history
  clear               clear scrollback
  matrix              ENTER THE MATRIX

tip: ask a question ("what stack do you use?") and i'll try to answer.`;

const faq: { match: RegExp; answer: string }[] = [
  { match: /(stack|tools|tech)/i, answer: `primary stack: ${profile.skills.join(", ")}.` },
  { match: /(where|location|based|live)/i, answer: `based in ${profile.location}, currently at ${profile.company}.` },
  { match: /(hire|contact|reach|email)/i, answer: `email ${profile.email} or linkedin ${profile.linkedin}.` },
  { match: /(experience|work|background)/i, answer: experience.map((e) => `• ${e.role} @ ${e.company} (${e.date})`).join("\n") },
  { match: /(project|build|portfolio)/i, answer: projects.map((p) => `• ${p.name} — ${p.summary}`).join("\n") },
  { match: /(cert|aws|certif)/i, answer: certifications.filter((c) => c.featured).map((c) => `• ${c.title}`).join("\n") },
  { match: /(ai|llm|agent)/i, answer: "applied LLM workflows: RAG, tool calling, structured outputs, evaluation datasets, healthcare HL7 agent." },
  { match: /(role|title|who|what.*do)/i, answer: `${profile.title}. ${profile.about}` },
];

export type ExecCtx = {
  history: string[];
  pushHistory: (s: string) => void;
  setMatrix: (b: boolean) => void;
  clear: () => void;
};

export function execute(raw: string, ctx: ExecCtx): Line[] {
  const cmd = raw.trim();
  if (!cmd) return [];
  ctx.pushHistory(cmd);
  const [head, ...args] = cmd.split(/\s+/);
  const arg = args.join(" ");

  const out = (text: string): Line => ({ type: "out", text });
  const ok = (text: string): Line => ({ type: "ok", text });
  const err = (text: string): Line => ({ type: "err", text });

  switch (head) {
    case "help":
      return helpText.split("\n").map(out);
    case "whoami":
      return [ok("mauricio")];
    case "hostname":
    case "host":
      return [ok("mauricio")];
    case "uname":
      return [out("MauricioOS 3.14 #1 SMP cloud-native x86_64 GNU/Engineer")];
    case "pwd":
      return [out("/home/mauricio")];
    case "ls":
      return [out("about.md   experience/   projects/   skills.json   certifications/   contact.vcf   resume.pdf")];
    case "cat": {
      if (arg === "about.md")
        return profile.about.match(/.{1,80}(\s|$)/g)?.map(out) ?? [out(profile.about)];
      if (arg === "skills.json")
        return JSON.stringify({ skills: profile.skills }, null, 2).split("\n").map(out);
      if (arg === "contact.vcf")
        return [
          out("BEGIN:VCARD"),
          out(`FN:${profile.name}`),
          out(`EMAIL:${profile.email}`),
          out(`URL:${profile.linkedin}`),
          out(`URL:${profile.github}`),
          out("END:VCARD"),
        ];
      return [err(`cat: ${arg || "missing operand"}: no such file`)];
    }
    case "experience":
      return experience.flatMap((e) => [
        ok(`${e.role} @ ${e.company} — ${e.date}`),
        out(`  ${e.description}`),
      ]);
    case "projects": {
      if (arg && arg !== "--list") {
        const p = projects.find((x) => x.name.toLowerCase().includes(arg.toLowerCase()));
        if (!p) return [err(`projects: ${arg} not found`)];
        return [
          ok(p.name),
          out(p.summary),
          out(`stack: ${p.tech_stack.join(", ")}`),
          ...(p.github_url ? [out(`repo: ${p.github_url}`)] : []),
        ];
      }
      return projects.map((p) => out(`• ${p.name} — ${p.summary}`));
    }
    case "certifications":
      return certifications.map((c) => out(`${c.featured ? "★" : "·"} ${c.title} (${c.issuer})`));
    case "stack":
      return Object.entries(stack).flatMap(([k, v]) => [ok(k + ":"), out("  " + (v as string[]).join(", "))]);
    case "ai":
      return [
        out("applied LLM systems:"),
        out("• HL7 healthcare agent — parsing, classification, tool calling"),
        out("• AI DataOps platform — RAG over governed datasets"),
        out("• Resume / CV assistant — retrieval over personal context"),
      ];
    case "github":
      return [ok(profile.github), ...projects.filter((p) => p.github_url).map((p) => out(`• ${p.github_url}`))];
    case "resume":
    case "cv":
      window.open(profile.resume_link, "_blank");
      return [ok("opening resume in new tab ...")];
    case "date":
      return [out(new Date().toString())];
    case "echo":
      return [out(arg)];
    case "history":
      return ctx.history.map((h, i) => out(`${i + 1}  ${h}`));
    case "clear":
      ctx.clear();
      return [];
    case "sudo":
      return [err("permission denied. nice try.")];
    case "rm":
      if (arg.includes("-rf")) return [err("⚠  detected destructive op"), ok("just kidding 😉")];
      return [err(`rm: ${arg}: not enough nope`)];
    case "coffee":
      return [
        { type: "ascii", text: "      ( (" },
        { type: "ascii", text: "       ) )" },
        { type: "ascii", text: "    ........" },
        { type: "ascii", text: "    |      |]" },
        { type: "ascii", text: "    \\      /" },
        { type: "ascii", text: "     `----'" },
        ok("brewing ..."),
      ];
    case "matrix":
      ctx.setMatrix(true);
      return [ok("wake up, neo ...")];
    case "exit":
      return [out("nice try. you live here now.")];
    default: {
      if (/[?]|^(what|where|how|why|who|tell|show|do)\b/i.test(cmd)) {
        const hit = faq.find((f) => f.match.test(cmd));
        if (hit) return hit.answer.split("\n").map(out);
        return [out("hmm, i don't have a clean answer for that. try 'help'.")];
      }
      return [err(`command not found: ${head} — try 'help'`)];
    }
  }
}