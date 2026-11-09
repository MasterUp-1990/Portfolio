import { client } from '@/sanity/client';
import { fallback } from './fallback';

export const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    ...,
    "resume": coalesce(resumeFile.asset->url, resume),
    "heroImage": coalesce(heroImage.asset->url, heroImage)
  },
  "about": *[_type == "about"][0]{_id, _type, heading, caption, paragraphs, stats, toolchain, "image": image.asset->url},
  "skills": *[_type == "skillGroup"] | order(orderRank asc, order asc){title, description, icon, accent, tags},
  "projects": *[_type == "project"] | order(orderRank asc, order asc){_id, _type, title, subtitle, description, tags, pinout, link, featured, "image": image.asset->url, "images": images[].asset->url, "imageKeys": images[]._key, "captions": images[].caption},
  "experience": *[_type == "experience"] | order(orderRank asc, order asc){period, role, company, location, bullets, tags},
  "education": *[_type == "education"] | order(orderRank asc, order asc){period, degree, institution, location, bullets, tags}
}`;

const clean = (obj) =>
  Object.fromEntries(Object.entries(obj || {}).filter(([, v]) => v !== null && v !== '' && !(Array.isArray(v) && !v.length)));

const list = (v, fb) => (Array.isArray(v) && v.length ? v : fb);

export async function getContent() {
  if (!hasSanity) return fallback;
  try {
    const d = await client.fetch(QUERY);
    return {
      settings: { ...fallback.settings, ...clean(d?.settings) },
      about: { ...fallback.about, ...clean(d?.about) },
      skills: list(d?.skills, fallback.skills),
      projects: list(d?.projects, fallback.projects),
      experience: list(d?.experience, fallback.experience),
      education: list(d?.education, fallback.education),
    };
  } catch (e) {
    console.error('Sanity fetch failed, using fallback', e?.message);
    return fallback;
  }
}
