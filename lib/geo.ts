import { blogPosts } from './blog-posts';
import {
  absoluteUrl,
  contactLinks,
  DEFAULT_DESCRIPTION,
  expertiseTopics,
  portfolioProjectItems,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  socialLinks,
} from './seo';

const LAST_UPDATED = '2026-06-04';

type GeoPage = {
  path: string;
  title: string;
  description: string;
  section: 'core' | 'blog' | 'resources';
};

const mainCanonicalGeoPages: GeoPage[] = [
  {
    path: '/',
    title: 'Home',
    description:
      'Portfolio entry point with Adam Pukaluk profile, about section, skills, blog preview and project CTA.',
    section: 'core',
  },
  {
    path: '/projects',
    title: 'Projects',
    description:
      'Selected full-stack, AI, cybersecurity and mobile projects, including PVC and Civil42 / Crisis OS.',
    section: 'core',
  },
  {
    path: '/blog',
    title: 'Blog',
    description:
      'Polish LinkedIn-style posts about Civil42, hackathons, AI tooling, education and developer workflow.',
    section: 'core',
  },
  {
    path: '/education',
    title: 'Education',
    description:
      'Education and learning timeline for Adam Pukaluk, including robotics, creative coding and current technical school path.',
    section: 'core',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Contact signals for collaboration, project work and full-stack development opportunities.',
    section: 'core',
  },
];

const blogPostGeoPages: GeoPage[] = blogPosts.map((post) => ({
  path: post.canonicalPath,
  title: post.title,
  description: post.excerpt,
  section: 'blog',
}));

export const canonicalGeoPages: GeoPage[] = [
  ...mainCanonicalGeoPages,
  ...blogPostGeoPages,
];

export const markdownGeoPages: GeoPage[] = [
  {
    path: '/profile.md',
    title: 'Profile markdown',
    description: 'Machine-readable professional profile for Adam Pukaluk.',
    section: 'resources',
  },
  {
    path: '/projects.md',
    title: 'Projects markdown',
    description: 'Machine-readable project list and repository references.',
    section: 'resources',
  },
  {
    path: '/blog.md',
    title: 'Blog markdown',
    description:
      'Machine-readable archive of the LinkedIn posts shown on the blog page.',
    section: 'resources',
  },
  {
    path: '/education.md',
    title: 'Education markdown',
    description: 'Machine-readable education and learning timeline summary.',
    section: 'resources',
  },
  {
    path: '/contact.md',
    title: 'Contact markdown',
    description:
      'Machine-readable public contact details and collaboration signals.',
    section: 'resources',
  },
  {
    path: '/llms-full.txt',
    title: 'Full AI context snapshot',
    description:
      'Aggregated markdown context for retrieval agents and AI search tools.',
    section: 'resources',
  },
];

export function createMarkdownResponse(markdown: string, init?: ResponseInit) {
  return new Response(markdown, {
    ...init,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      ...init?.headers,
    },
  });
}

const joinMarkdown = (sections: Array<string | false | null | undefined>) =>
  sections.filter(Boolean).join('\n\n');

const bulletLink = (label: string, pathOrUrl: string, description?: string) => {
  const href = pathOrUrl.startsWith('http')
    ? pathOrUrl
    : absoluteUrl(pathOrUrl);
  return `- [${label}](${href})${description ? ` - ${description}` : ''}`;
};

const renderPageList = (pages: GeoPage[]) =>
  pages
    .map((page) => bulletLink(page.title, page.path, page.description))
    .join('\n');

export function buildLlmsTxt() {
  return joinMarkdown([
    `# ${SITE_TITLE}`,
    `> ${DEFAULT_DESCRIPTION}`,
    `Canonical website: ${SITE_URL}`,
    `Last updated: ${LAST_UPDATED}`,
    '## Expertise',
    expertiseTopics.map((topic) => `- ${topic}`).join('\n'),
    '## Core HTML Pages',
    renderPageList(mainCanonicalGeoPages),
    '## Blog Post Pages',
    renderPageList(blogPostGeoPages),
    '## AI Markdown Resources',
    renderPageList(markdownGeoPages),
    '## Markdown Mirrors',
    canonicalGeoPages
      .map((page) => {
        const mirrorPath =
          page.path === '/' ? '/md-mirror/home' : `/md-mirror${page.path}`;
        return bulletLink(`${page.title} mirror`, mirrorPath, page.description);
      })
      .join('\n'),
    '## Contact And Authority Signals',
    [
      bulletLink('GitHub', socialLinks.github),
      bulletLink('LinkedIn', socialLinks.linkedin),
      bulletLink('X / Twitter', socialLinks.twitter),
      bulletLink('Contact page', '/contact'),
    ].join('\n'),
    'Markdown resources are crawlable but carry X-Robots-Tag: noindex, follow so they do not compete with canonical HTML pages.',
  ]);
}

export function buildProfileMarkdown() {
  return joinMarkdown([
    `# ${SITE_NAME}`,
    `${SITE_NAME} is a full-stack developer from Poland building modern web applications, AI tooling, automation workflows, cybersecurity-oriented developer systems and mobile apps. This portfolio is the canonical public profile for projects, technical skills, education, blog posts and collaboration contact details.`,
    `Canonical URL: ${SITE_URL}`,
    `Last updated: ${LAST_UPDATED}`,
    '## Expertise',
    expertiseTopics.map((topic) => `- ${topic}`).join('\n'),
    '## Primary Focus',
    [
      '- Full-stack web development with Next.js, React, TypeScript and backend APIs.',
      '- AI tooling and automation workflows for developer productivity.',
      '- Cybersecurity-adjacent systems such as AI session audit, local proxy/firewall flows and incident command tooling.',
      '- Mobile development with React Native and Expo.',
    ].join('\n'),
    '## Technology Stack',
    [
      '- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion.',
      '- Backend: Node.js, Python, FastAPI, Prisma, PostgreSQL, MongoDB.',
      '- AI and automation: Codex workflows, Claude Code, Lovable, n8n, agent tooling, AI-assisted development.',
      '- Security and operations: local proxy/firewall concepts, AI session audit, cybersecurity learning, Linux/Kali Linux context.',
      '- Mobile: React Native, Expo and cross-platform app delivery.',
    ].join('\n'),
    '## Flagship Projects',
    portfolioProjectItems
      .slice(0, 3)
      .map((project) => `- ${project.name}: ${project.description}`)
      .join('\n'),
    '## Key Links',
    [
      bulletLink('Projects', '/projects'),
      bulletLink('Blog', '/blog'),
      bulletLink('Education', '/education'),
      bulletLink('Contact', '/contact'),
      bulletLink('GitHub', socialLinks.github),
      bulletLink('LinkedIn', socialLinks.linkedin),
      bulletLink('X / Twitter', socialLinks.twitter),
    ].join('\n'),
    '## Public Contact Signals',
    [
      `- Email: ${contactLinks.email}`,
      `- Phone: ${contactLinks.phone}`,
      `- Contact URL: ${absoluteUrl('/contact')}`,
    ].join('\n'),
  ]);
}

export function buildProjectsMarkdown() {
  const projectSections = portfolioProjectItems.map((project) =>
    joinMarkdown([
      `## ${project.name}`,
      project.description,
      `Portfolio URL: ${absoluteUrl('/projects')}`,
      `Technologies: ${project.technologies.join(', ')}`,
      'Repositories and references:',
      project.sameAs.map((url) => `- ${url}`).join('\n'),
    ]),
  );

  return joinMarkdown([
    '# Projects By Adam Pukaluk',
    'Selected full-stack, AI, cybersecurity and mobile projects from the portfolio. The canonical human-readable page is /projects.',
    `Canonical URL: ${absoluteUrl('/projects')}`,
    `Last updated: ${LAST_UPDATED}`,
    ...projectSections,
  ]);
}

export function buildBlogMarkdown() {
  const postSections = blogPosts.map((post) =>
    joinMarkdown([
      `## ${post.title}`,
      `Canonical URL: ${absoluteUrl(post.canonicalPath)}`,
      `Source: ${post.source}`,
      `Original LinkedIn URL: ${post.linkedInUrl}`,
      `Tags: ${post.tags.map((tag) => `#${tag}`).join(', ')}`,
      `Image: ${absoluteUrl(post.image)}`,
      `Image alt: ${post.imageAlt}`,
      '### Summary',
      post.excerpt,
      '### Full post text',
      post.content.join('\n\n'),
    ]),
  );

  return joinMarkdown([
    '# Blog And LinkedIn Posts',
    'A machine-readable archive of the Polish LinkedIn-style posts shown on the portfolio blog page.',
    `Canonical URL: ${absoluteUrl('/blog')}`,
    `Last updated: ${LAST_UPDATED}`,
    ...postSections,
  ]);
}

export function buildBlogPostMarkdown(slug: string) {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  return joinMarkdown([
    `# ${post.title}`,
    `Canonical URL: ${absoluteUrl(post.canonicalPath)}`,
    `Last updated: ${post.lastModified}`,
    `Source: ${post.source}`,
    `Original LinkedIn URL: ${post.linkedInUrl}`,
    `Tags: ${post.tags.map((tag) => `#${tag}`).join(', ')}`,
    `Image: ${absoluteUrl(post.image)}`,
    `Image alt: ${post.imageAlt}`,
    '## Summary',
    post.excerpt,
    '## Full post text',
    post.content.join('\n\n'),
  ]);
}

export function buildEducationMarkdown() {
  return joinMarkdown([
    '# Education And Learning Path',
    'Education is represented as safe learning phases rather than over-specific early school date ranges. The canonical human-readable page is /education.',
    `Canonical URL: ${absoluteUrl('/education')}`,
    `Last updated: ${LAST_UPDATED}`,
    '## Learning Phases',
    [
      '- Foundation: early technical curiosity, school learning and general programming foundations.',
      '- Robotics Start: first practical robotics and problem-solving experiences around 2021.',
      '- Creative Coding: experiments with creative programming, interface ideas and web work around 2022.',
      '- Python And 3D: deeper scripting, Python and technical exploration around 2023.',
      '- Current Program: ongoing technical school path focused on programming, full-stack development, automation and cybersecurity context.',
    ].join('\n'),
  ]);
}

export function buildContactMarkdown() {
  return joinMarkdown([
    '# Contact Adam Pukaluk',
    'Public collaboration and contact signals for full-stack development, AI tooling, automation and project work.',
    `Canonical URL: ${absoluteUrl('/contact')}`,
    `Last updated: ${LAST_UPDATED}`,
    '## Contact',
    [
      `- Email: ${contactLinks.email}`,
      `- Mailto: ${contactLinks.emailUrl}`,
      `- Phone: ${contactLinks.phone}`,
      bulletLink('Contact form', '/contact'),
    ].join('\n'),
    '## Social Profiles',
    [
      bulletLink('GitHub', socialLinks.github),
      bulletLink('LinkedIn', socialLinks.linkedin),
      bulletLink('X / Twitter', socialLinks.twitter),
    ].join('\n'),
  ]);
}

export function buildLlmsFullTxt() {
  return joinMarkdown([
    '# Adam Pukaluk Portfolio - Full AI Context',
    'This is a curated markdown snapshot for AI search, retrieval agents and citation tools. Canonical HTML pages remain the primary public pages for users and search engines.',
    `Canonical website: ${SITE_URL}`,
    `Last updated: ${LAST_UPDATED}`,
    buildProfileMarkdown(),
    buildProjectsMarkdown(),
    buildBlogMarkdown(),
    buildEducationMarkdown(),
    buildContactMarkdown(),
    '## Crawler Policy',
    'Search and retrieval crawlers are allowed by robots.txt. API routes are blocked. Known training crawlers are blocked according to the site policy set in robots.txt.',
  ]);
}

export function normalizeMirrorPath(pathSegments?: string[]) {
  const joinedPath = (pathSegments ?? []).join('/').replace(/\/+$/, '');

  if (!joinedPath || joinedPath === 'home' || joinedPath === 'index') {
    return '/';
  }

  const withoutExtension = joinedPath.replace(/\.md$/, '');
  return `/${withoutExtension.replace(/^\/+/, '')}`;
}

export function getMarkdownForPath(pathname: string) {
  const blogPostMatch = pathname.match(/^\/blog\/([^/]+)$/);

  if (blogPostMatch) {
    return buildBlogPostMarkdown(blogPostMatch[1]);
  }

  switch (pathname) {
    case '/':
    case '/home':
    case '/profile':
    case '/profile.md':
      return buildProfileMarkdown();
    case '/projects':
    case '/projects.md':
      return buildProjectsMarkdown();
    case '/blog':
    case '/blog.md':
      return buildBlogMarkdown();
    case '/education':
    case '/education.md':
      return buildEducationMarkdown();
    case '/contact':
    case '/contact.md':
      return buildContactMarkdown();
    case '/llms.txt':
      return buildLlmsTxt();
    case '/llms-full.txt':
      return buildLlmsFullTxt();
    default:
      return null;
  }
}
