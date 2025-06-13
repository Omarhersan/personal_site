import React, { useState, useEffect } from 'react';

interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  imageUrl?: string;
  slug: string;
}

interface BlogPostFormProps {
  post?: BlogPost;
  onSubmit: (post: BlogPost, imageFile?: File | null) => void; // Modified to include imageFile
  onCancel?: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [author, setAuthor] = useState(post?.author || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [imageFile, setImageFile] = useState<File | null>(null); // New state for the image file
  const [imagePreview, setImagePreview] = useState<string | null>(post?.imageUrl || null); // New state for image preview

  // Effect to update form fields when 'post' prop changes (for editing)
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setContent(post.content || '');
      setAuthor(post.author || '');
      setTags(post.tags?.join(', ') || '');
      setImageUrl(post.imageUrl || '');
      setSlug(post.slug || '');
      setImageFile(null); // Reset file input when editing a new post
      setImagePreview(post.imageUrl || null);
    } else {
      // Reset form for new post
      setTitle('');
      setContent('');
      setAuthor('');
      setTags('');
      setImageUrl('');
      setSlug('');
      setImageFile(null);
      setImagePreview(null);
    }
  }, [post]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImageUrl(''); // Clear existing imageUrl if a new file is selected
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(post?.imageUrl || null); // Revert to initial image if selection is cleared
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Slug generation logic
    let generatedFromTitle = title.trim().toLowerCase()
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '')   // Remove non-alphanumeric characters (allowing hyphens)
      .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens

    let currentSlugInput = slug.trim(); // User's input for slug, trimmed
    let finalSlugValue: string;

    if (currentSlugInput) {
      // Sanitize user-provided slug as well to ensure it's clean
      const sanitizedUserInputSlug = currentSlugInput.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/^-+|-+$/g, '');
      
      if (sanitizedUserInputSlug) {
        finalSlugValue = sanitizedUserInputSlug;
      } else {
        // If user input slug becomes empty after sanitization, fallback to title-generated
        finalSlugValue = generatedFromTitle;
      }
    } else {
      // No user input for slug, use the one generated from title
      finalSlugValue = generatedFromTitle;
    }

    // If, after all attempts, the slug is still empty (e.g., title was "!!!" or similar, and no valid user slug)
    // then create a unique fallback.
    if (!finalSlugValue) {
      finalSlugValue = `post-${Date.now()}`;
    }
    // End of new slug generation logic

    onSubmit(
      {
        _id: post?._id,
        title,
        content,
        author,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        imageUrl: imageFile ? undefined : imageUrl, // Let parent decide final URL based on upload
        slug: finalSlugValue, // Use the new robust slug
      },
      imageFile // Pass the imageFile to the parent handler
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

       <div>
        <label htmlFor="postSlug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Slug (URL-friendly-name)
        </label>
        <input
          type="text"
          id="postSlug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="auto-generated-if-left-blank"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="postContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content (Markdown supported)
        </label>
        <textarea
          id="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="postAuthor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Author
        </label>
        <input
          type="text"
          id="postAuthor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="postImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL (or upload new image below)
        </label>
        <input
          type="url"
          id="postImageUrl"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImageFile(null); // Clear file if URL is manually changed
            setImagePreview(e.target.value); // Show preview from URL
          }}
          placeholder="https://example.com/image.jpg"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="postImageFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload New Image
        </label>
        <input
          type="file"
          id="postImageFile"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 dark:file:bg-indigo-900
                     file:text-indigo-700 dark:file:text-indigo-300
                     hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
        />
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Image Preview:</p>
            <img src={imagePreview} alt="Preview" className="mt-2 max-h-48 w-auto rounded border border-gray-300 dark:border-gray-600" />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="postTags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="postTags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {post?._id ? 'Update' : 'Create'} Post
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
