import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const AboutSnippet: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            A Little About Me
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            I'm a passionate Data Scientist, Machine Learning Engineer, and Web Developer dedicated to building innovative and impactful solutions. I thrive on transforming complex data into actionable insights and creating engaging digital experiences. My journey is driven by a relentless curiosity and a love for continuous learning.
          </p>
          <Link href="/about">
            <Button variant="outline">
              Learn More About Me
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
