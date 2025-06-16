import { NextResponse, NextRequest } from 'next/server';
import Skill from '@/models/Skill';
import mongoose from 'mongoose';
import { withDb, type NextRouteContext, type AppRouterHandler } from '@/lib/apiHelpers';

// Define the actual shape of the resolved params for this route
type SkillRouteParams = { id: string };

// GET a single skill by ID
const getHandler: AppRouterHandler<NextRequest, SkillRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid skill ID' }, { status: 400 });
  }
  const skill = await Skill.findById(id);
  if (!skill) {
    return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
  }
  return NextResponse.json(skill);
};
export const GET = withDb(getHandler);

// PUT (update) a skill by ID
const putHandler: AppRouterHandler<NextRequest, SkillRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid skill ID' }, { status: 400 });
  }
  const updatedData = await request.json();
  // Basic check for empty strings if fields are provided for update.
  // Mongoose schema validation (runValidators: true) will handle enum checks for category and proficiency.
  if (updatedData.name === '' || updatedData.proficiency === '' || updatedData.category === '') {
    return NextResponse.json(
      { message: 'Name, proficiency, and category cannot be empty strings if provided for update.' },
      { status: 400 }
    );
  }

  const skill = await Skill.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
  if (!skill) {
    return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
  }
  return NextResponse.json(skill);
};
export const PUT = withDb(putHandler);

// DELETE a skill by ID
const deleteHandler: AppRouterHandler<NextRequest, SkillRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid skill ID' }, { status: 400 });
  }
  const deletedSkill = await Skill.findByIdAndDelete(id);
  if (!deletedSkill) {
    return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Skill deleted', skill: deletedSkill });
};
export const DELETE = withDb(deleteHandler);
