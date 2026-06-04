import { blogPosts, type BlogPost } from './blog-posts';
import type { Metadata } from 'next';

export const SITE_URL = 'https://www.adampukaluk.pl';
export const SITE_NAME = 'Adam Pukaluk';
export const SITE_TITLE = 'Adam Pukaluk Portfolio';
export const DEFAULT_DESCRIPTION =
  'Official portfolio of Adam Pukaluk, a full-stack developer building modern web apps, AI tooling, automation and mobile projects.';
export const OG_IMAGE_PATH = '/opengraph-image';

export const socialLinks = {
  github: 'https://github.com/Adam903PL/',
  linkedin: 'https://www.linkedin.com/in/adam-pukaluk-339058298/',
  twitter: 'https://x.com/adam_p903',
};

export const contactLinks = {
  email: 'pukaluk.adam505@gmail.com',
  emailUrl: 'mailto:pukaluk.adam505@gmail.com',
  phone: '+48695031104',
};

export const expertiseTopics = [
  'Full-stack development',
  'Next.js',
  'React',
  'TypeScript',
  'AI applications',
  'Amazon EC2',
  'Amazon S3',
  'AWS cloud',
  'Automation',
  'Claude Code',
  'Google Antigravity',
  'Cybersecurity',
  'Google Cloud',
  'Mobile development',
  'OpenAI Codex',
] as const;

type SiteRoute = {
  path: string;
  lastModified: string;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
};

const staticSiteRoutes: SiteRoute[] = [
  {
    path: '/',
    lastModified: '2026-06-04',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/projects',
    lastModified: '2026-06-04',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/blog',
    lastModified: '2026-06-04',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    path: '/education',
    lastModified: '2026-06-04',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    path: '/contact',
    lastModified: '2026-06-04',
    changeFrequency: 'monthly',
    priority: 0.5,
  },
];

export const siteRoutes: SiteRoute[] = [
  ...staticSiteRoutes,
  ...blogPosts.map((post) => ({
    path: post.canonicalPath,
    lastModified: post.lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })),
];

export const absoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();

export const createPageMetadata = ({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}): Metadata => ({
  title,
  description,
  alternates: {
    canonical: path,
  },
  openGraph: {
    title: title === SITE_NAME ? SITE_TITLE : `${title} | ${SITE_NAME}`,
    description,
    url: absoluteUrl(path),
    siteName: SITE_TITLE,
    type,
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'Adam Pukaluk full-stack developer portfolio preview.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title === SITE_NAME ? SITE_TITLE : `${title} | ${SITE_NAME}`,
    description,
    images: [OG_IMAGE_PATH],
  },
});

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: absoluteUrl('/img/gy19rvVD.jpg'),
      jobTitle: 'Full-Stack Developer',
      description: DEFAULT_DESCRIPTION,
      email: contactLinks.email,
      telephone: contactLinks.phone,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'PL',
        addressRegion: 'Lublin',
      },
      sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
      knowsAbout: [
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'AWS',
        'Amazon S3',
        'Amazon EC2',
        'Google Cloud',
        'AI automation',
        'Claude Code',
        'Google Antigravity',
        'OpenAI Codex',
        'Cybersecurity',
        'Mobile development',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_TITLE,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: 'en',
    },
  ],
};

export const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile-page`,
  url: SITE_URL,
  name: 'Adam Pukaluk - Full-Stack Developer Portfolio',
  description: DEFAULT_DESCRIPTION,
  inLanguage: 'en',
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
  },
};

export const createBreadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const portfolioProjectItems = [
  {
    name: 'Prompt Version Control',
    description:
      'Multi-repo AI security and audit ecosystem with dashboard, CLI, proxy, Telegram alerts and remote machine management.',
    sameAs: [
      'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Frontend',
      'https://github.com/promptversioncontrol-org/Prompt-Version-Control-CLI',
      'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Proxy',
      'https://github.com/promptversioncontrol-org/Prompt-Version-Control-Telegram-Bot',
      'https://github.com/promptversioncontrol-org/PVC-RMM',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Python',
      'Prisma',
      'Better Auth',
      'FastAPI',
      'mitmproxy',
    ],
  },
  {
    name: 'Civil42 / Crisis OS',
    description:
      'Incident command cockpit connecting a frontend dashboard, LangGraph agent orchestration and phone-based AI data collection.',
    sameAs: [
      'https://github.com/TS-Unit-8200/frontend',
      'https://github.com/TS-Unit-8200/agenty',
      'https://github.com/TS-Unit-8200/ai-backend',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Payload CMS',
      'FastAPI',
      'LangGraph',
      'Twilio',
      'ElevenLabs',
    ],
  },
  {
    name: 'Codex Mobile',
    description:
      'Mobile project connected to the Codex workflow and developer tooling ecosystem.',
    sameAs: ['https://github.com/Adam903PL/codex-mobile'],
    technologies: ['React Native', 'Expo', 'Mobile development'],
  },
  {
    name: 'TaxMaster',
    description:
      'AI-powered web app for navigating tax laws and financial recommendations.',
    sameAs: [
      'https://github.com/Adam903PL/TaxMaster-Frontend',
      'https://github.com/Adam903PL/TaxMaster-Backend',
    ],
    technologies: ['Next.js', 'FastAPI', 'AI'],
  },
  {
    name: 'FlashTalkAI',
    description: 'AI-powered language learning platform.',
    sameAs: ['https://github.com/Adam903PL/FlashTalkAI'],
    technologies: ['React', 'Tailwind CSS', 'Express.js', 'PostgreSQL'],
  },
  {
    name: 'PackSmart',
    description:
      'Web app for sending and receiving parcels through smart lockers.',
    sameAs: [
      'https://github.com/technischools-lublin/projekt-i-grupa-a-2024-2025-adampukaluk_marcelikarman',
    ],
    technologies: ['Next.js', 'Django'],
  },
];

export const projectsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/projects#collection`,
  url: absoluteUrl('/projects'),
  name: 'Projects by Adam Pukaluk',
  description:
    'Selected full-stack, AI, cybersecurity and mobile projects by Adam Pukaluk.',
  inLanguage: 'en',
  author: {
    '@id': `${SITE_URL}/#person`,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: portfolioProjectItems.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.description,
        url: absoluteUrl('/projects'),
        sameAs: project.sameAs,
        creator: {
          '@id': `${SITE_URL}/#person`,
        },
        keywords: project.technologies.join(', '),
      },
    })),
  },
};

export const createBlogJsonLd = (posts: BlogPost[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  url: absoluteUrl('/blog'),
  name: 'LinkedIn Posts by Adam Pukaluk',
  description:
    'Blog-style archive of Adam Pukaluk LinkedIn posts about hackathons, AI tooling, education and software development.',
  inLanguage: ['pl', 'en'],
  author: {
    '@id': `${SITE_URL}/#person`,
  },
  blogPost: posts.map((post) => ({
    '@type': 'SocialMediaPosting',
    '@id': `${SITE_URL}${post.canonicalPath}#post`,
    headline: post.title,
    name: post.title,
    description: post.excerpt,
    articleBody: post.content.join('\n\n'),
    image: absoluteUrl(post.image),
    url: absoluteUrl(post.canonicalPath),
    sameAs: post.linkedInUrl,
    dateModified: post.lastModified,
    inLanguage: 'pl',
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    keywords: post.tags.join(', '),
  })),
});

export const createBlogPostJsonLd = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': ['BlogPosting', 'SocialMediaPosting'],
  '@id': `${SITE_URL}${post.canonicalPath}#post`,
  headline: post.title,
  name: post.title,
  description: post.excerpt,
  articleBody: post.content.join('\n\n'),
  image: absoluteUrl(post.image),
  url: absoluteUrl(post.canonicalPath),
  sameAs: post.linkedInUrl,
  dateModified: post.lastModified,
  inLanguage: 'pl',
  author: {
    '@id': `${SITE_URL}/#person`,
  },
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': absoluteUrl(post.canonicalPath),
  },
  keywords: post.tags.join(', '),
});

export const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#contact`,
  url: absoluteUrl('/contact'),
  name: 'Contact Adam Pukaluk',
  description:
    'Contact page for full-stack development, automation and collaboration opportunities with Adam Pukaluk.',
  inLanguage: 'en',
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
  },
};
