import { NextResponse } from 'next/server';

// Dummy data store - replace with your actual database or data source
let projects = [
  { id: '1', name: 'Project Alpha', description: 'Description for Alpha' },
  { id: '2', name: 'Project Beta', description: 'Description for Beta' },
];

// Helper function to find a project by ID
const findProject = (id: string) => projects.find(p => p.id === id);

// GET /api/projects/[id] - Fetches a single project by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const project = findProject(params.id);
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
}

// PUT /api/projects/[id] - Updates a project by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const projectIndex = projects.findIndex(p => p.id === params.id);
  if (projectIndex === -1) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  try {
    const updatedData = await request.json();
    // Basic validation
    if (!updatedData.name || !updatedData.description) {
      return NextResponse.json({ message: 'Missing name or description' }, { status: 400 });
    }
    projects[projectIndex] = { ...projects[projectIndex], ...updatedData };
    return NextResponse.json(projects[projectIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating project', error }, { status: 500 });
  }
}

// DELETE /api/projects/[id] - Deletes a project by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const projectIndex = projects.findIndex(p => p.id === params.id);
  if (projectIndex === -1) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  const deletedProject = projects.splice(projectIndex, 1);
  return NextResponse.json({ message: 'Project deleted', project: deletedProject[0] });
}
