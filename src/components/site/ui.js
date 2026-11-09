'use client';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

export const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ label, title, color = 'text-cyan', testid }) {
  return (
    <div className="mb-14 md:mb-20" data-testid={testid}>
      <Reveal y={12}>
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em]">
          <span className="text-volt">[</span>
          <span className={color}>{label}</span>
          <span className="text-volt">]</span>
          <motion.span
            className="h-px flex-1 origin-left bg-gradient-to-r from-line via-line to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
          />
        </div>
      </Reveal>
      <motion.h2
        className="mt-5 font-display text-[1.9rem] uppercase leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function useScrollTo() {
  const lenis = useLenis();
  return (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };
}

export const Corners = ({ color = 'border-cyan' }) => (
  <>
    <span className={`pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t ${color}`} />
    <span className={`pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t ${color}`} />
    <span className={`pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l ${color}`} />
    <span className={`pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r ${color}`} />
  </>
);

export function resumeFilename(name) {
  const base = (name || 'resume').trim().replace(/\s+/g, '-') || 'resume';
  return `${base}-Resume.pdf`;
}
