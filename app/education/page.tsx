import Education from '@/components/Education';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { createBreadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Education',
  description:
    'Adam Pukaluk education timeline, from early programming foundations to current full-stack development at TechniSchools.',
  path: '/education',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Education', path: '/education' },
        ])}
      />
      <Education />
    </>
  );
}
