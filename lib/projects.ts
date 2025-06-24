import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

interface GetProjectsParams {
  status?: string;
  limit?: number;
  featured?: boolean;
}

export async function getProjects({ status, limit, featured }: GetProjectsParams = {}) {
  try {
    await dbConnect();

    let query: any = {};
    let sortOrder: any = { createdAt: -1 };

    if (status === 'published') {
      query.isPublished = true;
    }

    if(featured) {
        query.isFeatured = true;
    }

    let projectsQuery = Project.find(query).sort(sortOrder);

    if (limit) {
      projectsQuery = projectsQuery.limit(limit);
    }

    const projects = await projectsQuery.lean();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects from DB:', error);
    return [];
  }
}
