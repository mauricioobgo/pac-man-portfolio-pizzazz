import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navSections, profile } from "@/lib/portfolio-data";

export function Topbar() {
  const [active, setActive] = useState("focus");
  useEffect(() => {
    const onScroll = () => {
      let current = navSections[0].id;
      for (const s of navSections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 160) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-6 z-30 mx-auto mt-6 w-[min(96%,1240px)]">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--console-border)] bg-[color-mix(in_oklab,var(--console-panel)_80%,transparent)] px-5 py-3 backdrop-blur-md">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent-cyan)]">
            Mauricio Cloud Console
          </div>
          <div className="text-lg font-bold text-[var(--text-hi)]">{profile.name}</div>
        </div>
        <nav className="flex flex-wrap gap-1">
          {navSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="relative rounded-full px-3.5 py-1.5 font-mono text-xs text-[var(--text-mu)] transition-colors hover:text-[var(--text-hi)]"
            >
              {active === s.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full border border-[var(--accent-cyan)]"
                  style={{ boxShadow: "var(--shadow-neon-cyan)" }}
                  transition={{ type: "spring", damping: 22, stiffness: 220 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}