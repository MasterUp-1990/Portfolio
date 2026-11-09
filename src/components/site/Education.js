'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Reveal, SectionHead, ease } from './ui';

function Entry({ e, i }) {
  return (
    <div data-testid={`education-item-${i}`} className="relative pb-16 pl-12 md:pl-20">
      <motion.span
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease }}
        className="absolute left-[7px] top-1 h-5 w-5 border-2 border-cyan bg-paper md:left-[23px]"
      />
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">{e.period}</p>
        <h3 className="mt-3 font-display text-lg uppercase leading-snug text-ink md:text-2xl">{e.degree}</h3>
        <p className="mt-2 font-mono text-xs text-slate-400">{e.institution} <span className="text-slate-600">//</span> {e.location}</p>
        <ul className="mt-6 space-y-3">
          {(e.bullets || []).map((b) => (
            <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-slate-600"><span className="font-mono text-volt">+</span>{b}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {(e.tags || []).map((t) => (
            <span key={t} className="border border-line bg-panel px-3 py-1.5 font-mono text-[11px] text-slate-600 transition-colors duration-300 hover:border-mint hover:text-mint">{t}</span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

export default function Education({ education }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  if (!education?.length) return null;
  return (
    <section id="education" data-testid="education-section" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <SectionHead label="FOUNDATIONS" title="Academic Credentials" color="text-cyan" testid="education-heading" />
        <div ref={ref} className="relative">
          <span className="absolute bottom-0 left-[16px] top-2 w-px bg-line md:left-[32px]" />
          <motion.span style={{ scaleY }} className="absolute bottom-0 left-[16px] top-2 w-px origin-top bg-gradient-to-b from-cyan via-mint to-volt md:left-[32px]" />
          {education.map((e, i) => <Entry key={e.degree + e.period} e={e} i={i} />)}
        </div>
      </div>
    </section>
  );
}
