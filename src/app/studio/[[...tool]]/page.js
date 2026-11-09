import Studio from './Studio';

export const dynamic = 'force-static';
export { metadata, viewport } from 'next-sanity/studio';

const TYPES = ['siteSettings', 'about', 'skillGroup', 'project', 'experience', 'education'];

export function generateStaticParams() {
  return [{ tool: [] }, { tool: ['welcome'] }, { tool: ['structure'] }, ...TYPES.map((t) => ({ tool: ['structure', t] }))];
}

export default function StudioPage() {
  return <Studio />;
}
