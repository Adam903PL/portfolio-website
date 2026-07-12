import { blogPosts } from '@/lib/blog-posts';

export type CommandPreview =
  | {
      type: 'post';
      image: string;
      imageAlt: string;
      kicker: string;
      excerpt: string;
    }
  | { type: 'page'; path: string; description: string }
  | { type: 'action'; detail: string };

export type Command = {
  id: string;
  label: string;
  hint: string;
  hidden?: boolean;
  preview: CommandPreview;
  action:
    | { type: 'navigate'; href: string }
    | { type: 'copy'; text: string }
    | { type: 'open'; href: string }
    | { type: 'event'; name: string };
};

export function getCommands(): Command[] {
  return [
    {
      id: 'home',
      label: 'Home',
      hint: 'Page',
      preview: {
        type: 'page',
        path: '/',
        description:
          'Hero, stack, about and latest writing - the whole story on one page.',
      },
      action: { type: 'navigate', href: '/' },
    },
    {
      id: 'projects',
      label: 'Projects',
      hint: 'Page',
      preview: {
        type: 'page',
        path: '/projects',
        description:
          'Things I have shipped & broken - 15+ projects across web, mobile and AI.',
      },
      action: { type: 'navigate', href: '/projects' },
    },
    {
      id: 'blog',
      label: 'Blog',
      hint: 'Page',
      preview: {
        type: 'page',
        path: '/blog',
        description:
          'Writing & happenings - events, hackathons and talks from LinkedIn.',
      },
      action: { type: 'navigate', href: '/blog' },
    },
    {
      id: 'education',
      label: 'Education',
      hint: 'Page',
      preview: {
        type: 'page',
        path: '/education',
        description:
          'From LEGO logic to full-stack product work - the learning path.',
      },
      action: { type: 'navigate', href: '/education' },
    },
    {
      id: 'contact',
      label: 'Contact',
      hint: 'Page',
      preview: {
        type: 'page',
        path: '/contact',
        description:
          'Email, phone, socials and a form that lands straight in my inbox.',
      },
      action: { type: 'navigate', href: '/contact' },
    },
    ...blogPosts.map((post) => ({
      id: `post-${post.id}`,
      label: post.title,
      hint: 'Blog post',
      preview: {
        type: 'post' as const,
        image: post.image,
        imageAlt: post.imageAlt,
        kicker: post.kicker,
        excerpt: post.excerpt,
      },
      action: { type: 'navigate' as const, href: post.canonicalPath },
    })),
    {
      id: 'copy-email',
      label: 'Copy email',
      hint: 'Action',
      preview: {
        type: 'action',
        detail: 'Copies pukaluk.adam505@gmail.com to your clipboard.',
      },
      action: { type: 'copy', text: 'pukaluk.adam505@gmail.com' },
    },
    {
      id: 'call',
      label: 'Call me',
      hint: 'Action',
      preview: {
        type: 'action',
        detail: 'Opens your phone app with +48 695 031 104.',
      },
      action: { type: 'open', href: 'tel:+48695031104' },
    },
    {
      id: 'github',
      label: 'Open GitHub',
      hint: 'Action',
      preview: {
        type: 'action',
        detail: 'Opens github.com/Adam903PL in a new tab.',
      },
      action: { type: 'open', href: 'https://github.com/Adam903PL/' },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      hint: 'Action',
      preview: {
        type: 'action',
        detail: 'Opens my LinkedIn profile in a new tab.',
      },
      action: {
        type: 'open',
        href: 'https://www.linkedin.com/in/adam-pukaluk-339058298/',
      },
    },
    {
      id: 'chaos',
      label: 'chaos',
      hint: '???',
      hidden: true,
      preview: { type: 'action', detail: '???' },
      action: { type: 'event', name: 'chaos' },
    },
    {
      id: 'age',
      label: 'age',
      hint: '???',
      hidden: true,
      preview: { type: 'action', detail: '???' },
      action: { type: 'event', name: 'toggle-age' },
    },
  ];
}

/** Case-insensitive subsequence match: every query char appears in order in the target. */
export function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let ti = 0;
  for (const ch of q) {
    ti = t.indexOf(ch, ti);
    if (ti === -1) return false;
    ti += 1;
  }
  return true;
}

/** Hidden commands only match when the query equals their label exactly. */
export function filterCommands(commands: Command[], query: string): Command[] {
  const q = query.trim();
  if (!q) return commands.filter((c) => !c.hidden);
  return commands.filter((c) =>
    c.hidden ? c.label === q.toLowerCase() : fuzzyMatch(q, c.label),
  );
}
