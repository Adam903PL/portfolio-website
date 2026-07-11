import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';

const BlogPreview = () => {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="writing" className="side-pad relative z-[2] pb-10 pt-20">
      {/* Header */}
      <div className="mb-[38px] flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="mb-[18px] font-mono text-[12px] uppercase tracking-[0.1em] text-accent">
            / 03 - Writing
          </div>
          <h2 className="m-0 font-sans text-[44px] font-medium leading-none tracking-[-0.02em]">
            From LinkedIn
          </h2>
        </div>
        <Link
          href="/blog"
          className="border-b border-accent pb-[3px] font-mono text-[13px] uppercase tracking-[0.04em] text-ink no-underline transition-colors hover:text-accent"
        >
          View all →
        </Link>
      </div>

      {/* Grid */}
      <div className="blog-grid grid gap-6 min-[901px]:grid-cols-3">
        {posts.map((post, i) => (
          <Link
            key={post.id}
            href={post.canonicalPath}
            className="group flex flex-col border bg-paper no-underline transition-colors hover:border-accent"
            style={{ borderColor: 'rgba(26,23,18,0.16)' }}
          >
            <div
              className="relative overflow-hidden border-b"
              style={{ borderColor: 'rgba(26,23,18,0.16)' }}
            >
              <div className="relative h-[260px] w-full bg-sand">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 380px"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <span
                className="absolute left-3 top-3 font-mono text-[11px] text-cream"
                style={{ background: 'rgba(26,23,18,0.6)', padding: '4px 8px' }}
              >
                0{i + 1}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-[22px] pb-[26px] pt-[22px]">
              <div className="font-mono text-[11px] uppercase tracking-[0.04em] text-ink-30">
                {post.kicker}
              </div>
              <h3 className="mb-2.5 mt-3 font-sans text-[20px] font-semibold leading-[1.2] text-ink">
                {post.title}
              </h3>
              <p className="m-0 flex-1 text-[14px] leading-[1.55] text-ink-60">
                {post.excerpt}
              </p>
              <div className="mt-[18px] font-mono text-[12px] text-accent">
                Read post →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
