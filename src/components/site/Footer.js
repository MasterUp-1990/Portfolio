'use client';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, Download } from 'lucide-react';
import { LogoMark } from './Logo';
import { useScrollTo, ease, resumeFilename } from './ui';

export default function Footer({ settings }) {
  const scrollTo = useScrollTo();
  return (
    <footer data-testid="site-footer" className="relative overflow-hidden border-t border-line pt-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">{settings.role}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {settings.email && (
              <a data-testid="footer-contact-email" href={`mailto:${settings.email}`} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-slate-600 hover:text-cyan">
                <Mail className="h-3.5 w-3.5" /> {settings.email}
              </a>
            )}
            {settings.resume && (
              <a
                data-testid="footer-download-resume"
                href={settings.resume}
                download={resumeFilename(settings.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-slate-600 hover:text-volt"
              >
                <Download className="h-3.5 w-3.5" /> Résumé
              </a>
            )}
            <button data-testid="footer-back-to-top" onClick={() => scrollTo('home')} className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-slate-600 hover:text-cyan">
              Back to top <span className="grid h-9 w-9 place-items-center border border-line transition-colors group-hover:border-cyan"><ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" /></span>
            </button>
          </div>
        </div>
        <motion.div
          initial={{ y: '30%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease }}
          className="mt-12 select-none"
          data-testid="footer-wordmark"
        >
          <svg viewBox="0 0 1000 114" className="block h-auto w-full overflow-visible" role="img" aria-label={settings.name}>
            <text x="0" y="112" textLength="1008" lengthAdjust="spacingAndGlyphs" fontFamily="var(--font-display)" fontSize="136" fill="transparent" stroke="rgba(11,21,36,0.14)" strokeWidth="1" style={{ textTransform: 'uppercase' }}>
              {(settings.name || '').toUpperCase()}
            </text>
          </svg>
        </motion.div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <span>© 2026 {settings.name}</span>
          <span>Built with Next.js · Sanity · Lenis</span>
        </div>
      </div>
    </footer>
  );
}
