// Allows indexing of public pages while excluding private administration routes.
// Update the canonical domain here if the production host changes.
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/admin/' }, sitemap: 'https://padmaarc.com/sitemap.xml' };
}
