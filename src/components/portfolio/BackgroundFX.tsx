export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl float-slow"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-cyan) 35%, transparent), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-3xl float-slow"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-violet) 30%, transparent), transparent 70%)", animationDelay: "-7s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full blur-3xl float-slow"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--accent-amber) 22%, transparent), transparent 70%)", animationDelay: "-3s" }}
      />
      <div className="absolute inset-0 scanlines" />
    </div>
  );
}