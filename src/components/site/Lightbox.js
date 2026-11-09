'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

export default function Lightbox({ open, images, captions = [], title, start = 0, onClose, idx }) {
  const [i, setI] = useState(start);
  const [dir, setDir] = useState(1);
  const lenis = useLenis();
  const n = images.length;
  const go = (d) => { setDir(d); setI((v) => (v + d + n) % n); };

  useEffect(() => { if (open) setI(start); }, [open, start]);

  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); lenis?.start(); document.body.style.overflow = ''; };
  }, [open, lenis, n]); // eslint-disable-line react-hooks/exhaustive-deps

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid={`lightbox-${idx}`}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-10" onClick={(e) => e.stopPropagation()}>
            <p className="truncate font-display text-sm uppercase text-slate-50 md:text-base">{title}</p>
            <button data-testid="lightbox-close" onClick={onClose} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center border border-line text-slate-200 transition-colors hover:border-volt hover:text-volt">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence initial={false} custom={dir}>
              <motion.img
                key={images[i]}
                src={images[i]}
                alt={`${title} — photo ${i + 1}`}
                data-testid="lightbox-image"
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.6, ease }}
                drag={n > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
                className="absolute inset-0 m-auto max-h-full max-w-full cursor-grab object-contain p-4 active:cursor-grabbing md:p-10"
              />
            </AnimatePresence>
            {n > 1 && [[-1, ChevronLeft, 'prev', 'left-3 md:left-8'], [1, ChevronRight, 'next', 'right-3 md:right-8']].map(([d, Icon, name, pos]) => (
              <button key={name} data-testid={`lightbox-${name}`} onClick={() => go(d)} aria-label={`${name} photo`} className={`absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center border border-line bg-ink/70 text-slate-100 backdrop-blur transition-colors hover:border-cyan hover:text-cyan ${pos}`}>
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-line px-5 py-5 md:px-10" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={`c-${i}`}
                data-testid="lightbox-caption"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="min-h-[1.25rem] text-center font-mono text-xs uppercase tracking-[0.18em] text-slate-200"
              >
                {captions[i] || ''}
              </motion.p>
            </AnimatePresence>
            {n > 1 && (
              <div className="flex gap-2">
                {images.map((src, k) => (
                  <button key={src} data-testid={`lightbox-thumb-${k}`} onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-label={`Show photo ${k + 1}`} className={`h-12 w-16 overflow-hidden border transition-all duration-300 md:h-14 md:w-20 ${k === i ? 'border-cyan opacity-100' : 'border-line opacity-50 hover:opacity-90'}`}>
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
