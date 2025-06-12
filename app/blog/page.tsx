import React from 'react';
import BlogPostSnippetCard, { BlogPost } from '../components/blog/BlogPostSnippetCard'; // Adjusted import path

async function getAllBlogPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    // Fetch all published blog posts, sorted by publishedAt descending (newest first)
    // The API route.ts for blogs already sorts by publishedAt descending and filters by isPublished=true
    const res = await fetch(`${apiUrl}/api/blogs`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error(`Failed to fetch blog posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const posts: BlogPost[] = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

const BlogPage = async () => {
  const allPosts = await getAllBlogPosts();

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
          {allPosts.map((post) => (
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
