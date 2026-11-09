import { createClient } from '@sanity/client';
import { LexoRank } from 'lexorank';
import { readFileSync } from 'node:fs';

const readEnv = (p) => Object.fromEntries(readFileSync(p, 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')]));
const env = readEnv(new URL('../.env', import.meta.url));
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, token: env.SANITY_API_TOKEN, apiVersion: '2024-10-01', useCdn: false });

// Gives drag-and-drop ranks to documents that don't have one yet, keeping the current order.
for (const type of ['skillGroup', 'project', 'experience', 'education']) {
  const docs = await client.fetch(`*[_type == $type && !(_id in path("drafts.**"))] | order(orderRank asc, order asc, _createdAt asc){_id, orderRank}`, { type });
  const ranked = docs.filter((d) => d.orderRank).map((d) => d.orderRank).sort();
  let rank = ranked.length ? LexoRank.parse(ranked[ranked.length - 1]) : LexoRank.min();
  const tx = client.transaction();
  let n = 0;
  for (const d of docs) {
    if (d.orderRank) continue;
    rank = rank.genNext().genNext();
    tx.patch(d._id, (p) => p.set({ orderRank: rank.toString() }));
    n += 1;
  }
  if (n) await tx.commit();
  console.log(`${type}: ranked ${n}`);
}
