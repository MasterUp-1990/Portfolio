'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowDownRight, ArrowDown, Download, Mail } from 'lucide-react';
import { useScrollTo, ease, resumeFilename } from './ui';
import Chip from './Chip';
import Scope from './Scope';
import PcbBackdrop from './PcbBackdrop';

function Uptime() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const p = (n) => String(n).padStart(2, '0');
  return <>{`${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`}</>;
}

export default function Hero({ settings }) {
  const scrollTo = useScrollTo();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yChip = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const lines = settings.heroLines?.length ? settings.heroLines : ['FIRMWARE'];

  return (
    <section id="home" ref={ref} onMouseMove={onMove} data-testid="hero-section" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <PcbBackdrop />
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-cyan/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
        <motion.div style={{ y: yText }} className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan">
            <span className="h-2 w-2 rotate-45 bg-volt" />
            <span data-testid="hero-role-label">Embedded &amp; IoT Engineer</span>
          </motion.div>

          <h1 data-testid="hero-title" className="mt-7 font-display text-[2.15rem] uppercase leading-[1.02] text-slate-50 sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            {lines.map((l, i) => (
              <span key={l + i} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${i === 0 ? 'neon-white' : i === lines.length - 1 ? 'neon-text' : ''} ${i === 1 ? 'outline-text' : ''}`}
                  initial={{ y: '110%', rotate: 2 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.5 + i * 0.14, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease }} className="mt-8 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            <span className="font-mono text-sm text-volt">// {settings.kicker}</span>
            <br />
            {settings.heroIntro}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8, ease }} className="mt-10 flex flex-wrap gap-4">
            <button data-testid="hero-explore-projects-btn" onClick={() => scrollTo('projects')} className="cut2 group flex items-center gap-3 bg-cyan px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-slate-50">
              Explore projects <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </button>
            <button data-testid="hero-terminal-btn" onClick={() => scrollTo('about')} className="cut2 group flex items-center gap-3 bg-[#FF5A00] px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-[#ff7a2e]">
              Query the system <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </motion.div>

          {(settings.email || settings.resume) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8, ease }} className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em]">
              {settings.email && (
                <a data-testid="hero-contact-email" href={`mailto:${settings.email}`} className="group inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan">
                  <Mail className="h-3.5 w-3.5 text-cyan" /> Contact · {settings.email}
                </a>
              )}
              {settings.resume && (
                <a
                  data-testid="hero-download-resume"
                  href={settings.resume}
                  download={resumeFilename(settings.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-volt"
                >
                  <Download className="h-3.5 w-3.5 text-volt" /> Download résumé
                </a>
              )}
            </motion.div>
          )}

          <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="mt-14 grid max-w-xl grid-cols-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            {[['Core', 'Cortex-M7'], ['RTOS', 'Zephyr 3.6'], ['Uptime', <Uptime key="u" />]].map(([k, v]) => (
              <div key={k}>
                <dt className="text-slate-500">{k}</dt>
                <dd data-testid={`hero-readout-${k.toLowerCase()}`} className="mt-2 text-slate-100">{v}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div style={{ y: yChip }} className="lg:col-span-5" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.6, ease }}>
          <div style={{ perspective: 1200 }}>
            <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative mx-auto max-w-[480px]">
              <Chip />
              <div style={{ transform: 'translateZ(60px)' }} className="absolute -bottom-10 -left-4 w-[62%] md:-left-10">
                <Scope />
              </div>
              <div style={{ transform: 'translateZ(80px)' }} className="cut2 absolute -right-2 top-6 border border-volt/60 bg-ink/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-volt backdrop-blur md:-right-6">
                VDD 3.31V · 480MHz
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
