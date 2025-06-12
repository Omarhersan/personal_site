import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Define possible categories/tags for blogs - adapt as needed
export const BLOG_TAGS = ['Technology', 'Programming', 'Web Development', 'Data Science', 'Tutorial', 'Opinion', 'News', 'Lifestyle', 'Other'] as const;
export type BlogTag = typeof BLOG_TAGS[number];

export interface IBlog extends Document {
  title: string;
  content: string;
  author?: string; // Optional author name
  tags?: BlogTag[];
  imageUrl?: string; // Optional cover image for the blog post
  isPublished: boolean; // To control visibility
  publishedAt?: Date; // Date when the blog was published
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Blog content is required.'],
  },
  author: {
    type: String,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
    enum: {
        values: BLOG_TAGS,
        message: '{VALUE} is not a supported blog tag.'
    }
  }],
  imageUrl: {
    type: String,
    trim: true,
    match: [/^(ftp|http|https):\/\/[^ \""]+$/, 'Image URL must be a valid URL.']
  },
  isPublished: {
    type: Boolean,
    default: false, // Draft by default
  },
  publishedAt: {
    type: Date,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Pre-save hook to set publishedAt date when blog is published
BlogSchema.pre<IBlog>('save', function(next) {
  // If publishing (isPublished becomes true and was modified), set publishedAt if not already set
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

const Blog: Model<IBlog> = models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
