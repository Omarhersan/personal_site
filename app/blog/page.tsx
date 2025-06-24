import React from 'react';
import BlogPostSnippetCard, { BlogPost } from '../components/blog/BlogPostSnippetCard';
import { getBlogs } from '@/lib/blog';

const BlogPage = async () => {
  const allPosts = await getBlogs({ status: 'published' });

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Omar's Blog
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Thoughts on web development, data science, and other musings.
        </p>
      </header>

      {allPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post: BlogPost) => (
            <BlogPostSnippetCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">No blog posts published yet.</p>
          <p className="text-gray-500 dark:text-gray-400">Please check back later!</p>
        </div>
      )}
      {/* You might want to add pagination here if you have many posts */}
    </div>
  );
};

export default BlogPage;
