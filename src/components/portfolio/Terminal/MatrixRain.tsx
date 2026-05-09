import { useEffect, useRef } from "react";

export function MatrixRain({ intense = false }: { intense?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const fontSize = 14;
    const cols = () => Math.ceil(canvas.getBoundingClientRect().width / fontSize);
    let drops: number[] = Array.from({ length: cols() }, () => Math.random() * -20);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFmauricio";

    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      const interval = intense ? 40 : 70;
      if (t - last > interval) {
        last = t;
        const r = canvas.getBoundingClientRect();
        ctx.fillStyle = "rgba(10, 14, 26, 0.18)";
        ctx.fillRect(0, 0, r.width, r.height);
        ctx.font = `${fontSize}px IBM Plex Mono, monospace`;
        if (drops.length !== cols()) drops = Array.from({ length: cols() }, () => Math.random() * -20);
        for (let i = 0; i < drops.length; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = "oklch(0.78 0.18 145 / 0.8)";
          ctx.fillText(ch, x, y);
          if (y > r.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [intense]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-40" />;
}