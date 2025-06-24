import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

interface GetBlogsParams {
  status?: string;
  limit?: number;
}

export async function getBlogs({ status, limit }: GetBlogsParams = {}) {
  try {
    await dbConnect();

    let query: any = {};
    let sortOrder: any = { updatedAt: -1 };

    if (status === 'published') {
      query = { isPublished: true };
      sortOrder = { publishedAt: -1 };
    }

    let blogsQuery = Blog.find(query).sort(sortOrder);

    if (limit) {
      blogsQuery = blogsQuery.limit(limit);
    }

    const blogs = await blogsQuery.lean();

    // Convert ObjectId to string for serialization
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Error fetching blogs from DB:', error);
    return [];
  }
}
