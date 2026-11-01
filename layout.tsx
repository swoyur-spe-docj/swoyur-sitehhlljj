import type { ReactNode } from 'react';
import './globals.css';
import { getSettings } from '@/lib/repo';
import { isThemeKey, THEMES, themeCss } from '@/lib/themes';
import { headers } from 'next/headers';
import { environmentIssues } from '@/lib/env';
import { SetupRequired } from '@/components/SetupRequired';
import { ScrollMotion } from '@/components/ScrollMotion';

export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const issues = environmentIssues();
  const s = issues.length ? null : await getSettings();
  const theme = s && isThemeKey(s.theme) ? s.theme : 'corporate_blue';
  const nonce = (await headers()).get('x-nonce') || undefined;
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <title>The Padmaarc Advertising — Creative that moves business</title>
        <meta name="description" content="Independent advertising and creative studio in Sitamarhi, Bihar. Brand strategy, video, design, social media and performance marketing." />
        <meta name="theme-color" content={THEMES[theme as keyof typeof THEMES].bg} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeCss(theme) }} />
      </head>
      <body>{issues.length ? <SetupRequired issues={issues} /> : <><ScrollMotion />{children}</>}</body>
    </html>
  );
}
