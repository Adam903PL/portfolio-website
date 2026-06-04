import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Linkedin } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { blogPosts } from '@/lib/blog-posts';
import {
  createBlogPostJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from '@/lib/seo';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getBlogPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: post.canonicalPath,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={createBlogPostJsonLd(post)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: post.canonicalPath },
        ])}
      />
      <main className="min-h-screen px-4 pb-24 pt-28 text-white sm:px-6 lg:pt-32">
        <article className="mx-auto max-w-3xl scroll-mt-28" lang="pl">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur transition-[border-color,color,background-color] duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Blog
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/55 backdrop-blur">
              <Linkedin className="size-4" aria-hidden />
              {post.source}
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              {post.kicker}
            </p>
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-white/58 sm:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/45"
              >
                #{tag}
              </span>
            ))}
            <a
              href={post.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/55 transition-[border-color,color,background-color] duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Open on LinkedIn
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </div>

          <div className="relative my-8 overflow-hidden rounded-[16px] border border-white/10 bg-black">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                style={{ objectPosition: post.imagePosition ?? 'center' }}
              />
            </div>
          </div>

          <div className="space-y-4 text-sm leading-7 text-white/62 sm:text-[15px] sm:leading-8">
            {post.content.map((paragraph, index) => (
              <p
                key={`${post.slug}-${index}`}
                className={
                  paragraph.startsWith('#')
                    ? 'font-mono text-xs leading-6 text-white/30'
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}
