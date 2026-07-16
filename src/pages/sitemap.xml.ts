// Static sitemap endpoint: Astro renders this once at build time into
// dist/sitemap.xml, served at https://flexr.dev/sitemap.xml. Generating it
// from the same JSON dataset that drives getStaticPaths() means the sitemap
// can never list a page that doesn't exist (or miss one that does).
import type { APIRoute } from 'astro';
import layouts from '../data/seoLayouts.json';

const SITE = 'https://flexr.dev';

// Standalone landing pages that live as their own .astro files rather than
// as dictionary entries (e.g. the dedicated Grid-reverse guide). Listed here
// so they are still discoverable in the sitemap.
const STANDALONE_PAGES = ['tailwind-reverse-grid-layout'];

export const GET: APIRoute = () => {
  const locs = [
    `${SITE}/`,
    ...layouts.map((entry) => `${SITE}/${entry.slug}`),
    ...STANDALONE_PAGES.map((s) => `${SITE}/${s}`),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...locs.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
