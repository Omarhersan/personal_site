import { NextResponse } from 'next/server';

// Dummy data store
let blogs = [
  { id: '1', title: 'First Blog Post', content: 'Content of the first post' },
  { id: '2', title: 'Second Blog Post', content: 'Content of the second post' },
];

export async function GET(request: Request) {
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    if (!newBlog.title || !newBlog.content) {
      return NextResponse.json({ message: 'Missing title or content' }, { status: 400 });
    }
    const blog = { id: String(blogs.length + 1), ...newBlog };
    blogs.push(blog);
    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating blog post', error }, { status: 500 });
  }
}
