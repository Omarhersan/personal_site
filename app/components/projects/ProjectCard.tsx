import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imagePlaceholder?: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
  caseStudyLink?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col">
      {project.imageUrl ? (
        <div className="relative w-full h-48 sm:h-56">
          <Image 
            src={project.imageUrl}
            alt={project.title}
            fill // Changed from layout="fill" for Next.js 13+
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Optional: for performance
            style={{ objectFit: 'cover' }} // Changed from objectFit="cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">{project.imagePlaceholder || 'Project Image'}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 text-xs rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
          {project.liveLink && (
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-sm !px-4 !py-2">Live Demo</Button>
            </Link>
          )}
          {project.repoLink && (
            <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-sm !px-4 !py-2">GitHub Repo</Button>
            </Link>
          )}
          {project.caseStudyLink && ( // Assuming internal link for case study
            <Link href={project.caseStudyLink}>
              <Button variant="secondary" className="text-sm !px-4 !py-2">Case Study</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
