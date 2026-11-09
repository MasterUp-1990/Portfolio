import { createRequire } from 'node:module';
import path from 'node:path';
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';

const require = createRequire(import.meta.url);
const sanityIcons = path.dirname(require.resolve('@sanity/icons/package.json'));

export default function config(phase) {
  /** @type {import('next').NextConfig} */
  return {
    output: 'export',
    // Static hosting serves the exported site from build/.
    distDir: phase === PHASE_PRODUCTION_BUILD ? 'build' : '.next',
    trailingSlash: true,
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
    webpack: (cfg) => {
      // One shared icon set: the drag-to-reorder plugin otherwise loads an icon version Sanity v4 can't use.
      cfg.resolve.alias = { ...cfg.resolve.alias, '@sanity/icons$': path.join(sanityIcons, 'dist/index.js') };
      return cfg;
    },
  };
}
