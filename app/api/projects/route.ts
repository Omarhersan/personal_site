import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project'; // Adjusted import

// GET /api/projects - Fetches all projects
export async function GET(request: Request) {
  try {
    await dbConnect();
    const projects = await Project.find({});
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error); // Server-side log
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error fetching projects from API', error: errorMessage }, { status: 500 });
  }
}

// POST /api/projects - Creates a new project
export async function POST(request: Request) {
  try {
    await dbConnect();
    const newProjectData = await request.json();
    console.log("Received project data for POST:", newProjectData); 

    // Basic validation - adapt fields as per your IProject interface
    if (!newProjectData.name || !newProjectData.description || !newProjectData.category || !newProjectData.status) {
      console.log("Validation failed: Missing required fields");
      return NextResponse.json({ message: 'Missing required project fields (name, description, category, status)' }, { status: 400 });
    }

    const project = new Project(newProjectData);
    console.log("Project object before save:", project); 
    
    const savedProject = await project.save(); 
    console.log("Project object after save:", savedProject); 
    
    return NextResponse.json(savedProject, { status: 201 }); 
  } catch (error) {
    console.error('Error creating project:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // @ts-ignore
    if (error.code === 11000) { 
       // @ts-ignore
      return NextResponse.json({ message: `Project with name '${error.keyValue?.name}' already exists.`, error: errorMessage }, { status: 409 });
    }
    return NextResponse.json({ message: 'Error creating project in API', error: errorMessage }, { status: 500 });
  }
}
