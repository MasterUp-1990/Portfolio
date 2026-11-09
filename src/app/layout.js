import { Krona_One, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { getContent } from '@/lib/getContent';
import './globals.css';

const display = Krona_One({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export async function generateMetadata() {
  const { settings } = await getContent();
  const title = settings.seoTitle || `${settings.name} — ${settings.role}`;
  const description = settings.seoDescription || settings.heroIntro;
  return { title, description };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
