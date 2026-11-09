'use client';
import { Cpu, Layers, Radio, Activity, Zap, Code2, Brain, Microchip } from 'lucide-react';
import { Reveal, SectionHead } from './ui';

const ICONS = { cpu: Cpu, layers: Layers, radio: Radio, activity: Activity, zap: Zap, code: Code2, brain: Brain, chip: Microchip };
const ACCENT = {
  cyan: { text: 'text-cyan', border: 'border-cyan', hover: 'hover:bg-cyan/70', tag: 'border-l-cyan' },
  volt: { text: 'text-volt', border: 'border-volt', hover: 'hover:bg-volt/70', tag: 'border-l-volt' },
  mint: { text: 'text-mint', border: 'border-mint', hover: 'hover:bg-mint/70', tag: 'border-l-mint' },
  amber: { text: 'text-amber', border: 'border-amber', hover: 'hover:bg-amber/70', tag: 'border-l-amber' },
};
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];

function Card({ g, i, total }) {
  const a = ACCENT[g.accent] || ACCENT.cyan;
  const Icon = ICONS[g.icon] || Cpu;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={(i % 2) * 0.12} className={`${i === total - 1 && i % 2 === 0 ? 'lg:col-span-12' : SPANS[i % 4]} h-full`}>
      <div data-testid={`skill-card-${i}`} className={`cut frame group h-full ${a.hover}`} style={{ '--c': '22px' }}>
        <div onMouseMove={onMove} className="cut relative flex h-full flex-col bg-panel p-7 md:p-10" style={{ '--c': '22px' }}>
          <div className="spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex items-start justify-between">
            <span className={`grid h-12 w-12 place-items-center border ${a.border} ${a.text} transition-transform duration-500 group-hover:rotate-[8deg]`}><Icon className="h-5 w-5" /></span>
          </div>
          <h3 className="relative mt-8 font-display text-lg uppercase leading-snug text-slate-50 md:text-xl">{g.title}</h3>
          <p className="relative mt-3 max-w-xl text-[15px] leading-relaxed text-slate-400">{g.description}</p>
          <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
            {(g.tags || []).map((t, j) => (
              <span key={t} className={`border border-line border-l-2 ${a.tag} bg-ink/60 px-3 py-1.5 font-mono text-[11px] text-slate-200 transition-transform duration-300 group-hover:-translate-y-0.5`} style={{ transitionDelay: `${j * 25}ms` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Skills({ skills }) {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-24 md:py-36">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead label="CAPABILITIES" title="Technical Arsenal" testid="skills-heading" />
        <div className="grid auto-rows-fr gap-5 lg:grid-cols-12 lg:gap-6">
          {skills.map((g, i) => <Card key={g.title} g={g} i={i} total={skills.length} />)}
        </div>
      </div>
    </section>
  );
}
