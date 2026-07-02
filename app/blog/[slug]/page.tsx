import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import BlogRichText from '@/components/BlogRichText';
import { blogPosts, getBlogPostImages } from '@/lib/blog-posts';
import {
  createBlogPostJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from '@/lib/seo';

const LINE = 'rgba(26,23,18,0.16)';

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

  const allImages = getBlogPostImages(post);
  const hero = allImages[0];
  const galleryImages = allImages.slice(1);
  const heroAspect =
    hero.orientation === 'portrait' ? 'aspect-[4/5]' : 'aspect-[16/9]';

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
      <main className="relative z-[2] px-5 pb-24 pt-16 sm:px-6">
        <article className="mx-auto max-w-3xl scroll-mt-28" lang="pl">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.04em] text-ink no-underline transition-colors hover:border-accent"
            style={{ borderColor: 'rgba(26,23,18,0.28)' }}
          >
            ← Back to Blog
          </Link>

          <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.08em] text-accent">
            {post.kicker}
          </div>

          <h1 className="m-0 font-sans text-[38px] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-[52px]">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-ink-70">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-accent">
                #{tag}
              </span>
            ))}
            <a
              href={post.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex shrink-0 items-center gap-2 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.04em] text-ink no-underline transition-colors hover:border-accent"
              style={{ borderColor: 'rgba(26,23,18,0.28)' }}
            >
              Open on LinkedIn ↗
            </a>
          </div>

          <div
            className="relative my-8 overflow-hidden border bg-sand"
            style={{ borderColor: LINE }}
          >
            <div className={`relative ${heroAspect}`}>
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                style={{ objectPosition: post.imagePosition ?? 'center' }}
              />
            </div>
          </div>

          <BlogRichText paragraphs={post.content} idPrefix={post.slug} />

          {galleryImages.length > 0 ? (
            <section
              className="mt-12 border-t pt-10"
              style={{ borderColor: LINE }}
            >
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
                    Event photos
                  </p>
                  <h2 className="m-0 font-sans text-[26px] font-medium tracking-[-0.01em] text-ink">
                    More from the day
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-ink-30">
                  {galleryImages.length} photos
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {galleryImages.map((image, index) => (
                  <figure
                    key={image.src}
                    className="m-0 overflow-hidden border bg-paper"
                    style={{ borderColor: LINE }}
                  >
                    <div
                      className={
                        image.orientation === 'portrait'
                          ? 'relative aspect-[4/5] bg-sand'
                          : 'relative aspect-[16/10] bg-sand'
                      }
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 380px"
                        className="object-cover"
                        style={{ objectPosition: image.position ?? 'center' }}
                      />
                    </div>
                    <figcaption
                      className="border-t px-4 py-3 font-mono text-[11px] leading-5 text-ink-40"
                      style={{ borderColor: LINE }}
                    >
                      {String(index + 1).padStart(2, '0')} / {image.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </main>
    </>
  );
}
