import { buildContactMarkdown, createMarkdownResponse } from '@/lib/geo';
import { withNoindexHeader } from '@/lib/with-noindex-header';

export const dynamic = 'force-static';
export const revalidate = 86400;

export const GET = withNoindexHeader(() =>
  createMarkdownResponse(buildContactMarkdown()),
);
