import { NextResponse } from 'next/server';

// Dummy data store
let blogs = [
  { id: '1', title: 'First Blog Post', content: 'Content of the first post' },
  { id: '2', title: 'Second Blog Post', content: 'Content of the second post' },
];

const findBlog = (id: string) => blogs.find(b => b.id === id);

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const blog = findBlog(params.id);
  if (!blog) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const blogIndex = blogs.findIndex(b => b.id === params.id);
  if (blogIndex === -1) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  try {
    const updatedData = await request.json();
    if (!updatedData.title || !updatedData.content) {
      return NextResponse.json({ message: 'Missing title or content' }, { status: 400 });
    }
    blogs[blogIndex] = { ...blogs[blogIndex], ...updatedData };
    return NextResponse.json(blogs[blogIndex]);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating blog post', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const blogIndex = blogs.findIndex(b => b.id === params.id);
  if (blogIndex === -1) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  const deletedBlog = blogs.splice(blogIndex, 1);
  return NextResponse.json({ message: 'Blog post deleted', blog: deletedBlog[0] });
}
