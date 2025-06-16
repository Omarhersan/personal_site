import React from 'react';
import ProjectCard, { Project } from '../components/projects/ProjectCard'; // Project type is now from ProjectCard.tsx

// Function to fetch projects from the API
async function getProjects(): Promise<Project[]> {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''; // Re-added apiUrl
	const res = await fetch(`${apiUrl}/api/projects?status=published`, {
		next: { revalidate: 60 }, // Changed from cache: 'no-store'
	});
	if (!res.ok) {
		throw new Error('Failed to fetch projects');
	}
	// The API returns an array of objects that should match the frontend Project interface
	const projectsData = await res.json();
	return projectsData.map((project: any) => ({
		// Use any for initial mapping, then rely on Project type
		...project,
		_id: project._id.toString(), // Ensure _id is a string
    isPublished: project.isPublished, // Ensure isPublished is mapped
		// Ensure all fields expected by the frontend Project type are present or handled
		// For example, if dates are returned from backend, they might need formatting
		startDate: project.startDate ? new Date(project.startDate).toLocaleDateString() : undefined,
		endDate: project.endDate ? new Date(project.endDate).toLocaleDateString() : undefined,
	}));
}

const ProjectsPage = async () => {
	let projects: Project[] = [];
	let error: string | null = null;

	try {
		projects = await getProjects();
	} catch (e) {
		// @ts-ignore
		error = e.message || 'An error occurred while fetching projects.';
		console.error(e);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
			{error && (
				<p className="text-center text-red-500 bg-red-100 p-4 rounded-md">Error: {error}</p>
			)}
			{!error && projects.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			) : (
				!error && (
					<p className="text-center text-gray-700 dark:text-gray-300">
						No projects to display at the moment. Check back soon!
					</p>
				)
			)}
		</div>
	);
};

export default ProjectsPage;
