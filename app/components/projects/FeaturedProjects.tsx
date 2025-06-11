import React from 'react';
import ProjectCard, { Project } from './ProjectCard';
import Link from 'next/link';
import Button from '../ui/Button';

// Sample Project Data - Replace with your actual projects
// For imageUrl, you can place images in your `public` folder (e.g., /public/images/project-a.jpg)
// and then use the path like `/images/project-a.jpg`
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Recommendation Engine',
    description: 'Developed a personalized recommendation system using collaborative filtering and content-based approaches, improving user engagement by 25%.',
    imageUrl: '/images/placeholder-project-1.png', // Replace with your actual image path
    imagePlaceholder: 'AI/ML Project',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Docker'],
    liveLink: '#', // Replace with actual link or remove if not applicable
    repoLink: '#', // Replace with actual link
    caseStudyLink: '/blog/ai-recommendation-engine-deep-dive', // Example internal link
  },
  {
    id: '2',
    title: 'Interactive Data Visualization Dashboard',
    description: 'Built a dynamic web dashboard for visualizing complex sales data, enabling stakeholders to identify trends and make informed decisions quickly.',
    imageUrl: '/images/placeholder-project-2.png', // Replace with your actual image path
    imagePlaceholder: 'Data Viz Project',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: '3',
    title: 'E-commerce Platform Enhancement',
    description: 'Led the development of new features for an existing e-commerce site, including a smart search functionality and a streamlined checkout process.',
    // No imageUrl, will use placeholder text
    imagePlaceholder: 'Web Dev Project',
    technologies: ['Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Stripe API'],
    repoLink: '#',
    caseStudyLink: '/projects/ecommerce-enhancement', // Example internal link
  },
  // Add more projects as needed
];

const FeaturedProjects: React.FC = () => {
  // You might want to fetch this data from a CMS or a local data file in a real app
  const projectsToDisplay = sampleProjects.slice(0, 3); // Showcasing first 3 for the homepage

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Featured Projects
        </h2>
        {projectsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsToDisplay.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">No projects to display at the moment. Check back soon!</p>
        )}
        {sampleProjects.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/projects">
                <Button variant="outline">View All Projects</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;
