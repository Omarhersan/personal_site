import { NextRequest, NextResponse } from 'next/server'; // Changed import
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET /api/blogs - Fetches blog posts
// Query param ?status=published to fetch only published blogs, sorted by publishedAt
// Query param ?limit=N to limit the number of results
// Otherwise, fetches all blogs (for admin), sorted by updatedAt
export async function GET(request: NextRequest) { // Changed to NextRequest
  try {
    await dbConnect();
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const limitParam = url.searchParams.get('limit');

    let query: any = {};
    let sortOrder: any = { updatedAt: -1 }; // Default sort for admin (all posts)

    if (status === 'published') {
      query = { isPublished: true };
      sortOrder = { publishedAt: -1 }; // Sort by publishedAt for public view
    }

    let blogsQuery = Blog.find(query).sort(sortOrder);

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        blogsQuery = blogsQuery.limit(limit);
      }
    }

    const blogs = await blogsQuery;
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Ensure error is properly typed or handled if it's not a standard Error object
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
