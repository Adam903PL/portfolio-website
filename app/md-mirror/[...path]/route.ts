import {
  createMarkdownResponse,
  getMarkdownForPath,
  normalizeMirrorPath,
} from '@/lib/geo';
import { withNoindexHeader } from '@/lib/with-noindex-header';

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

export const dynamic = 'force-static';
export const revalidate = 86400;

const handleGet = async (_request: Request, context: RouteContext) => {
  const { path } = await context.params;
  const pathname = normalizeMirrorPath(path);
  const markdown = getMarkdownForPath(pathname);

  if (!markdown) {
    return createMarkdownResponse(
      `# Not Found\n\nNo markdown mirror exists for ${pathname}.`,
      {
        status: 404,
      },
    );
  }

  return createMarkdownResponse(markdown);
};

export const GET = withNoindexHeader(handleGet);
