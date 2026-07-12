import { blogPosts } from '@/lib/blog-posts';

export type Command = {
  id: string;
  label: string;
  hint: string;
  hidden?: boolean;
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
      action: { type: 'navigate', href: '/' },
    },
    {
      id: 'projects',
      label: 'Projects',
      hint: 'Page',
      action: { type: 'navigate', href: '/projects' },
    },
    {
      id: 'blog',
      label: 'Blog',
      hint: 'Page',
      action: { type: 'navigate', href: '/blog' },
    },
    {
      id: 'education',
      label: 'Education',
      hint: 'Page',
      action: { type: 'navigate', href: '/education' },
    },
    {
      id: 'contact',
      label: 'Contact',
      hint: 'Page',
      action: { type: 'navigate', href: '/contact' },
    },
    ...blogPosts.map((post) => ({
      id: `post-${post.id}`,
      label: post.title,
      hint: 'Blog post',
      action: { type: 'navigate' as const, href: post.canonicalPath },
    })),
    {
      id: 'copy-email',
      label: 'Copy email',
      hint: 'Action',
      action: { type: 'copy', text: 'pukaluk.adam505@gmail.com' },
    },
    {
      id: 'call',
      label: 'Call me',
      hint: 'Action',
      action: { type: 'open', href: 'tel:+48695031104' },
    },
    {
      id: 'github',
      label: 'Open GitHub',
      hint: 'Action',
      action: { type: 'open', href: 'https://github.com/Adam903PL/' },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      hint: 'Action',
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
      action: { type: 'event', name: 'chaos' },
    },
    {
      id: 'age',
      label: 'age',
      hint: '???',
      hidden: true,
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
