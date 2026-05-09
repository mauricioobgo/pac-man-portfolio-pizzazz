import type { ReactNode } from "react";

export function ConsolePanel({
  children,
  className = "",
  title,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-[var(--console-border)] bg-[color-mix(in_oklab,var(--console-panel)_85%,transparent)] backdrop-blur-sm ${className}`}
      style={glow ? { boxShadow: "var(--shadow-neon-cyan)" } : undefined}
    >
      {title && (
        <div className="flex items-center gap-2 border-b border-[var(--console-border)] px-4 py-2.5 font-mono text-xs">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-rose)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-amber)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" />
          <span className="ml-2 text-[var(--accent-cyan)]">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
        // {eyebrow}
      </div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-hi)] md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-[var(--text-mu)]">{description}</p>
      )}
    </div>
  );
}