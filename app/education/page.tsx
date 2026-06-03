import EducationPageClient from '@/components/EducationPageClient';
import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Education',
  description:
    'Adam Pukaluk education timeline, from early programming foundations to current full-stack development at TechniSchools.',
  path: '/education',
});

export default function Page() {
  return <EducationPageClient />;
}
