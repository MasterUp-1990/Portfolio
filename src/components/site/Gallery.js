'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Cpu } from 'lucide-react';
import Lightbox from './Lightbox';

const DELAY = 4500;

export default function Gallery({ images, captions = [], title, y, idx }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const n = images.length;
  const running = n > 1 && inView && !paused && !open;

  useEffect(() => {
    if (!running) return undefined;
    const t = setTimeout(() => setI((v) => (v + 1) % n), DELAY);
    return () => clearTimeout(t);
  }, [running, i, n]);

  const go = (d) => setI((v) => (v + d + n) % n);

  if (!n) {
    return (
      <div className="grid-bg absolute inset-0 grid place-items-center bg-panel2" data-testid={`project-gallery-${idx}-empty`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="grid h-16 w-16 place-items-center border border-cyan/40 text-cyan"><Cpu className="h-7 w-7" /></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">Photos coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="absolute inset-0" data-testid={`project-gallery-${idx}`}>
      <motion.div style={{ y, scale: 1.22 }} className="absolute inset-0 cursor-zoom-in" onClick={() => setOpen(true)} data-testid={`project-gallery-${idx}-open`}>
        <AnimatePresence initial={false}>
          <motion.img
            key={images[i]}
            src={images[i]}
            alt={`${title} — image ${i + 1}`}
            data-testid={`project-gallery-${idx}-image`}
            initial={{ opacity: 0, scale: 1.12, clipPath: 'inset(0 0 0 100%)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], opacity: { duration: 0.6 } }}
            className="absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 group-hover:saturate-150"
          />
        </AnimatePresence>
      </motion.div>
      <div className="pointer-events-none absolute left-12 right-5 top-4 z-10">
        <AnimatePresence initial={false}>
          {captions[i] && (
            <motion.p
              key={`cap-${i}`}
              data-testid={`project-gallery-${idx}-caption`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto absolute left-0 top-0 max-w-full border-l-2 border-cyan bg-ink/75 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ink backdrop-blur"
            >
              {captions[i]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">
        {n > 1 && (
          <div className="flex gap-1.5">
            {images.map((src, k) => (
              <button key={src} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} data-testid={`project-gallery-${idx}-dot-${k}`} className="relative h-1 w-8 overflow-hidden bg-slate-50/20">
                {k === i && (
                  <motion.span
                    key={`${i}-${running}`}
                    className="absolute inset-y-0 left-0 bg-cyan"
                    initial={{ width: running ? '0%' : '100%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: running ? DELAY / 1000 : 0, ease: 'linear' }}
                  />
                )}
                {k < i && <span className="absolute inset-0 bg-cyan/50" />}
              </button>
            ))}
          </div>
        )}
        {n > 1 && [[-1, ChevronLeft, 'prev'], [1, ChevronRight, 'next']].map(([d, Icon, name]) => (
            <button key={name} onClick={() => go(d)} aria-label={`${name} image`} data-testid={`project-gallery-${idx}-${name}`} className="grid h-8 w-8 place-items-center border border-slate-50/20 bg-ink/60 text-ink backdrop-blur transition-colors duration-300 hover:border-cyan hover:text-cyan">
              <Icon className="h-4 w-4" />
            </button>
          ))}
        <button onClick={() => setOpen(true)} aria-label="View full screen" data-testid={`project-gallery-${idx}-fullscreen`} className="grid h-8 w-8 place-items-center border border-slate-50/20 bg-ink/60 text-ink backdrop-blur transition-colors duration-300 hover:border-volt hover:text-volt">
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      <Lightbox open={open} images={images} captions={captions} title={title} start={i} onClose={() => setOpen(false)} idx={idx} />
    </div>
  );
}
