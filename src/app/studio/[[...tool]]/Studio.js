'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function Studio() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div data-testid="studio-not-configured" className="grid min-h-screen place-items-center bg-ink p-8 font-mono text-sm text-slate-300">
        <div className="max-w-lg border border-line p-8">
          <p className="text-volt">[ SANITY // NOT CONFIGURED ]</p>
          <p className="mt-4 leading-relaxed">Set NEXT_PUBLIC_SANITY_PROJECT_ID (and NEXT_PUBLIC_SANITY_DATASET) to enable the embedded Studio. The site currently renders built-in demo content.</p>
        </div>
      </div>
    );
  }
  return <NextStudio config={config} scheme="dark" />;
}
