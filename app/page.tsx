import Hero from '@/components/Hero';
import About from '@/components/About-Me';
import React from 'react';
import Skills from '@/components/Skills';
import BlogPreview from '@/components/BlogPreview';
import ProjectCTA from '@/components/ProjectCTA';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <BlogPreview />
      <ProjectCTA />
    </>
  );
};

export default Home;
