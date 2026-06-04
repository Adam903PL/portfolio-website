import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Linkedin } from 'lucide-react';
import { blogPosts } from '@/lib/blog-posts';

const BlogPreview = () => {
  return (
    <section
      id="blog"
      className="relative w-full scroll-mt-28 px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 backdrop-blur">
              <BookOpen className="size-3.5" aria-hidden />
              Blog
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              LinkedIn Posts
            </h2>
            <p className="mt-4 text-base leading-7 text-white/55 sm:text-lg">
              Ręcznie złożone wpisy z LinkedIna: zdjęcia, kontekst i link do
              oryginalnej publikacji bez ciężkich embedów na stronie głównej.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white bg-white px-5 text-sm font-bold text-black transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            View Blog
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-[18px] border border-white/10 bg-black/70 backdrop-blur-xl transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: post.imagePosition ?? 'center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-black/55 px-3 py-2 text-xs font-semibold text-white/75 backdrop-blur">
                  <Linkedin className="size-4" aria-hidden />
                  {post.source}
                </div>
                <span className="absolute right-4 top-4 rounded-[10px] border border-white/10 bg-black/55 px-3 py-2 font-mono text-xs uppercase tracking-[0.22em] text-white/55 backdrop-blur">
                  0{index + 1}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="mb-3 text-xs uppercase tracking-[0.22em] text-white/35">
                  {post.kicker}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {post.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  {post.excerpt}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/45"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={post.canonicalPath}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-200 hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    Read full post
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                  <a
                    href={post.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    Open on LinkedIn
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
