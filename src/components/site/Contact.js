'use client';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHead, ease, resumeFilename } from './ui';

export default function Contact({ settings }) {
  const email = settings.email?.trim();
  const resume = settings.resume?.trim();
  const linkedin = settings.linkedin?.trim();
  const github = settings.github?.trim();

  return (
    <section id="contact" data-testid="contact-section" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead label="CONTACT" title="OPEN CHANNEL" color="text-volt" testid="contact-heading" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-slate-300 md:text-lg">
              Prefer a direct line? Drop a note or grab the résumé — both routes land in the same inbox that reads datasheets for fun.
            </p>
            {(settings.availability || settings.location) && (
              <dl className="mt-10 space-y-5 font-mono text-[11px] uppercase tracking-[0.2em]">
                {settings.availability && (
                  <div>
                    <dt className="text-slate-500">Availability</dt>
                    <dd data-testid="contact-availability" className="mt-2 text-slate-100">{settings.availability}</dd>
                  </div>
                )}
                {settings.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 text-cyan" />
                    <div>
                      <dt className="text-slate-500">Base</dt>
                      <dd data-testid="contact-location" className="mt-2 text-slate-100">{settings.location}</dd>
                    </div>
                  </div>
                )}
              </dl>
            )}
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {email && (
              <Reveal delay={0.05}>
                <a
                  href={`mailto:${email}`}
                  data-testid="contact-email-link"
                  className="cut2 group flex h-full flex-col justify-between border border-line bg-panel p-6 transition-colors duration-300 hover:border-cyan hover:bg-cyan/5"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center border border-line text-cyan transition-colors group-hover:border-cyan">
                      <Mail className="h-4 w-4" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                  </span>
                  <span className="mt-10">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Email</span>
                    <span className="mt-2 block break-all font-mono text-sm text-slate-100">{email}</span>
                  </span>
                </a>
              </Reveal>
            )}

            {resume ? (
              <Reveal delay={0.1}>
                <a
                  href={resume}
                  download={resumeFilename(settings.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-resume-link"
                  className="cut2 group flex h-full flex-col justify-between border border-line bg-panel p-6 transition-colors duration-300 hover:border-volt hover:bg-volt/5"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center border border-line text-volt transition-colors group-hover:border-volt">
                      <Download className="h-4 w-4" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-volt" />
                  </span>
                  <span className="mt-10">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Résumé</span>
                    <span className="mt-2 block font-mono text-sm text-slate-100">Download PDF</span>
                  </span>
                </a>
              </Reveal>
            ) : (
              <Reveal delay={0.1}>
                <div
                  data-testid="contact-resume-unavailable"
                  className="cut2 flex h-full flex-col justify-between border border-dashed border-line bg-panel/40 p-6"
                >
                  <span className="grid h-10 w-10 place-items-center border border-line text-slate-500">
                    <Download className="h-4 w-4" />
                  </span>
                  <span className="mt-10">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">Résumé</span>
                    <span className="mt-2 block font-mono text-sm text-slate-400">Set Resume URL in Site Settings</span>
                  </span>
                </div>
              </Reveal>
            )}

            {(linkedin || github) && (
              <Reveal delay={0.15} className="sm:col-span-2">
                <div className="flex flex-wrap gap-3">
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-linkedin-link"
                      className="cut2 group inline-flex items-center gap-3 border border-line bg-panel px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-200 transition-colors hover:border-cyan hover:text-cyan"
                    >
                      <Linkedin className="h-4 w-4" /> LinkedIn
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-github-link"
                      className="cut2 group inline-flex items-center gap-3 border border-line bg-panel px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-200 transition-colors hover:border-cyan hover:text-cyan"
                    >
                      <Github className="h-4 w-4" /> GitHub
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="mt-14 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500"
        >
          Channel status · {email ? 'email online' : 'email unset'} · {resume ? 'resume armed' : 'resume unset'}
        </motion.div>
      </div>
    </section>
  );
}
