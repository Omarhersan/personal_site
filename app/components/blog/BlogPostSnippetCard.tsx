import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image

// Define the BlogPost interface based on the IBlog model
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string; // Assuming author is a string for now, adjust if it's an object
  tags?: string[];
  imageUrl?: string;
  isPublished: boolean;
  publishedAt?: string; // Dates will be strings after API fetch and JSON parsing
  createdAt: string;
  updatedAt: string;
}

interface BlogPostSnippetCardProps {
  post: BlogPost;
}

const BlogPostSnippetCard: React.FC<BlogPostSnippetCardProps> = ({ post }) => {
  // Helper to format date, e.g., "June 11, 2024"
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper to create an excerpt from content
  const createExcerpt = (htmlContent: string, length: number = 150) => {
    // Strip HTML tags (basic version)
    const textContent = htmlContent.replace(/<[^>]+>/g, '');
    if (textContent.length <= length) {
      return textContent;
    }
    return textContent.substring(0, length) + '...';
  };

  const excerpt = createExcerpt(post.content);
  const displayDate = formatDate(post.publishedAt);
  const category = post.tags && post.tags.length > 0 ? post.tags[0] : undefined;

  return (
    <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
      {post.imageUrl && ( // Display image if available
        <div className="mb-4 relative h-40 w-full"> {/* Ensure parent has relative positioning and dimensions */}
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // <<< ADD THIS LINE
            style={{ objectFit: "cover" }} // Replaces objectFit="cover"
            className="rounded-md"
          />
        </div>
      )}
      {category && (
        <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">{category}</p>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{displayDate}</p>
      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-grow">{excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline self-start mt-auto">
        Read More &rarr;
      </Link>
    </article>
  );
};

export default BlogPostSnippetCard;
