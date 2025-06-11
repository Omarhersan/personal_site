import React from 'react';
import Button from '../ui/Button'; // Assuming you have a reusable Button component

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Omar: Crafting Intelligent Solutions with Data, Code, and Creativity.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
          Exploring the frontiers of Data Science, Machine Learning, and Web Development. Sharing insights and fun along the way.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button href="#projects" variant="primary">
            View My Projects
          </Button>
          <Button href="#blog" variant="outline">
            Read My Blog
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
