import { NextRequest, NextResponse } from 'next/server';
import { getBlogs } from '@/lib/blog';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs - Fetches blog posts
// Query param ?status=published to fetch only published blogs, sorted by publishedAt
// Query param ?limit=N to limit the number of results
// Otherwise, fetches all blogs (for admin), sorted by updatedAt
export async function GET(request: NextRequest) { // Changed to NextRequest
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || undefined;
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const blogs = await getBlogs({ status, limit });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Error fetching blogs', error: errorMessage }, { status: 500 });
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
