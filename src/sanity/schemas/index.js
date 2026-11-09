import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

const str = (name, title, extra = {}) => ({ name, title, type: 'string', ...extra });
const txt = (name, title) => ({ name, title, type: 'text', rows: 3 });
const strList = (name, title) => ({ name, title, type: 'array', of: [{ type: 'string' }] });
const order = { name: 'order', title: 'Order', type: 'number' };

const siteSettings = {
  name: 'siteSettings', title: 'Site Settings / Home', type: 'document',
  fields: [
    str('seoTitle', 'Page title (browser tab)'), txt('seoDescription', 'Meta description (search & social)'),
    str('name', 'Full name'), str('role', 'Role / title'), str('kicker', 'Hero kicker line'),
    strList('heroLines', 'Hero headline lines'), txt('heroIntro', 'Hero intro'),
    strList('marqueeSkills', 'Skills marquee (right-to-left)'),
    str('location', 'Location'),
    {
      name: 'availability',
      title: 'Availability (OPEN CHANNEL)',
      description: 'Shown under Availability in the Contact / OPEN CHANNEL section (e.g. “Open to select contracts — Q1 2027”).',
      type: 'string',
    },
    str('email', 'Email (mailto contact link)'),
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'github', title: 'GitHub URL', type: 'url' },
    {
      name: 'resumeFile',
      title: 'Resume PDF',
      description: 'Upload a PDF — preferred source for Download résumé across the site.',
      type: 'file',
      options: { accept: '.pdf' },
    },
    {
      name: 'resume',
      title: 'Resume URL (fallback)',
      description: 'Optional direct link if you host the PDF elsewhere (e.g. /resume.pdf). Used when no file is uploaded.',
      type: 'url',
    },
  ],
};

const about = {
  name: 'about', title: 'About', type: 'document',
  fields: [
    str('heading', 'Heading'), { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
    str('caption', 'Photo caption'), { name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text' }] },
    { name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'object', fields: [str('value', 'Value'), str('label', 'Label')] }] },
    strList('toolchain', 'Toolchain (terminal view_specs)'),
  ],
};

const skillGroup = {
  name: 'skillGroup', title: 'Skill Group', type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    str('title', 'Title'), txt('description', 'Description'),
    str('icon', 'Icon', { options: { list: ['cpu', 'chip', 'layers', 'radio', 'activity', 'zap', 'code', 'brain'] } }),
    str('accent', 'Accent', { options: { list: ['cyan', 'volt', 'mint', 'amber'] } }),
    strList('tags', 'Tags'), { ...order, hidden: true }, orderRankField({ type: 'skillGroup' }),
  ],
};

const project = {
  name: 'project', title: 'Project', type: 'document',
  fields: [
    str('title', 'Title'), str('subtitle', 'Subtitle'), txt('description', 'Description'),
    { name: 'image', title: 'Cover image (legacy)', type: 'image', options: { hotspot: true } },
    { name: 'images', title: 'Gallery images (shown one-by-one)', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', title: 'Caption', type: 'string' }] }] },
    strList('tags', 'Tags'),
    { name: 'pinout', title: 'Pinout', type: 'array', of: [{ type: 'object', fields: [str('pin', 'Pin'), str('signal', 'Signal'), str('fn', 'Function')] }] },
    { name: 'link', title: 'Case study URL', type: 'url' }, { ...order, hidden: true }, orderRankField({ type: 'project' }),
    {
      name: 'featured',
      title: 'Featured project',
      description: 'Shows this project larger at the top of the Projects section. Only one project can be featured.',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, { document, getClient }) => {
          if (!value) return true;
          const id = (document?._id || '').replace(/^drafts\./, '');
          const others = await getClient({ apiVersion: '2024-10-01' }).fetch(
            'count(*[_type == "project" && featured == true && !(_id in [$id, $draft])])',
            { id, draft: `drafts.${id}` }
          );
          return others ? 'Another project is already featured — turn it off there first.' : true;
        }),
    },
  ],
  orderings: [orderRankOrdering],
};

const experience = {
  name: 'experience', title: 'Experience', type: 'document',
  orderings: [orderRankOrdering],
  fields: [str('period', 'Period'), str('role', 'Role'), str('company', 'Company'), str('location', 'Location'), strList('bullets', 'Highlights'), strList('tags', 'Tags'), { ...order, hidden: true }, orderRankField({ type: 'experience' })],
};

const education = {
  name: 'education', title: 'Education', type: 'document',
  orderings: [orderRankOrdering],
  fields: [str('period', 'Period'), str('degree', 'Degree / program'), str('institution', 'Institution'), str('location', 'Location'), strList('bullets', 'Highlights'), strList('tags', 'Tags'), { ...order, hidden: true }, orderRankField({ type: 'education' })],
};

export const schemaTypes = [siteSettings, about, skillGroup, project, experience, education];
