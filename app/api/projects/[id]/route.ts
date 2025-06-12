import { NextResponse, NextRequest } from 'next/server';
import Project from '@/models/Project'; // Adjusted import
import mongoose from 'mongoose';
import { withDb } from '@/lib/apiHelpers';

// GET a single project by ID
export const GET = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
  }
  const project = await Project.findById(id); // Adjusted to use Project model
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
});

// PUT (update) a project by ID
export const PUT = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
  }
  const updatedData = await request.json();

  // Add any specific validation for project fields if necessary
  // For example, checking if certain fields are not empty strings if provided
  // Mongoose schema validation (runValidators: true) will handle enum checks and required fields.

  const project = await Project.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true }); // Adjusted
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
});

// DELETE a project by ID
export const DELETE = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
  }
  const deletedProject = await Project.findByIdAndDelete(id); // Adjusted to use Project model
  if (!deletedProject) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Project deleted', project: deletedProject });
});
