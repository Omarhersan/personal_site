import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Define possible categories for projects - adapt as needed
export const PROJECT_CATEGORIES = ['Web Application', 'Mobile App', 'Data Analysis', 'Machine Learning Model', 'Game Development', 'Tool/Utility', 'Open Source', 'Other'] as const;
export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

// Define possible statuses for projects
export const PROJECT_STATUSES = ['Planning', 'In Development', 'Completed', 'On Hold', 'Archived'] as const;
export type ProjectStatus = typeof PROJECT_STATUSES[number];

export interface IProject extends Document {
  name: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  technologiesUsed: string[]; // Array of strings for tech stack
  projectUrl?: string; // Optional link to the live project
  repositoryUrl?: string; // Optional link to the code repository
  imageUrl?: string; // Optional link to a project image/thumbnail
  startDate?: Date;
  endDate?: Date; // Can be undefined if the project is ongoing
  isPublished: boolean; // To control visibility
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Project name is required.'],
    trim: true,
    unique: true, // Assuming project names should be unique
  },
  description: {
    type: String,
    required: [true, 'Project description is required.'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Project category is required.'],
    enum: {
      values: PROJECT_CATEGORIES,
      message: '{VALUE} is not a supported project category.'
    }
  },
  status: {
    type: String,
    required: [true, 'Project status is required.'],
    enum: {
      values: PROJECT_STATUSES,
      message: '{VALUE} is not a supported project status.'
    },
    default: 'Planning', // Default status when a project is created
  },
  technologiesUsed: [{
    type: String,
    trim: true,
  }],
  projectUrl: {
    type: String,
    trim: true,
    // Basic URL validation (can be enhanced with a custom validator or a library)
    match: [/^(ftp|http|https):\/\/[^ \""]+$/, 'Project URL must be a valid URL.']
  },
  repositoryUrl: {
    type: String,
    trim: true,
    match: [/^(ftp|http|https):\/\/[^ \""]+$/, 'Repository URL must be a valid URL.']
  },
  imageUrl: {
    type: String,
    trim: true,
    match: [/^(ftp|http|https):\/\/[^ \""]+$/, 'Image URL must be a valid URL.']
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  isPublished: {
    type: Boolean,
    default: false, // Draft by default
  },
  // You could add a field for related skills, e.g., by referencing Skill model IDs
  // relatedSkills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Prevent model overwrite in Next.js HMR
const Project: Model<IProject> = models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
