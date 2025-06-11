import React from 'react';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import HeroSection from './components/hero/HeroSection';
import AboutSnippet from './components/about/AboutSnippet';
import SkillsShowcase from './components/skills/SkillsShowcase';
import FeaturedProjects from './components/projects/FeaturedProjects';
import LatestBlogPosts from './components/blog/LatestBlogPosts';
import ContactCTA from './components/contact/ContactCTA';


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSnippet />
        <SkillsShowcase />
        <FeaturedProjects />
        <LatestBlogPosts />
        <ContactCTA />
        {/* Other sections will go here */}
      </main>
      <Footer />
    </>
  );
}
