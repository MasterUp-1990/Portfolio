'use client';
import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import { Reveal, SectionHead, ease } from './ui';
import Gallery from './Gallery';

function Project({ p, i, featured = false, flip = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const multi = !!p.images?.length;
  const images = (multi ? p.images : [p.image]).filter(Boolean);

  return (
    <Reveal>
      <article ref={ref} data-testid={featured ? 'project-featured' : `project-card-${i}`} className={`cut frame group relative ${featured ? 'hover:bg-volt/60' : 'hover:bg-cyan/50'}`} style={{ '--c': '28px' }}>
        <div className={`cut grid bg-panel ${featured ? '' : 'lg:grid-cols-[1.15fr_1fr]'}`} style={{ '--c': '28px' }}>
          <div className={`relative overflow-hidden ${featured ? 'min-h-[300px] sm:min-h-[440px] lg:min-h-[600px]' : `min-h-[260px] sm:min-h-[340px] lg:min-h-[460px] ${flip ? 'lg:order-2' : ''}`}`}>
            <Gallery images={images} captions={multi ? p.captions || [] : []} title={p.title} y={y} idx={i} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/70 via-ink/10 to-transparent" />
            <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cyan" />
            <span className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cyan" />
            {featured && (
              <span data-testid="project-featured-badge" className="cut2 absolute right-5 top-5 z-10 hidden items-center gap-2 bg-volt px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink sm:flex">
                <Star className="h-3.5 w-3.5 fill-ink" /> Featured
              </span>
            )}
          </div>
          <div className={featured ? 'grid gap-8 p-7 md:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16' : 'flex flex-col justify-center p-7 md:p-12'}>
            <div>
            {featured && (
              <span className="cut2 mb-5 inline-flex items-center gap-2 bg-volt px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-ink sm:hidden">
                <Star className="h-3 w-3 fill-ink" /> Featured
              </span>
            )}
            <h3 className={`font-display uppercase leading-snug text-ink ${featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{p.title}</h3>
            <p className="mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-volt">{p.subtitle}</p>
            </div>
            <div className="flex flex-col">
            <p className={`text-[15px] leading-relaxed text-slate-600 ${featured ? 'md:text-base' : 'mt-6'}`}>{p.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(p.tags || []).map((t) => (
                <span key={t} className="border border-cyan/40 bg-cyan/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan">{t}</span>
              ))}
            </div>
            {!!p.pinout?.length && (
              <button data-testid={`project-pinout-toggle-${i}`} onClick={() => setOpen((o) => !o)} className="mt-8 flex items-center gap-3 self-start font-mono text-[11px] uppercase tracking-[0.25em] text-slate-700 transition-colors hover:text-cyan">
                <span className="grid h-6 w-6 place-items-center border border-line"><ChevronDown className={`h-3.5 w-3.5 transition-transform duration-500 ${open ? 'rotate-180' : ''}`} /></span>
                {open ? 'Hide pinout' : 'View pinout'}
              </button>
            )}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div data-testid={`project-pinout-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                  <table className="mt-5 w-full font-mono text-[11px]">
                    <tbody>
                      {p.pinout.map((r, k) => (
                        <motion.tr key={r.pin + k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.05 }} className="border-b border-line">
                          <td className="py-2 pr-3 text-amber">{r.pin}</td>
                          <td className="py-2 pr-3 text-cyan">{r.signal}</td>
                          <td className="py-2 text-slate-400">{r.fn}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
            {p.link ? (
              <a data-testid={`project-case-study-${i}`} href={p.link} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-cyan">
                Case study <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span data-testid={`project-case-study-${i}`} className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">Case study — under NDA</span>
            )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects({ projects }) {
  const fIdx = projects.findIndex((p) => p.featured === true);
  const featured = fIdx >= 0 ? projects[fIdx] : null;
  const rest = projects.filter((_, k) => k !== fIdx);
  const off = featured ? 1 : 0;
  return (
    <section id="projects" data-testid="projects-section" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead label="SELECTED WORK" title="Engineering Projects" color="text-volt" testid="projects-heading" />
        <div className="space-y-10 md:space-y-14">
          {featured && <Project key={featured.title} p={featured} i={0} featured />}
          {rest.map((p, k) => <Project key={p.title} p={p} i={k + off} flip={k % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}
