import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

const markdownLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

const renderInlineLinks = (text: string) => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(markdownLinkPattern)) {
    const [raw, label, href] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    nodes.push(
      <a
        key={`${href}-${index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-accent underline decoration-[rgba(245,52,12,0.35)] underline-offset-4 transition-colors duration-200 hover:text-ink"
      >
        {label}
      </a>,
    );

    lastIndex = index + raw.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : text;
};

const getParagraphClassName = (paragraph: string) => {
  if (paragraph.startsWith('#')) {
    return 'font-mono text-xs leading-6 text-ink-30';
  }

  if (paragraph.startsWith('đź‘‰')) {
    return 'border border-[rgba(26,23,18,0.16)] bg-paper px-4 py-3 font-semibold text-ink';
  }

  return undefined;
};

type BlogRichTextProps = {
  paragraphs: string[];
  idPrefix: string;
};

const BlogRichText = ({ paragraphs, idPrefix }: BlogRichTextProps) => {
  return (
    <Reveal className="space-y-4 text-[15px] leading-8 text-ink-70">
      {paragraphs.map((paragraph) => (
        <p
          key={`${idPrefix}::${paragraph}`}
          className={getParagraphClassName(paragraph)}
        >
          {renderInlineLinks(paragraph)}
        </p>
      ))}
    </Reveal>
  );
};

export default BlogRichText;
