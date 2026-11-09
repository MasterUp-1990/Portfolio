import { createClient } from '@sanity/client';
import { readFileSync, createReadStream } from 'node:fs';
import { fallback } from '../src/lib/fallback.js';

const readEnv = (p) => Object.fromEntries(
  readFileSync(p, 'utf8').split('\n').filter((l) => l.includes('=')).map((l) => {
    const i = l.indexOf('=');
    return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
  })
);
const env = readEnv(new URL('../.env', import.meta.url));
const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, SANITY_API_TOKEN: token } = env;
if (!projectId || !dataset || !token) throw new Error('Missing Sanity project ID, dataset or token');

const client = createClient({ projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false });
const PUBLIC = new URL('../public', import.meta.url).pathname;
const cache = {};

async function img(path) {
  if (!cache[path]) {
    const asset = await client.assets.upload('image', createReadStream(PUBLIC + path), { filename: path.split('/').pop() });
    cache[path] = asset._id;
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: cache[path] } };
}
const keyed = (arr, p) => (arr || []).map((o, i) => ({ _key: `${p}${i}`, ...o }));

const { settings, about, skills, projects, experience, education } = fallback;
// Relative /resume.pdf is fine for Next.js public/, but Sanity url fields need absolute URLs.
const { resume: _resume, heroImage, ...settingsForSanity } = settings;
const docs = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...settingsForSanity,
    ...(heroImage ? { heroImage: await img(heroImage) } : {}),
  },
  {
    _id: 'about', _type: 'about', heading: about.heading, caption: about.caption, paragraphs: about.paragraphs,
    stats: keyed(about.stats, 's'), toolchain: about.toolchain, image: await img(about.image),
  },
  ...skills.map((s, i) => ({ _id: `skill-${i}`, _type: 'skillGroup', order: i, ...s })),
  ...(await Promise.all(projects.map(async (p, i) => {
    const { image, images, captions, pinout, ...rest } = p;
    const gallery = [];
    for (const [k, src] of images.entries()) gallery.push({ _key: `g${k}`, ...(await img(src)), caption: captions?.[k] });
    return { _id: `project-${i}`, _type: 'project', order: i, ...rest, link: rest.link || undefined, pinout: keyed(pinout, 'p'), image: await img(image), images: gallery };
  }))),
  ...experience.map((e, i) => ({ _id: `experience-${i}`, _type: 'experience', order: i, ...e })),
  ...education.map((e, i) => ({ _id: `education-${i}`, _type: 'education', order: i, ...e })),
];

const keepIds = new Set(docs.map((d) => d._id));
const existing = await client.fetch(`*[_type in $types]{_id, _type}`, {
  types: ['skillGroup', 'project', 'experience', 'education'],
});
const orphans = existing.filter((d) => !keepIds.has(d._id));

const tx = client.transaction();
docs.forEach((d) => tx.createOrReplace(Object.fromEntries(Object.entries(d).filter(([, v]) => v !== undefined && v !== ''))));
orphans.forEach((d) => tx.delete(d._id));
await tx.commit();
console.log(`Seeded ${docs.length} documents into ${projectId}/${dataset}${orphans.length ? ` (removed ${orphans.length} stale)` : ''}`);
