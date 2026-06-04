import Contact from '@/components/Contact';
import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  contactJsonLd,
  createBreadcrumbJsonLd,
  createPageMetadata,
} from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Adam Pukaluk for full-stack development, automation, portfolio projects and collaboration opportunities.',
  path: '/contact',
});

const page = () => {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <Contact />
    </>
  );
};

export default page;
