import ProjectsFocusCards from '@/components/Projects';
import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  projectsJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Selected projects by Adam Pukaluk, including Prompt Version Control, Civil42 Crisis OS and modern full-stack web applications.',
  path: '/projects',
});

const page = () => {
  return (
    <>
      <JsonLd data={projectsJsonLd} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <ProjectsFocusCards />
    </>
  );
};

export default page;
