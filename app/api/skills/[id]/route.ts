import { NextResponse, NextRequest } from 'next/server';
import Skill from '@/models/Skill';
import mongoose from 'mongoose';
import { withDb } from '@/lib/apiHelpers';

// GET a single skill by ID
export const GET = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid skill ID' }, { status: 400 });
  }
  const skill = await Skill.findById(id);
  if (!skill) {
    return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
  }
  return NextResponse.json(skill);
});

// PUT (update) a skill by ID
export const PUT = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
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
});

// DELETE a skill by ID
export const DELETE = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid skill ID' }, { status: 400 });
  }
  const deletedSkill = await Skill.findByIdAndDelete(id);
  if (!deletedSkill) {
    return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Skill deleted', skill: deletedSkill });
});
