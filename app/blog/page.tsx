import React from 'react';
import Link from 'next/link';

// Sample blog post data - you'll likely want to move this to a separate file or fetch it from an API
const posts = [
  {
    id: 'first-post',
    title: 'My First Blog Post',
    date: '2025-06-11',
    excerpt: 'This is a short summary of my first blog post. More to come!',
  },
  {
    id: 'second-post',
    title: 'Exploring Next.js Features',
    date: '2025-06-10',
    excerpt: 'A dive into some of the cool features Next.js offers for web development.',
  },
  // Add more posts as needed
];

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-sky-500 mb-2">
              <Link href={`/blog/${post.id}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.excerpt}
            </p>
            <Link href={`/blog/${post.id}`} className="text-sky-600 hover:text-sky-700 font-medium">
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
      {/* You might want to add pagination here if you have many posts */}
    </div>
  );
};

export default BlogPage;
