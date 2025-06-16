import { NextResponse, NextRequest } from 'next/server';
import Project from '@/models/Project'; // Adjusted import
import mongoose from 'mongoose';
import { withDb, type NextRouteContext, type AppRouterHandler } from '@/lib/apiHelpers';

// Define the actual shape of the resolved params for this route
type ProjectRouteParams = { id: string };

// GET a single project by ID
const getHandler: AppRouterHandler<NextRequest, ProjectRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
  }
  const project = await Project.findById(id); // Adjusted to use Project model
  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(project);
};
export const GET = withDb(getHandler);

// PUT (update) a project by ID
const putHandler: AppRouterHandler<NextRequest, ProjectRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
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
};
export const PUT = withDb(putHandler);

// DELETE a project by ID
const deleteHandler: AppRouterHandler<NextRequest, ProjectRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid project ID' }, { status: 400 });
  }
  const deletedProject = await Project.findByIdAndDelete(id); // Adjusted to use Project model
  if (!deletedProject) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Project deleted', project: deletedProject });
};
export const DELETE = withDb(deleteHandler);
