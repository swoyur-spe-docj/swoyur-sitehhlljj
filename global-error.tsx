'use client';

import { useEffect, useState } from 'react';
import './globals.css';
import { friendlyError } from '@/lib/errors';
import { isThemeKey, THEMES, themeCss } from '@/lib/themes';
import type { ThemeKey } from '@/lib/types';

const FALLBACK: ThemeKey = 'corporate_blue';

/** The theme chosen in admin is also stored in a cookie, so this page can match it even when the layout failed. */
function savedTheme(): ThemeKey {
  if (typeof document === 'undefined') return FALLBACK;
  const match = document.cookie.match(/(?:^|; )padmaarc_theme=([^;]+)/);
  const value = match ? decodeURIComponent(match[1]) : '';
  return isThemeKey(value) ? value : FALLBACK;
}

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [theme, setTheme] = useState<ThemeKey>(FALLBACK);
  useEffect(() => { setTheme(savedTheme()); }, []);
  const colours = THEMES[theme];
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta name="theme-color" content={colours.bg} />
        <style dangerouslySetInnerHTML={{ __html: themeCss(theme) }} />
      </head>
      <body style={{ background: colours.bg, color: colours.text }}>
        <main className="container section narrow center">
          <p className="eyebrow">TEMPORARY PROBLEM</p>
          <h1>Something went wrong.</h1>
          <p className="muted">{friendlyError(error)} If the problem continues, contact the studio.</p>
          <button className="btn btn-primary" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
