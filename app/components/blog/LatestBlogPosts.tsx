import React from 'react';
import Link from 'next/link';
import BlogPostSnippetCard, { BlogPost } from './BlogPostSnippetCard';
import Button from '../ui/Button';

async function getLatestBlogPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${apiUrl}/api/blogs?status=published&limit=3`, {
      next: { revalidate: 60 }, // Changed from cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`Failed to fetch latest blog posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const posts: BlogPost[] = await res.json();
    return posts;
  } catch (error) {
    console.error('Error fetching latest blog posts:', error);
    return [];
  }
}

const LatestBlogPosts: React.FC = async () => {
  const latestPosts = await getLatestBlogPosts();

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Latest from the Blog
        </h2>
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogPostSnippetCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">No blog posts yet. Stay tuned!</p>
        )}
        {latestPosts.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline">View All Posts</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogPosts;
