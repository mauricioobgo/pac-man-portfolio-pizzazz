import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion, useScrollProgress, useViewportSize } from "@/hooks/useScrollProgress";

const INSET = 28;
const RADIUS = 22;
const DOT_SPACING = 44;

export function PacmanBorder() {
  const { w, h } = useViewportSize();
  const progress = useScrollProgress();
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [tick, setTick] = useState(0);

  // Chomp animation
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      if (t - last > 60) {
        setTick((x) => x + 1);
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const d = useMemo(() => {
    if (w < 768 || h < 600) return "";
    const x = INSET, y = INSET, W = w - INSET * 2, H = h - INSET * 2, r = RADIUS;
    return `M ${x + r} ${y} H ${x + W - r} A ${r} ${r} 0 0 1 ${x + W} ${y + r} V ${y + H - r} A ${r} ${r} 0 0 1 ${x + W - r} ${y + H} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + H - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y}`;
  }, [w, h]);

  useEffect(() => {
    if (pathRef.current && d) setPathLen(pathRef.current.getTotalLength());
  }, [d]);

  if (!d) return null;

  const dotCount = Math.max(20, Math.floor(pathLen / DOT_SPACING));
  const pacAt = pathLen * progress;
  const pac = pathRef.current?.getPointAtLength(pacAt);
  const ahead = pathRef.current?.getPointAtLength(Math.min(pathLen, pacAt + 1));
  const angle = pac && ahead ? (Math.atan2(ahead.y - pac.y, ahead.x - pac.x) * 180) / Math.PI : 0;
  const mouth = reduced ? 20 : 10 + Math.abs(Math.sin(tick * 0.6)) * 30;

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-40"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <filter id="glowAmber" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="pacGlow">
          <stop offset="0%" stopColor="oklch(0.85 0.18 75)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.85 0.18 75)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      <path
        d={d}
        fill="none"
        stroke="oklch(0.32 0.04 260)"
        strokeWidth={1}
        strokeDasharray="2 6"
        opacity={0.4}
      />
      {Array.from({ length: dotCount }).map((_, i) => {
        const dist = (pathLen / dotCount) * (i + 0.5);
        const pt = pathRef.current?.getPointAtLength(dist);
        if (!pt) return null;
        const eaten = dist < pacAt - 14;
        const isPower = i % Math.floor(dotCount / 4) === 0;
        return (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={isPower ? 4 : 2.2}
            fill="oklch(0.80 0.16 75)"
            filter="url(#glowAmber)"
            opacity={eaten ? 0 : isPower ? 0.95 : 0.75}
            style={{ transition: "opacity 280ms ease" }}
          />
        );
      })}
      {pac && (
        <g transform={`translate(${pac.x} ${pac.y}) rotate(${angle})`}>
          <circle r={20} fill="url(#pacGlow)" />
          <path
            d={`M 0 0 L ${10 * Math.cos((mouth * Math.PI) / 180)} ${-10 * Math.sin((mouth * Math.PI) / 180)} A 10 10 0 1 0 ${10 * Math.cos((mouth * Math.PI) / 180)} ${10 * Math.sin((mouth * Math.PI) / 180)} Z`}
            fill="oklch(0.85 0.18 75)"
            filter="url(#glowAmber)"
          />
          <circle cx={3} cy={-5} r={1.4} fill="#0b0e17" />
        </g>
      )}
    </svg>
  );
}