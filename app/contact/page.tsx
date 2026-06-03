import Contact from '@/components/Contact';
import React from 'react';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { contactJsonLd, createPageMetadata } from '@/lib/seo';

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
      <Contact />
    </>
  );
};

export default page;
