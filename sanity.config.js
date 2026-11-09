import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './src/sanity/schemas';
import { LogoMark } from './src/components/site/Logo';
import { welcomeTool } from './src/sanity/WelcomeTool';

const theme = buildLegacyTheme({
  '--black': '#06080D',
  '--white': '#F8FAFC',
  '--gray': '#8B98AB',
  '--gray-base': '#8B98AB',
  '--component-bg': '#0E1522',
  '--component-text-color': '#E2E8F0',
  '--brand-primary': '#22D3EE',
  '--default-button-color': '#8B98AB',
  '--default-button-primary-color': '#22D3EE',
  '--default-button-success-color': '#34D399',
  '--default-button-warning-color': '#FBBF24',
  '--default-button-danger-color': '#F2662B',
  '--state-info-color': '#22D3EE',
  '--state-success-color': '#34D399',
  '--state-warning-color': '#FBBF24',
  '--state-danger-color': '#F2662B',
  '--main-navigation-color': '#06080D',
  '--main-navigation-color--inverted': '#F8FAFC',
  '--focus-color': '#22D3EE',
});

const StudioIcon = () => <LogoMark className="h-full w-full" />;

const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings / Home' },
  { id: 'about', title: 'About' },
];
const singletonIds = new Set(SINGLETONS.map((s) => s.id));
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

const ORDERABLE = [
  { type: 'skillGroup', title: 'Technical Arsenal (drag to reorder)' },
  { type: 'project', title: 'Projects (drag to reorder)' },
  { type: 'experience', title: 'Experience (drag to reorder)' },
  { type: 'education', title: 'Education (drag to reorder)' },
];
const orderableIds = new Set(ORDERABLE.map((o) => o.type));

const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id).title(title))
      ),
      S.divider(),
      ...ORDERABLE.map(({ type, title }) => orderableDocumentListDeskItem({ type, title, S, context })),
      ...S.documentTypeListItems().filter((item) => !singletonIds.has(item.getId()) && !orderableIds.has(item.getId())),
    ]);

export default defineConfig({
  name: 'default',
  title: 'Steven Tran — Portfolio',
  icon: StudioIcon,
  theme,
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'missing',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure })],
  tools: (prev) => [welcomeTool, ...prev],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonIds.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonIds.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input,
    newDocumentOptions: (prev) => prev.filter((item) => !singletonIds.has(item.templateId)),
  },
});
