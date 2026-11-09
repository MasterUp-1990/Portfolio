'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LogoMark } from './Logo';
import { useScrollTo, ease } from './ui';

const NAV = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['experience', 'Experience'], ['education', 'Education'], ['contact', 'Contact']];

export default function Header({ settings }) {
  const scrollTo = useScrollTo();
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = NAV[0][0];
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      });
      setActive(atBottom ? NAV[NAV.length - 1][0] : current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const go = (id) => { setOpen(false); scrollTo(id); };
  const [first, ...rest] = (settings.name || '').split(' ');

  return (
    <>
      <motion.header
        data-testid="site-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${scrolled ? 'border-line bg-paper/85 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <button data-testid="header-logo" onClick={() => go('home')} className="group flex items-center gap-3">
            <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-90" />
            <span className="text-left leading-none">
              <span className="block font-display text-[13px] uppercase tracking-wide text-ink">{first}<span className="text-cyan">.</span>{rest.join(' ')}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">Lab-01 // Firmware</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" data-testid="desktop-nav">
            {NAV.map(([id, label]) => (
              <button key={id} data-testid={`nav-link-${id}`} onClick={() => go(id)} className="group relative px-4 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                <span className={`transition-colors duration-300 ${active === id ? 'text-ink' : 'text-slate-400 group-hover:text-ink'}`}>{label}</span>
                {active === id && <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-px h-px bg-cyan shadow-[0_0_12px_#22D3EE]" />}
              </button>
            ))}
          </nav>

          <button data-testid="mobile-menu-toggle" onClick={() => setOpen((o) => !o)} className="grid h-10 w-10 place-items-center border border-line text-slate-700 lg:hidden" aria-label="Menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-gradient-to-r from-volt via-cyan to-mint" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
            className="grid-bg fixed inset-0 z-40 flex flex-col justify-center bg-paper px-6 pt-16 lg:hidden"
          >
            {NAV.map(([id, label], i) => (
              <motion.button
                key={id}
                data-testid={`mobile-nav-link-${id}`}
                onClick={() => go(id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, ease }}
                className="flex items-baseline gap-4 border-b border-line py-4 text-left"
              >
                <span className={`font-display text-2xl uppercase ${active === id ? 'text-cyan' : 'text-ink'}`}>{label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
