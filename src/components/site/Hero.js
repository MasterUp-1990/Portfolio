'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowDownRight, ArrowDown, Download, Mail } from 'lucide-react';
import { useScrollTo, ease, resumeFilename } from './ui';
import PcbBackdrop from './PcbBackdrop';

export default function Hero({ settings }) {
  const scrollTo = useScrollTo();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [35, 65]), { stiffness: 50, damping: 22 });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [30, 55]), { stiffness: 50, damping: 22 });
  const glowLeft = useTransform(glowX, (v) => `${v}%`);
  const glowTop = useTransform(glowY, (v) => `${v}%`);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const lines = settings.heroLines?.length ? settings.heroLines : ['FIRMWARE'];
  const caption = settings.heroCaption || 'FIG.00 — BOARD UNDER TEST';

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      data-testid="hero-section"
      className="relative min-h-[100svh] overflow-hidden pb-12 pt-24 md:pb-14 md:pt-28"
    >
      {/* Single unified light-theme background */}
      <div className="pointer-events-none absolute inset-0 bg-paper" />
      <PcbBackdrop />
      <motion.div
        className="pointer-events-none absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/15 blur-[140px]"
        style={{ left: glowLeft, top: glowTop }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
        className="pointer-events-none absolute bottom-8 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50 md:bottom-10 md:right-10"
      >
        {caption}
      </motion.div>

      <div className="relative mx-auto flex min-h-[calc(100svh-6.5rem)] max-w-[1400px] items-center px-5 md:px-10">
        <motion.div style={{ y: yText }} className="relative z-10 w-full max-w-2xl py-6 lg:max-w-[54%]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease }}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-cyan"
          >
            <motion.span
              className="h-2 w-2 rotate-45 bg-volt"
              animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span data-testid="hero-role-label">{settings.role || 'Firmware Engineer'}</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.8, ease }}
            data-testid="hero-brand"
            className="mt-5 font-display text-[2.4rem] uppercase leading-[0.95] tracking-tight text-ink sm:text-5xl lg:text-6xl xl:text-[5.1rem]"
          >
            {settings.name || 'Steven Tran'}
          </motion.p>

          <h1 data-testid="hero-title" className="mt-4 font-display text-[1.25rem] uppercase leading-[1.05] text-ink/80 sm:text-2xl lg:text-3xl">
            {lines.map((l, i) => (
              <span key={l + i} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === lines.length - 1 ? 'neon-text' : ''} ${i === 1 ? 'outline-text' : ''}`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.95, delay: 0.45 + i * 0.12, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.75, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg"
          >
            {settings.heroIntro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.75, ease }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              data-testid="hero-explore-projects-btn"
              onClick={() => scrollTo('projects')}
              className="cut2 group flex items-center gap-3 bg-cyan px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_-12px_rgba(8,145,178,0.65)] transition-colors duration-300 hover:bg-ink"
            >
              Explore projects <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
            </button>
            <button
              data-testid="hero-terminal-btn"
              onClick={() => scrollTo('about')}
              className="cut2 group flex items-center gap-3 border border-line bg-panel/90 px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-ink shadow-sm backdrop-blur transition-colors duration-300 hover:border-volt hover:text-volt"
            >
              Query the system <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </motion.div>

          {(settings.email || settings.resume) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.7, ease }}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em]"
            >
              {settings.email && (
                <a data-testid="hero-contact-email" href={`mailto:${settings.email}`} className="group inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-cyan">
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
                  className="group inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-volt"
                >
                  <Download className="h-3.5 w-3.5 text-volt" /> Download résumé
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
