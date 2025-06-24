import React from 'react';
import ProjectCard, { Project } from './ProjectCard'; // Project type is from ProjectCard.tsx
import Link from 'next/link';
import Button from '../ui/Button';
import { getProjects } from '@/lib/projects';

const FeaturedProjects: React.FC = async () => {
  const featuredProjects = await getProjects({ featured: true, status: 'published', limit: 3 });

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Featured Projects
        </h2>
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project: Project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">No featured projects to display at the moment.</p>
        )}
        <div className="text-center mt-12">
          <Link href="/projects">
            <Button variant="outline">View All Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
