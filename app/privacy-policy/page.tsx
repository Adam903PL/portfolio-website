import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  privacyPolicyJsonLd,
} from '@/lib/seo';
import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_PATH,
  privacyPolicyReferences,
  privacyPolicySections,
  privacyPolicySummary,
} from '@/lib/privacy-policy';

const LINE = 'rgba(26,23,18,0.16)';
const LINE_STRONG = 'rgba(26,23,18,0.28)';

const summary = [
  {
    label: 'No analytics',
    body: 'No first-party Google Analytics, Vercel Analytics or marketing cookie banner is used.',
  },
  {
    label: 'Contact only',
    body: 'The form is used to reply to messages and discuss possible collaboration.',
  },
  {
    label: 'Service providers',
    body: 'Email delivery uses Resend. Hosting and technical logs are handled by Vercel.',
  },
];

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy Policy',
  description: privacyPolicySummary,
  path: PRIVACY_POLICY_PATH,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={privacyPolicyJsonLd} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: PRIVACY_POLICY_PATH },
        ])}
      />

      {/* Page hero */}
      <section className="side-pad relative z-[2] pb-5 pt-16">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 border px-4 py-2 font-mono text-[12px] uppercase tracking-[0.04em] text-ink no-underline transition-colors hover:border-accent"
          style={{ borderColor: LINE_STRONG }}
        >
          ← Back home
        </Link>

        <div className="mb-[26px] font-mono text-[13px] uppercase tracking-[0.08em] text-accent">
          Privacy - how your data is handled
        </div>
        <h1 className="display-xl m-0 font-sans font-medium leading-[0.9] tracking-[-0.03em]">
          Privacy{' '}
          <span className="font-serif text-[1.05em] italic text-accent">
            policy
          </span>
          .
        </h1>
        <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-ink-70">
          Last updated {PRIVACY_POLICY_LAST_UPDATED}. This page explains how
          contact-form data, email delivery and hosting logs are handled on this
          portfolio - in Polish and English.
        </p>
      </section>

      <section className="side-pad relative z-[2] pb-[80px] pt-6">
        <div className="privacy-grid grid gap-5 min-[901px]:grid-cols-[0.8fr_1.2fr]">
          {/* Quick summary */}
          <aside
            className="h-fit border bg-paper p-7"
            style={{ borderColor: LINE }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-30">
              / Quick summary
            </div>
            <dl className="mt-6 flex flex-col">
              {summary.map((item, i) => (
                <div
                  key={item.label}
                  className={`py-[18px] ${i > 0 ? 'border-t' : ''}`}
                  style={i > 0 ? { borderColor: LINE } : undefined}
                >
                  <dt className="text-[15px] font-semibold text-ink">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] leading-[1.6] text-ink-70">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* Policy body */}
          <div className="flex flex-col gap-5">
            {privacyPolicySections.map((section) => (
              <article
                key={section.language}
                lang={section.language}
                className="border bg-paper p-7 sm:p-9"
                style={{ borderColor: LINE }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                  {section.eyebrow}
                </div>
                <h2 className="mt-3 font-sans text-[30px] font-medium leading-[1.05] tracking-[-0.02em] text-ink">
                  {section.title}
                </h2>
                <p className="mt-4 text-[16px] leading-[1.65] text-ink-70">
                  {section.intro}
                </p>

                <div className="mt-8 flex flex-col">
                  {section.items.map((item, i) => (
                    <section
                      key={item.heading}
                      className={`py-7 ${i > 0 ? 'border-t' : ''}`}
                      style={i > 0 ? { borderColor: LINE } : undefined}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[12px] text-ink-30">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-[17px] font-semibold text-ink">
                          {item.heading}
                        </h3>
                      </div>
                      <div className="mt-3 flex flex-col gap-3 pl-[30px] text-[15px] leading-[1.7] text-ink-70">
                        {item.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            ))}

            {/* References */}
            <section
              className="border bg-ink p-7 text-cream sm:p-9"
              style={{ borderColor: LINE }}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                / References
              </div>
              <h2 className="mt-3 font-sans text-[24px] font-medium tracking-[-0.01em] text-cream">
                Sources used for this notice
              </h2>
              <ul className="mt-6 flex flex-col">
                {privacyPolicyReferences.map((reference, i) => (
                  <li
                    key={reference.href}
                    className={`py-3.5 ${i > 0 ? 'border-t' : ''}`}
                    style={
                      i > 0
                        ? { borderColor: 'rgba(237,231,218,0.14)' }
                        : undefined
                    }
                  >
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[13px] text-cream-70 no-underline transition-colors hover:text-accent"
                    >
                      {reference.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
