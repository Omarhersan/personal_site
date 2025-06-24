import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function getSkills() {
  try {
    await dbConnect();

    const skills = await Skill.find({}).sort({ proficiency: -1 }).lean();

    return JSON.parse(JSON.stringify(skills));
  } catch (error) {
    console.error('Error fetching skills from DB:', error);
    return [];
  }
}
