'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { Reveal, SectionHead, Corners } from './ui';
import Terminal from './Terminal';

function Stat({ value, label, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const m = String(value).match(/^([\d.]+)(.*)$/);
    if (!inView || !m) return undefined;
    const dec = (m[1].split('.')[1] || '').length;
    const ctrl = animate(0, parseFloat(m[1]), { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setShown(v.toFixed(dec) + m[2]) });
    return () => ctrl.stop();
  }, [inView, value]);
  return (
    <Reveal delay={i * 0.08}>
      <div ref={ref} className="cut2 frame h-full hover:bg-cyan/40">
        <div className="cut2 flex h-full flex-col items-center justify-center bg-panel px-2 py-6 text-center">
          <span data-testid={`about-stat-value-${i}`} className="font-display text-xl text-cyan md:text-2xl">{shown}</span>
          <span className="mt-2 font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-slate-400">{label}</span>
        </div>
      </div>
    </Reveal>
  );
}

export default function About({ about, settings }) {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const [spot, setSpot] = useState({ x: '50%', y: '50%' });

  return (
    <section id="about" data-testid="about-section" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead label="ABOUT" title={about.heading} testid="about-heading" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <div
                ref={imgRef}
                data-testid="about-image-frame"
                onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSpot({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` }); }}
                className="group relative"
              >
                <div className="cut relative aspect-[16/10] overflow-hidden bg-panel" style={{ '--c': '26px' }}>
                  <motion.img style={{ y, scale: 1.18 }} src={about.image} alt="Engineer at the validation bench" className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(300px circle at ${spot.x} ${spot.y}, rgba(34,211,238,0.18), transparent 70%)` }} />
                  <Corners />
                  <span className="pointer-events-none absolute bottom-5 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan">{about.caption}</span>
                </div>
              </div>
            </Reveal>
            <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-slate-600 md:text-base">
              {(about.paragraphs || []).map((p, i) => (
                <Reveal key={p.slice(0, 20)} delay={i * 0.08}><p data-testid={`about-paragraph-${i}`}>{p}</p></Reveal>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(about.stats || []).map((s, i) => <Stat key={s.label} {...s} i={i} />)}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={0.15}>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">// Interactive — query the system</p>
                <Terminal about={about} settings={settings} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
