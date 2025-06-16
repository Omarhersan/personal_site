import { NextResponse, NextRequest } from 'next/server';
import Blog from '@/models/Blog'; // Import the Blog model
import mongoose from 'mongoose';
import { withDb } from '@/lib/apiHelpers'; // Using the withDb helper

// GET a single blog post by ID or slug
export const GET = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params; // id can be ObjectId or slug

  let blog;
  if (mongoose.Types.ObjectId.isValid(id)) {
    blog = await Blog.findById(id);
  } else {
    // If not a valid ObjectId, assume it's a slug
    blog = await Blog.findOne({ slug: id });
  }

  if (!blog) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  // Optional: Check if the blog is published if this is for public view
  // if (!blog.isPublished) {
  //   return NextResponse.json({ message: 'Blog post not found or not published' }, { status: 404 });
  // }
  return NextResponse.json(blog);
});

// PUT (update) a blog post by ID or slug
export const PUT = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = await params; // id can be ObjectId or slug
  const updatedData = await request.json();
  console.log("Updated data received:", updatedData); // <<< ADD THIS LINE

  let blog;
  if (mongoose.Types.ObjectId.isValid(id)) {
    blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
  } else {
    blog = await Blog.findOneAndUpdate({ slug: id }, updatedData, { new: true, runValidators: true });
  }

  console.log("Updated blog object:", blog); // <<< ADD THIS LINE

  if (!blog) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
});

// DELETE a blog post by ID or slug
export const DELETE = withDb(async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params; // id can be ObjectId or slug

  let deletedBlog;
  if (mongoose.Types.ObjectId.isValid(id)) {
    deletedBlog = await Blog.findByIdAndDelete(id);
  } else {
    deletedBlog = await Blog.findOneAndDelete({ slug: id });
  }

  if (!deletedBlog) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Blog post deleted', blog: deletedBlog });
});
