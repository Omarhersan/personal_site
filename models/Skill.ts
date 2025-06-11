import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Define possible categories - good for consistency and validation
export const SKILL_CATEGORIES = ['Web Development', 'Data Science', 'Machine Learning', 'DevOps', 'Soft Skills', 'Other'] as const;
export type SkillCategory = typeof SKILL_CATEGORIES[number]; // Creates a union type: 'Web Development' | 'Data Science' | ...

export interface ISkill extends Document {
  name: string;
  proficiency: string;
  category: SkillCategory; // Added category
  // Add other fields as necessary, e.g.:
  // yearsOfExperience?: number;
  // iconUrl?: string; // If you want to store an icon specific to the skill
}

const SkillSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required.'], // Custom error message
    trim: true, // Automatically remove whitespace from start/end
  },
  proficiency: {
    type: String,
    required: [true, 'Proficiency level is required.'],
    enum: { // Restrict to specific values
      values: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Familiar'],
      message: '{VALUE} is not a supported proficiency level.'
    },
  },
  category: {
    type: String,
    required: [true, 'Skill category is required.'],
    enum: {
      values: SKILL_CATEGORIES,
      message: '{VALUE} is not a supported skill category.'
    }
  },
  // Example of another field with a timestamp
  // lastUsed: { type: Date, default: Date.now }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite in Next.js HMR
const Skill: Model<ISkill> = models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;
