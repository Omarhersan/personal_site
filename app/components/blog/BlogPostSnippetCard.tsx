import React from 'react';
import Link from 'next/link';

export interface BlogPostSnippet {
  slug: string; // For the URL, e.g., /blog/my-first-post
  title: string;
  date: string; // e.g., "June 11, 2024"
  excerpt: string;
  category?: string; // Optional: e.g., "Technical", "Fun Stuff"
}

interface BlogPostSnippetCardProps {
  post: BlogPostSnippet;
}

const BlogPostSnippetCard: React.FC<BlogPostSnippetCardProps> = ({ post }) => {
  return (
    <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
      {post.category && (
        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">{post.category}</p>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow">{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline self-start mt-auto">
        Read More &rarr;
      </Link>
    </article>
  );
};

export default BlogPostSnippetCard;
