import { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { useRouter } from 'sanity/router';
import { Box, Card, Flex, Grid, Heading, Stack, Text, Button, Badge } from '@sanity/ui';
import { HomeIcon, UserIcon, BoltIcon, ProjectsIcon, ClockIcon, BookIcon, LaunchIcon, DashboardIcon } from '@sanity/icons';

const SECTIONS = [
  { type: 'siteSettings', title: 'Site Settings / Home', desc: 'Name, headline, intro, availability, skills marquee and links', icon: HomeIcon, path: '/studio/structure/siteSettings', single: true },
  { type: 'about', title: 'About', desc: 'Photo, story paragraphs, stats and toolchain', icon: UserIcon, path: '/studio/structure/about', single: true },
  { type: 'skillGroup', title: 'Technical Arsenal', desc: 'Skill cards with icons, accents and tags', icon: BoltIcon, path: '/studio/structure/skillGroup' },
  { type: 'project', title: 'Projects', desc: 'Project cards, photo galleries, captions and pinouts', icon: ProjectsIcon, path: '/studio/structure/project' },
  { type: 'experience', title: 'Experience', desc: 'Roles, highlights and tech tags on the timeline', icon: ClockIcon, path: '/studio/structure/experience' },
  { type: 'education', title: 'Education', desc: 'Degrees, institutions and academic highlights', icon: BookIcon, path: '/studio/structure/education' },
];

const QUERY = `{${SECTIONS.map((s) => `"${s.type}": {"count": count(*[_type == "${s.type}" && !(_id in path("drafts.**"))]), "drafts": count(*[_type == "${s.type}" && _id in path("drafts.**")]), "updated": *[_type == "${s.type}"] | order(_updatedAt desc)[0]._updatedAt}`).join(',')}}`;

const fmt = (d) => (d ? new Date(d).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—');

function SectionCard({ s, stats, go }) {
  const Icon = s.icon;
  return (
    <Card padding={4} radius={2} shadow={1} tone="default" style={{ borderTop: '2px solid #22D3EE' }}>
      <Stack space={4}>
        <Flex align="center" gap={3}>
          <Text size={3}><Icon /></Text>
          <Heading size={1}>{s.title}</Heading>
        </Flex>
        <Text size={1} muted>{s.desc}</Text>
        <Flex gap={2} wrap="wrap">
          {!s.single && <Badge tone="primary">{stats?.count ?? 0} published</Badge>}
          {!!stats?.drafts && <Badge tone="caution">{stats.drafts} unpublished change{stats.drafts > 1 ? 's' : ''}</Badge>}
        </Flex>
        <Text size={0} muted>Last updated: {fmt(stats?.updated)}</Text>
        <Button text={s.single ? 'Edit' : 'Open list'} tone="primary" mode="ghost" onClick={() => go(s.path)} />
      </Stack>
    </Card>
  );
}

function Welcome() {
  const client = useClient({ apiVersion: '2024-10-01' });
  const router = useRouter();
  const [stats, setStats] = useState({});
  const go = (path) => router.navigateUrl({ path });

  useEffect(() => {
    let alive = true;
    client.fetch(QUERY).then((r) => { if (alive) setStats(r || {}); }).catch(() => {});
    return () => { alive = false; };
  }, [client]);

  return (
    <Box padding={[4, 5, 6]} style={{ maxWidth: 1200, margin: '0 auto' }}>
      <Stack space={5}>
        <Card padding={5} radius={2} tone="transparent" style={{ border: '1px solid #1E2A3D', background: 'linear-gradient(120deg, #0E1522, #06080D)' }}>
          <Stack space={4}>
            <Text size={1} style={{ color: '#F2662B', letterSpacing: '0.25em', fontFamily: 'monospace' }}>[ CONTROL PANEL ]</Text>
            <Heading size={4}>Welcome back. Your portfolio is online.</Heading>
            <Text muted>Pick a section to edit. Published changes appear on the live site within a few seconds of reloading it.</Text>
            <Flex gap={3} wrap="wrap">
              <Button as="a" href="/" target="_blank" rel="noreferrer" icon={LaunchIcon} text="View live site" tone="primary" />
            </Flex>
          </Stack>
        </Card>
        <Grid columns={[1, 2, 3]} gap={4}>
          {SECTIONS.map((s) => <SectionCard key={s.type} s={s} stats={stats[s.type]} go={go} />)}
        </Grid>
      </Stack>
    </Box>
  );
}

export const welcomeTool = { name: 'welcome', title: 'Welcome', icon: DashboardIcon, component: Welcome };
