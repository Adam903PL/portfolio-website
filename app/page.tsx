import Hero from '@/components/Hero';
import About from '@/components/About-Me';
import React from 'react';
import Skills from '@/components/Skills';
import BlogPreview from '@/components/BlogPreview';
import ProjectCTA from '@/components/ProjectCTA';
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  createBreadcrumbJsonLd,
  createPageMetadata,
  profilePageJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Full-Stack Developer Portfolio',
  description:
    'Portfolio of Adam Pukaluk: full-stack projects, skills, blog posts, education path and contact information.',
  path: '/',
});

const Home = () => {
  return (
    <>
      <JsonLd data={profilePageJsonLd} />
      <JsonLd data={createBreadcrumbJsonLd([{ name: 'Home', path: '/' }])} />
      <Hero />
      <About />
      <Skills />
      <BlogPreview />
      <ProjectCTA />
    </>
  );
};

export default Home;
