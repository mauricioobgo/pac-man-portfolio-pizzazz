import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ConsolePanel, SectionHeading } from "../ConsolePanel";
import { MatrixRain } from "./MatrixRain";
import { execute, getBanner, type Line } from "./commands";

export function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number>(-1);
  const [booted, setBooted] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    const el = document.getElementById("terminal");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !booted) {
          setBooted(true);
          const banner = getBanner();
          banner.forEach((b, i) => setTimeout(() => setLines((p) => [...p, b]), i * 220));
          setTimeout(() => inputRef.current?.focus(), banner.length * 220 + 100);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [booted]);

  useEffect(() => {
    if (!matrix) return;
    const t = setTimeout(() => setMatrix(false), 4200);
    return () => clearTimeout(t);
  }, [matrix]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<string>;
      setInput(ce.detail);
      inputRef.current?.focus();
    };
    window.addEventListener("term:prefill", handler);
    return () => window.removeEventListener("term:prefill", handler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const submit = () => {
    const cmd = input;
    setInput("");
    setHistIdx(-1);
    setLines((prev) => [...prev, { type: "in", text: `mauricio@cloud:~$ ${cmd}` }]);
    const out = execute(cmd, {
      history,
      pushHistory: (s) => setHistory((h) => [...h, s]),
      setMatrix,
      clear: () => setLines([]),
    });
    if (out.length === 0 && cmd.trim() === "clear") return;
    setLines((prev) => [...prev, ...out]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const all = ["help", "whoami", "hostname", "uname", "pwd", "ls", "cat", "experience", "projects", "certifications", "stack", "ai", "github", "resume", "cv", "date", "echo", "history", "clear", "matrix", "coffee"];
      const match = all.find((c) => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal" className="mx-auto mt-28 w-[min(96%,1240px)] scroll-mt-32">
      <SectionHeading
        eyebrow="terminal"
        title="mauricio@cloud:~$"
        description="A real Linux-style shell. Try whoami, ls, cat about.md, projects, or matrix."
      />
      <ConsolePanel title="MauricioOS · /dev/tty1" className="relative overflow-hidden">
        <div className="relative">
          <MatrixRain intense={matrix || typing} />
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="relative z-10 h-[440px] cursor-text overflow-y-auto bg-[color-mix(in_oklab,var(--console-bg)_70%,transparent)] p-5 font-mono text-[13px] leading-relaxed"
          >
            {lines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  l.type === "in"
                    ? "text-[var(--text-hi)]"
                    : l.type === "ok"
                      ? "text-[var(--accent-green)]"
                      : l.type === "err"
                        ? "text-[var(--accent-rose)]"
                        : l.type === "ascii"
                          ? "whitespace-pre text-[var(--accent-amber)]"
                          : "text-[var(--text-mu)]"
                }
              >
                {l.text || "\u00A0"}
              </motion.div>
            ))}
            <div className="flex items-center gap-2 text-[var(--text-hi)]">
              <span className="text-[var(--accent-green)]">mauricio@cloud</span>
              <span className="text-[var(--text-mu)]">:</span>
              <span className="text-[var(--accent-cyan)]">~</span>
              <span className="text-[var(--text-mu)]">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setTyping(true);
                  if (typingTimer.current) window.clearTimeout(typingTimer.current);
                  typingTimer.current = window.setTimeout(() => setTyping(false), 600);
                }}
                onKeyDown={onKey}
                aria-label="Terminal input"
                className="flex-1 bg-transparent text-[var(--text-hi)] outline-none"
                spellCheck={false}
                autoComplete="off"
              />
              <span className="caret inline-block h-4 w-2 bg-[var(--accent-green)]" />
            </div>
          </div>

          {matrix && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[oklch(0.10_0.04_150/0.6)]"
            >
              <div className="text-center font-mono">
                <div className="text-3xl font-bold text-[var(--accent-green)]">
                  Wake up, Neo ...
                </div>
                <div className="mt-2 text-sm text-[var(--accent-green)] opacity-70">
                  the matrix has you.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ConsolePanel>
    </section>
  );
}