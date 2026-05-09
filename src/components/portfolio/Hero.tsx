import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ConsolePanel } from "./ConsolePanel";
import { heroCommands, profile } from "@/lib/portfolio-data";
import { Sparkles } from "lucide-react";

export function Hero() {
  const [printed, setPrinted] = useState<number>(0);
  useEffect(() => {
    if (printed >= heroCommands.length) return;
    const t = setTimeout(() => setPrinted((p) => p + 1), 380);
    return () => clearTimeout(t);
  }, [printed]);

  return (
    <section className="mx-auto mt-12 grid w-[min(96%,1240px)] gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <ConsolePanel title="console://mauricio" className="p-5">
          <div className="space-y-1 px-1 pb-1 pt-3 font-mono text-sm">
            {heroCommands.slice(0, printed).map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={
                  c.kind === "in"
                    ? "text-[var(--text-hi)]"
                    : c.kind === "out"
                      ? "text-[var(--accent-green)]"
                      : "h-2"
                }
              >
                {c.text}
              </motion.div>
            ))}
            {printed < heroCommands.length && (
              <span className="caret inline-block h-4 w-2 bg-[var(--accent-green)] align-middle" />
            )}
          </div>
        </ConsolePanel>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
        >
          <span className="text-[var(--text-hi)]">{profile.name.split(" ")[0]}</span>{" "}
          <span className="bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-violet)] bg-clip-text text-transparent">
            {profile.name.split(" ")[1]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-2xl font-semibold text-[var(--accent-cyan)]"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-xl text-[var(--text-mu)]"
        >
          {profile.subtitle}
        </motion.p>

        <div className="flex flex-wrap gap-3">
          <a
            href={profile.resume_link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--accent-cyan)] px-5 py-2.5 font-mono text-sm font-semibold text-[var(--console-bg)] transition-transform hover:scale-105"
            style={{ boxShadow: "var(--shadow-neon-cyan)" }}
          >
            $ download_resume
          </a>
          <a
            href="#contact"
            className="rounded-full border border-[var(--console-border)] px-5 py-2.5 font-mono text-sm text-[var(--text-hi)] transition-colors hover:border-[var(--accent-cyan)]"
          >
            $ open_contact
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <ConsolePanel className="p-6" glow>
          <div className="mb-3 flex items-center gap-2 text-[var(--accent-cyan)]">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">AI / Cloud command center</span>
          </div>
          <p className="text-sm text-[var(--text-mu)]">
            Animated network signals, control-plane rhythm, and motion built for the hero
            console.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [0.4, 1, 0.6, 0.9, 0.5] }}
                transition={{ duration: 2 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.05 }}
                className="h-8 origin-bottom rounded-sm bg-gradient-to-t from-[var(--accent-cyan)] to-[var(--accent-violet)] opacity-80"
              />
            ))}
          </div>
        </ConsolePanel>
        <ConsolePanel className="px-5 py-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--accent-amber)]">retro droid runway</span>
            <span className="text-[var(--accent-green)]">kinetic scan online</span>
          </div>
        </ConsolePanel>
        <ConsolePanel className="px-5 py-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-mu)]">location</span>
            <span className="text-[var(--text-hi)]">{profile.location}</span>
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-mu)]">status</span>
            <span className="flex items-center gap-1.5 text-[var(--accent-green)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)] pulse-soft" />
              available · {profile.company}
            </span>
          </div>
        </ConsolePanel>
      </div>
    </section>
  );
}