import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { BlogGrid, BlogGridItem } from '@/components/motion/BlogGrid';
import { blogPosts } from '@/lib/blog-posts';
import {
  createBlogJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Blog',
  description:
    'LinkedIn posts and updates from Adam Pukaluk about hackathons, AI tooling, education and software development.',
  path: '/blog',
});

const LINE = 'rgba(26,23,18,0.16)';
const LINE_STRONG = 'rgba(26,23,18,0.18)';

const BlogPage = () => {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <JsonLd data={createBlogJsonLd(blogPosts)} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      {/* Page hero */}
      <section className="side-pad relative z-[2] pb-11 pt-16">
        <div className="mb-[26px] font-mono text-[13px] uppercase tracking-[0.08em] text-accent">
          Field notes - from LinkedIn
        </div>
        <h1 className="display-xl m-0 font-sans font-medium leading-[0.92] tracking-[-0.03em]">
          Writing &amp;
          <br />
          <span className="font-serif text-[1.05em] italic text-accent">
            happenings
          </span>
          .
        </h1>
        <p className="mt-7 max-w-[560px] text-[18px] leading-[1.55] text-ink-70">
          Hand-picked posts from LinkedIn - events, hackathons and talks - with
          the full context and a link to the original, without heavy embeds
          weighing down the page.
        </p>
      </section>

      {/* Featured post */}
      <section className="side-pad relative z-[2] py-4">
        <Link
          href={featured.canonicalPath}
          className="group block border bg-paper no-underline transition-colors hover:border-accent"
          style={{ borderColor: LINE_STRONG }}
        >
          <div className="feat-grid grid min-[901px]:grid-cols-[1.1fr_0.9fr]">
            <div
              className="relative min-h-[340px] overflow-hidden border-b bg-sand min-[901px]:border-b-0 min-[901px]:border-r"
              style={{ borderColor: LINE }}
            >
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 560px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span
                className="absolute left-3.5 top-3.5 font-mono text-[11px] text-cream"
                style={{
                  background: 'rgba(26,23,18,0.6)',
                  padding: '5px 10px',
                }}
              >
                FEATURED · 01
              </span>
            </div>
            <div className="flex flex-col justify-center px-[34px] py-10">
              <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-30">
                {featured.kicker}
              </div>
              <h2 className="mt-4 font-sans text-[30px] font-semibold leading-[1.12] tracking-[-0.01em]">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-70">
                {featured.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-mono text-[11px] text-accent">
                    #{tag}
                  </span>
                ))}
              </div>
              <div
                className="mt-6 border-t pt-[18px] font-mono text-[12px] text-ink"
                style={{ borderColor: LINE }}
              >
                Read full post →
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Post grid */}
      <section className="side-pad relative z-[2] pb-5 pt-9">
        <BlogGrid className="grid-2 grid gap-[22px] min-[901px]:grid-cols-2">
          {rest.map((post, i) => (
            <BlogGridItem key={post.id}>
              <Link
                href={post.canonicalPath}
                className="group flex flex-col border bg-paper no-underline transition-colors hover:border-accent"
                style={{ borderColor: LINE }}
              >
                <div
                  className="relative overflow-hidden border-b"
                  style={{ borderColor: LINE }}
                >
                  <div className="relative h-[220px] w-full bg-sand">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 560px"
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <span
                    className="absolute left-3 top-3 font-mono text-[11px] text-cream"
                    style={{
                      background: 'rgba(26,23,18,0.6)',
                      padding: '4px 8px',
                    }}
                  >
                    0{i + 2}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-[26px] pt-6">
                  <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-30">
                    {post.kicker}
                  </div>
                  <h3 className="mb-2.5 mt-3 font-sans text-[22px] font-semibold leading-[1.2]">
                    {post.title}
                  </h3>
                  <p className="m-0 flex-1 text-[14px] leading-[1.55] text-ink-60">
                    {post.excerpt}
                  </p>
                  <div
                    className="mt-5 flex items-center justify-between border-t pt-4"
                    style={{ borderColor: 'rgba(26,23,18,0.14)' }}
                  >
                    <span className="font-mono text-[12px] text-accent">
                      Read post →
                    </span>
                    <span className="font-mono text-[11px] text-ink-30">
                      LinkedIn
                    </span>
                  </div>
                </div>
              </Link>
            </BlogGridItem>
          ))}
        </BlogGrid>
      </section>

      {/* CTA */}
      <section className="side-pad relative z-[2] pb-[60px] pt-14">
        <div
          className="flex flex-wrap items-center justify-between gap-6 border-t pt-10"
          style={{ borderColor: 'rgba(26,23,18,0.2)' }}
        >
          <h2 className="m-0 max-w-[520px] font-sans text-[32px] font-medium tracking-[-0.02em]">
            Follow along on{' '}
            <span className="font-serif font-normal italic text-accent">
              LinkedIn
            </span>{' '}
            for the next one.
          </h2>
          <a
            href="https://www.linkedin.com/in/adam-pukaluk-339058298/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink px-[26px] py-4 font-mono text-[13px] uppercase tracking-[0.04em] text-cream no-underline"
          >
            Connect on LinkedIn →
          </a>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
