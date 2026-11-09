'use client';
import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { Toaster } from 'sonner';
import { getContent, hasSanity } from '@/lib/getContent';
import Header from './Header';
import Hero from './Hero';
import Marquee from './Marquee';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Contact from './Contact';
import Footer from './Footer';

export default function Site({ content: initial }) {
  const [content, setContent] = useState(initial);
  useEffect(() => {
    if (!hasSanity) return undefined;
    let alive = true;
    getContent().then((c) => { if (alive && c) setContent(c); });
    return () => { alive = false; };
  }, []);
  const { settings, about, skills, projects, experience, education } = content;
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="grain relative">
        <Header settings={settings} />
        <main>
          <Hero settings={settings} />
          <Marquee items={settings.marqueeSkills} />
          <About about={about} settings={settings} />
          <Skills skills={skills} />
          <Projects projects={projects} />
          <Experience experience={experience} />
          <Education education={education} />
          <Contact settings={settings} />
        </main>
        <Footer settings={settings} />
        <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { fontFamily: 'var(--font-mono)', background: '#0E1522', border: '1px solid #1E2A3D' } }} />
      </div>
    </ReactLenis>
  );
}
