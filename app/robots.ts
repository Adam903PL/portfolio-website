import { SITE_URL } from '@/lib/seo';
import type { MetadataRoute } from 'next';

const searchAndRetrievalBots = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
];

const trainingBots = [
  'GPTBot',
  'Google-Extended',
  'CCBot',
  'ClaudeBot',
  'anthropic-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
      ...searchAndRetrievalBots.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/api/',
      })),
      ...trainingBots.map((userAgent) => ({
        userAgent,
        disallow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
