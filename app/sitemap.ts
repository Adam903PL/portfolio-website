import { SITE_URL, siteRoutes } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return siteRoutes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified,
  }));
}
