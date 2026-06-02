import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Linkedin, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'Blog | Adam Pukaluk',
  description: 'LinkedIn posts and updates from Adam Pukaluk.',
};

const BlogPage = () => {
  return (
    <main className="min-h-screen px-4 pb-24 pt-28 text-white sm:px-6 lg:pt-32">
      <section className="mx-auto max-w-3xl">
        {/* Back button */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 rounded-[12px] border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 backdrop-blur transition-[border-color,color,background-color] duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back Home
        </Link>

        {/* Page header */}
        <div className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 backdrop-blur">
            <Linkedin className="size-3.5" aria-hidden />
            Blog
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl">
            LinkedIn Posts
          </h1>
          <p className="mt-4 text-base leading-7 text-white/55 sm:text-lg">
            Wpisy złożone ręcznie w stylu strony: pełny tekst, zdjęcia i linki
            do oryginalnych publikacji na LinkedInie.
          </p>
        </div>

        {/* Posts */}
        <div className="flex flex-col gap-20">
          {blogPosts.map((post, index) => (
            <article key={post.id} id={post.slug} className="scroll-mt-28">
              {/* Post number + kicker */}
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/25">
                  0{index + 1}
                </span>
                <span className="h-px flex-1 bg-white/10" />
                <p className="text-xs uppercase tracking-[0.22em] text-white/35">
                  {post.kicker}
                </p>
              </div>

              {/* Title */}
              <h2 className="mb-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {post.title}
              </h2>

              {/* Tags + LinkedIn button row */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
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

              {/* Image */}
              <div className="relative mb-8 overflow-hidden rounded-[16px] border border-white/10 bg-black">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    priority={post.slug === 'civil42-hackathon'}
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain"
                    style={{ objectPosition: post.imagePosition ?? 'center' }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-sm leading-7 text-white/62 sm:text-[15px] sm:leading-8">
                {post.content.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={
                      paragraph.startsWith('#')
                        ? 'font-mono text-xs leading-6 text-white/30'
                        : paragraph.startsWith('👉')
                          ? 'rounded-[12px] border border-white/10 bg-white/[0.035] px-4 py-3 font-semibold text-white/72'
                          : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Bottom divider (not on last post) */}
              <div className="mt-12 h-px w-full bg-white/[0.06]" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
