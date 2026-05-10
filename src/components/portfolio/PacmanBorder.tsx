import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion, useScrollProgress, useViewportSize } from "@/hooks/useScrollProgress";

// Scaled per-viewport for arcade consistency
function metrics(w: number, h: number) {
  const small = Math.min(w, h);
  const scale = Math.max(0.7, Math.min(1.4, small / 900));
  return {
    inset: Math.round(26 * scale),
    radius: Math.round(22 * scale),
    spacing: Math.round(38 * scale),
    dotR: 2.4 * scale,
    powerR: 4.8 * scale,
    pacR: 11 * scale,
    glowR: 22 * scale,
  };
}

export function PacmanBorder() {
  const { w, h } = useViewportSize();
  const progress = useScrollProgress();
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [tick, setTick] = useState(0);
  const m = metrics(w, h);

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
    const x = m.inset, y = m.inset, W = w - m.inset * 2, H = h - m.inset * 2, r = m.radius;
    return `M ${x + r} ${y} H ${x + W - r} A ${r} ${r} 0 0 1 ${x + W} ${y + r} V ${y + H - r} A ${r} ${r} 0 0 1 ${x + W - r} ${y + H} H ${x + r} A ${r} ${r} 0 0 1 ${x} ${y + H - r} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y}`;
  }, [w, h, m.inset, m.radius]);

  useEffect(() => {
    if (pathRef.current && d) setPathLen(pathRef.current.getTotalLength());
  }, [d]);

  if (!d) return null;

  const dotCount = Math.max(24, Math.floor(pathLen / m.spacing));
  const pacAt = pathLen * progress;
  const pac = pathRef.current?.getPointAtLength(pacAt);
  const ahead = pathRef.current?.getPointAtLength(Math.min(pathLen, pacAt + 1));
  const angle = pac && ahead ? (Math.atan2(ahead.y - pac.y, ahead.x - pac.x) * 180) / Math.PI : 0;
  const mouth = reduced ? 18 : 8 + Math.abs(Math.sin(tick * 0.55)) * 34;

  // 4 evenly-spaced corner power pellets, regardless of dotCount parity
  const powerIdx = new Set([0, 1, 2, 3].map((k) => Math.floor((dotCount * k) / 4)));

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-40"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <filter id="glowAmber" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.6" result="b1" />
          <feGaussianBlur stdDeviation="4" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowPower" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="3.5" result="b1" />
          <feGaussianBlur stdDeviation="8" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="pacGlow">
          <stop offset="0%" stopColor="oklch(0.85 0.18 75)" stopOpacity="0.6" />
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
        const eaten = dist < pacAt - m.pacR;
        const isPower = powerIdx.has(i);
        return (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={isPower ? m.powerR : m.dotR}
            fill={isPower ? "oklch(0.88 0.16 75)" : "oklch(0.82 0.15 75)"}
            filter={isPower ? "url(#glowPower)" : "url(#glowAmber)"}
            className={!eaten && !reduced ? (isPower ? "pellet-power" : "pellet-dot") : ""}
            opacity={eaten ? 0 : 1}
            style={{ transition: "opacity 320ms ease" }}
          />
        );
      })}
      {pac && (
        <g transform={`translate(${pac.x} ${pac.y}) rotate(${angle})`}>
          <circle r={m.glowR} fill="url(#pacGlow)" />
          <path
            d={`M 0 0 L ${m.pacR * Math.cos((mouth * Math.PI) / 180)} ${-m.pacR * Math.sin((mouth * Math.PI) / 180)} A ${m.pacR} ${m.pacR} 0 1 0 ${m.pacR * Math.cos((mouth * Math.PI) / 180)} ${m.pacR * Math.sin((mouth * Math.PI) / 180)} Z`}
            fill="oklch(0.85 0.18 75)"
            filter="url(#glowAmber)"
          />
          <circle cx={m.pacR * 0.3} cy={-m.pacR * 0.5} r={m.pacR * 0.14} fill="#0b0e17" />
        </g>
      )}
    </svg>
  );
}