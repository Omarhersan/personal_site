import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';

// Define a frontend-specific Project type
// This should include all fields you expect from the API and use in the card.
export interface Project {
  _id: string; // MongoDB ID
  name: string;
  description: string;
  category: string; // Or use ProjectCategory from backend if you import it
  status: string;   // Or use ProjectStatus from backend
  technologiesUsed: string[];
  projectUrl?: string;
  repositoryUrl?: string;
  imageUrl?: string;
  startDate?: string; // Dates will likely be strings from JSON
  endDate?: string;
  // Add any other fields from IProject that you will use in the frontend
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
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className="w-full h-48 sm:h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">{project.name}</span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologiesUsed.map((tech, index) => (
              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 text-xs rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-3">
          {project.projectUrl && (
            <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="text-sm !px-4 !py-2">Live Demo</Button>
            </Link>
          )}
          {project.repositoryUrl && (
            <Link href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="text-sm !px-4 !py-2">GitHub Repo</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
