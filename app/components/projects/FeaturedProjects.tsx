import React from 'react';
import ProjectCard, { Project } from './ProjectCard'; // Project type is from ProjectCard.tsx
import Link from 'next/link';
import Button from '../ui/Button';

// Function to fetch featured projects from the API
async function getFeaturedProjects(): Promise<Project[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''; // Re-added apiUrl
  // Assuming your API can filter for featured projects, or you fetch all and filter here
  // For now, let's fetch all and slice. Adjust if you have a specific endpoint e.g. /api/projects?featured=true
  const res = await fetch(`${apiUrl}/api/projects?status=published`, {
    next: { revalidate: 60 }, // Changed from cache: 'no-store'
  }); // Use absolute path
  if (!res.ok) {
    console.error('Failed to fetch projects for featured section');
    return []; // Return empty array on error to prevent breaking the page
  }
  const projectsData = await res.json();
  // Map to frontend Project type and ensure _id is string
  const allProjects: Project[] = projectsData.map((project: any) => ({
    ...project,
    _id: project._id.toString(),
    isPublished: project.isPublished, // Ensure isPublished is mapped
    startDate: project.startDate ? new Date(project.startDate).toLocaleDateString() : undefined,
    endDate: project.endDate ? new Date(project.endDate).toLocaleDateString() : undefined,
  }));
  return allProjects.slice(0, 3); // Example: show the first 3 projects as featured
}

const FeaturedProjects: React.FC = async () => {
  let projectsToDisplay: Project[] = [];
  let error: string | null = null;

  try {
    projectsToDisplay = await getFeaturedProjects();
  } catch (e) {
    // @ts-ignore
    error = e.message || "Could not load featured projects.";
    console.error("FeaturedProjects fetch error:", e);
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Featured Projects
        </h2>
        {error && (
          <p className="text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>
        )}
        {!error && projectsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsToDisplay.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          !error && <p className="text-center text-gray-700 dark:text-gray-300">No featured projects to display at the moment.</p>
        )}
        {/* Link to all projects page, assuming you might have more than 3 total projects */}
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
