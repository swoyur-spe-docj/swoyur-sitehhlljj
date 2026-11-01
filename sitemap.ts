// Publishes the core public routes for search engines.
// Dynamic portfolio entries can be added here when the CMS has real published case studies.
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://padmaarc.com';
  return ['', '/about', '/services', '/packages', '/portfolio', '/blog', '/careers', '/contact'].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
