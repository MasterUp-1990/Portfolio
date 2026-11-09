import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { fallback } from '../src/lib/fallback.js';

const readEnv = (p) => Object.fromEntries(readFileSync(p, 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')]));
const env = readEnv(new URL('../.env', import.meta.url));
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, token: env.SANITY_API_TOKEN, apiVersion: '2024-10-01', useCdn: false });

// Adds demo captions only where a caption is missing; never overwrites Studio edits.
const docs = await client.fetch('*[_type == "project" && !(_id in path("drafts.**"))]{_id, order, images[]{_key, caption}}');
let n = 0;
for (const d of docs) {
  const caps = fallback.projects[d.order]?.captions || [];
  const missing = (d.images || []).map((im, k) => [im, caps[k]]).filter(([im, c]) => !im.caption && c);
  if (!missing.length) continue;
  const patch = client.patch(d._id);
  missing.forEach(([im, c]) => patch.set({ [`images[_key=="${im._key}"].caption`]: c }));
  await patch.commit();
  n += missing.length;
}
console.log(`Added ${n} captions`);
