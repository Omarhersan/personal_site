import { NextResponse, NextRequest } from 'next/server';
import Blog from '@/models/Blog'; // Import the Blog model
import mongoose from 'mongoose';
import { withDb, type NextRouteContext, type AppRouterHandler } from '@/lib/apiHelpers'; // Using the withDb helper

// Define the actual shape of the resolved params for this route
type BlogRouteParams = { id: string };

// GET a single blog post by ID or slug
const getHandler: AppRouterHandler<NextRequest, BlogRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params

  let blog;
  if (mongoose.Types.ObjectId.isValid(id)) {
    blog = await Blog.findById(id);
  } else {
    blog = await Blog.findOne({ slug: id });
  }

  if (!blog) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
};
export const GET = withDb(getHandler);

// PUT (update) a blog post by ID or slug
const putHandler: AppRouterHandler<NextRequest, BlogRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params
  const updatedData = await request.json();

  let blog;
  if (mongoose.Types.ObjectId.isValid(id)) {
    blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
  } else {
    blog = await Blog.findOneAndUpdate({ slug: id }, updatedData, { new: true, runValidators: true });
  }

  if (!blog) {
    return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
  }
  return NextResponse.json(blog);
};
export const PUT = withDb(putHandler);

// DELETE a blog post by ID or slug
const deleteHandler: AppRouterHandler<NextRequest, BlogRouteParams> = async (request, context) => {
  const { id } = await context.params; // Await the promise to get params

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
};
export const DELETE = withDb(deleteHandler);
