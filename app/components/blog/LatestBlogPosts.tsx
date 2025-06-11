import React from 'react';
import Link from 'next/link';
import BlogPostSnippetCard, { BlogPostSnippet } from './BlogPostSnippetCard';
import Button from '../ui/Button';

// Sample Blog Post Data - Replace with your actual blog posts
// In a real app, this would likely come from a CMS or markdown files
const sampleBlogPosts: BlogPostSnippet[] = [
  {
    slug: 'my-first-data-science-project',
    title: 'My First Dive into a Real-World Data Science Project',
    date: 'June 5, 2025',
    excerpt: 'An overview of the challenges and learnings from my initial foray into applying data science techniques to a practical problem.',
    category: 'Data Science',
  },
  {
    slug: 'fun-with-generative-art',
    title: 'Exploring Generative Art with p5.js',
    date: 'May 28, 2025',
    excerpt: 'Just sharing some cool visual patterns I created while playing around with p5.js. A fun break from serious coding!',
    category: 'Fun Stuff',
  },
  {
    slug: 'nextjs-14-first-impressions',
    title: 'First Impressions: Developing with Next.js 14',
    date: 'May 15, 2025',
    excerpt: 'My thoughts on the latest features in Next.js 14 and how they are impacting my web development workflow.',
    category: 'Web Development',
  },
  {
    slug: 'a-guide-to-effective-data-storytelling',
    title: 'A Quick Guide to Effective Data Storytelling',
    date: 'April 30, 2025',
    excerpt: 'Transforming raw data into compelling narratives is a crucial skill. Here are some tips I\'ve picked up.',
    category: 'Data Science',
  },
];

const LatestBlogPosts: React.FC = () => {
  // Display the 3 most recent posts on the homepage
  const postsToDisplay = sampleBlogPosts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Latest from the Blog
        </h2>
        {postsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToDisplay.map((post) => (
              <BlogPostSnippetCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">No blog posts yet. Stay tuned!</p>
        )}
        {sampleBlogPosts.length > 3 && (
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
