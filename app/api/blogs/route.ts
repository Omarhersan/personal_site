import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog'; // Reverted to alias import

// GET /api/blogs - Fetches all blog posts
export async function GET(request: Request) {
  try {
    await dbConnect();
    // Optionally, sort by publishedAt or createdAt, and filter by isPublished: true for public view
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }); 
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Error fetching blogs', error }, { status: 500 });
  }
}

// POST /api/blogs - Creates a new blog post
export async function POST(request: Request) {
  try {
    await dbConnect();
    const newBlogData = await request.json();

    // Basic validation - title and content are essential.
    if (!newBlogData.title || !newBlogData.content) {
      return NextResponse.json({ message: 'Missing title or content' }, { status: 400 });
    }

    // Slug is no longer used, so no specific logic for it here.
    // If isPublished is true and publishedAt is not set, the model's pre-save hook will set it.
    const blog = new Blog(newBlogData);
    await blog.save();
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) { // Explicitly type error
    console.error('Error creating blog post:', error);
    // Removed duplicate key error handling for slug as it's no longer a field
    // General Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ message: 'Validation Error', errors: messages }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating blog post', error: error.message || error }, { status: 500 });
  }
}
