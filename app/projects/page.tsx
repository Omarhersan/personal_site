import React from 'react';
import ProjectCard from '../components/projects/ProjectCard';

// Sample project data - you'll likely want to move this to a separate file or fetch it from an API
const projects = [
	{
		id: 'alpha-001', // Added id
		title: 'Project Alpha',
		description:
			'A brief description of Project Alpha. This project was about X and achieved Y.',
		imageUrl: '/project-alpha.jpg', // Replace with actual image path or URL
		projectUrl: 'https://example.com/project-alpha',
		technologies: ['React', 'Node.js', 'MongoDB'], // Changed from tags
	},
	{
		id: 'beta-002', // Added id
		title: 'Project Beta',
		description:
			'An overview of Project Beta. Focused on Z and delivered W.',
		imageUrl: '/project-beta.jpg', // Replace with actual image path or URL
		projectUrl: 'https://example.com/project-beta',
		technologies: ['Python', 'Django', 'PostgreSQL'], // Changed from tags
	},
	{
		id: 'gamma-003', // Added id
		title: 'Project Gamma',
		description:
			'Details about Project Gamma. It explored A and resulted in B.',
		imageUrl: '/project-gamma.jpg', // Replace with actual image path or URL
		projectUrl: 'https://example.com/project-gamma',
		technologies: ['Next.js', 'Tailwind CSS', 'Supabase'], // Changed from tags
	},
	// Add more projects as needed
];

const ProjectsPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">My Projects</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{projects.map((project, index) => (
					<ProjectCard key={index} project={project} /> // Pass the whole project object
				))}
			</div>
		</div>
	);
};

export default ProjectsPage;
