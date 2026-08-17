import localFont from 'next/font/local';

/**
 * Self-hosted variable fonts (public/fonts). Self-hosting keeps the build free
 * of any network dependency and avoids a third-party request at runtime.
 *
 * Defined once here and shared by both root layouts — the `(en)` and `(es)`
 * route groups each render their own `<html>`, and importing the same instance
 * guarantees they emit identical font class names and preload links.
 */
export const sans = localFont({
  src: [{ path: '../public/fonts/inter-latin.woff2', weight: '100 900', style: 'normal' }],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
});

export const serif = localFont({
  src: [
    { path: '../public/fonts/source-serif-4.woff2', weight: '200 900', style: 'normal' },
    { path: '../public/fonts/source-serif-4-italic.woff2', weight: '200 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
});

export const fontVars = `${sans.variable} ${serif.variable}`;
