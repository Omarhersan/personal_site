import { NextResponse } from 'next/server';

// Dummy data store - replace with your actual database or data source
let projects = [
  { id: '1', name: 'Project Alpha', description: 'Description for Alpha' },
  { id: '2', name: 'Project Beta', description: 'Description for Beta' },
];

// GET /api/projects - Fetches all projects
export async function GET(request: Request) {
  return NextResponse.json(projects);
}

// POST /api/projects - Creates a new project
export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    // Basic validation
    if (!newProject.name || !newProject.description) {
      return NextResponse.json({ message: 'Missing name or description' }, { status: 400 });
    }
    const project = { id: String(projects.length + 1), ...newProject };
    projects.push(project);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating project', error }, { status: 500 });
  }
}
