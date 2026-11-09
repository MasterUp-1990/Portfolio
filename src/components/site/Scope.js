'use client';
import { useEffect, useRef } from 'react';

export default function Scope() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    let raf;
    let t = 0;
    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== w * dpr) { c.width = w * dpr; c.height = h * dpr; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(34,211,238,0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x <= w; x += w / 8) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y <= h; y += h / 4) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      const wave = (color, fn) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) { const y = h / 2 + fn(x) * h * 0.32; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.shadowColor = color; ctx.shadowBlur = 8; ctx.stroke(); ctx.shadowBlur = 0;
      };
      wave('#22D3EE', (x) => Math.sin((x + t) * 0.045) * 0.8 + Math.sin((x + t) * 0.13) * 0.15);
      wave('#F2662B', (x) => (Math.sin((x + t * 1.6) * 0.03) > 0 ? -0.55 : 0.55));
      t += 1.4;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="cut2 border border-line bg-ink/90 p-3 backdrop-blur-md" data-testid="hero-scope">
      <div className="mb-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
        <span><span className="text-cyan">CH1</span> 1.0V/div · <span className="text-volt">CH2</span> SPI_CLK</span>
        <span className="text-mint">● RUN</span>
      </div>
      <canvas ref={ref} className="block h-24 w-full md:h-28" />
    </div>
  );
}
