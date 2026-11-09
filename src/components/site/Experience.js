'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal, SectionHead, ease } from './ui';

function Role({ r, i }) {
  return (
    <div data-testid={`experience-item-${i}`} className="relative pb-16 pl-12 md:pl-20">
      <motion.span
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease }}
        className="absolute left-[7px] top-1 h-5 w-5 border-2 border-volt bg-ink md:left-[23px]"
      />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-volt">{r.period}</p>
        <h3 className="mt-3 font-display text-lg uppercase leading-snug text-slate-50 md:text-2xl">{r.role}</h3>
        <p className="mt-2 font-mono text-xs text-slate-400">{r.company} <span className="text-slate-600">//</span> {r.location}</p>
        <ul className="mt-6 space-y-3">
          {(r.bullets || []).map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-slate-300"><span className="font-mono text-mint">+</span>{b}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {(r.tags || []).map((t) => (
            <span key={t} className="border border-line bg-panel px-3 py-1.5 font-mono text-[11px] text-slate-200 transition-colors duration-300 hover:border-cyan hover:text-cyan">{t}</span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function Experience({ experience }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  return (
    <section id="experience" data-testid="experience-section" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <SectionHead label="TRAJECTORY" title="Field Service Record" color="text-mint" testid="experience-heading" />
        <div ref={ref} className="relative">
          <span className="absolute bottom-0 left-[16px] top-2 w-px bg-line md:left-[32px]" />
          <motion.span style={{ scaleY }} className="absolute bottom-0 left-[16px] top-2 w-px origin-top bg-gradient-to-b from-volt via-cyan to-mint md:left-[32px]" />
          {experience.map((r, i) => <Role key={r.role + r.period} r={r} i={i} />)}
        </div>
      </div>
    </section>
  );
}
