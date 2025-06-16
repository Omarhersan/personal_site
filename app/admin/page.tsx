'use client';

import React, { useState, useEffect } from 'react';
import ProjectForm from '../components/admin/ProjectForm';
import SkillForm from '../components/admin/SkillForm';
import BlogPostForm from '../components/admin/BlogPostForm';

// Define interfaces for the data types
interface Project {
  _id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
}

interface Skill {
  _id?: string;
  name: string;
  level: number;
  category?: string;
}

interface BlogPost {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  tags?: string[];
  imageUrl?: string;
  slug: string;
  isPublished?: boolean; // <<< ADD THIS LINE
}

const AdminPage: React.FC = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showBlogPostForm, setShowBlogPostForm] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>(undefined);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on component mount
  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchBlogPosts();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data || []); // Changed: Use data directly
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setProjects([]); // Clear projects on error
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/skills');
      if (!res.ok) throw new Error('Failed to fetch skills');
      const data = await res.json();
      setSkills(data || []); // Changed: Use data directly
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      const data = await res.json();
      setBlogPosts(data || []); // Changed: Use data directly
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (project: Project) => {
    setLoading(true);
    setError(null);
    const method = project._id ? 'PUT' : 'POST';
    const url = project._id ? `/api/projects/${project._id}` : '/api/projects';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${project._id ? 'update' : 'create'} project`);
      }
      await fetchProjects(); // Refresh the list
      setShowProjectForm(false);
      setEditingProject(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (skill: Skill) => {
    setLoading(true);
    setError(null);
    const method = skill._id ? 'PUT' : 'POST';
    const url = skill._id ? `/api/skills/${skill._id}` : '/api/skills';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${skill._id ? 'update' : 'create'} skill`);
      }
      await fetchSkills();
      setShowSkillForm(false);
      setEditingSkill(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // BlogPost has imageUrl?: string;
  // The form will now also pass an optional imageFile: File
  const handleBlogPostSubmit = async (blogPostData: BlogPost, imageFile?: File | null) => {
    setLoading(true);
    setError(null);
    let finalImageUrl = blogPostData.imageUrl; // Use existing or manually entered URL by default

    try {
      // 1. If a new image file is provided, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();
          throw new Error(errorData.error || 'Image upload failed');
        }
        const uploadResult = await uploadRes.json();
        if (uploadResult.success && uploadResult.url) {
          // Construct absolute URL
          if (typeof window !== 'undefined') { // Ensure window is available (client-side)
            finalImageUrl = new URL(uploadResult.url, window.location.origin).toString();
          } else {
            // Fallback or error if window is not defined (should not happen in this context)
            finalImageUrl = uploadResult.url; // Or handle as an error
            console.warn('window.location.origin is not available, using relative path for image.');
          }
        } else {
          throw new Error('Image upload succeeded but no URL was returned.');
        }
      }

      // 2. Prepare blog post data with the final image URL
      const postToSubmit: BlogPost = {
        ...blogPostData,
        imageUrl: finalImageUrl,
        // isPublished will be part of blogPostData if editing, or default to false if new (handled by model)
      };

      // 3. Create or Update the blog post
      const method = postToSubmit._id ? 'PUT' : 'POST';
      const url = postToSubmit._id ? `/api/blogs/${postToSubmit._id}` : '/api/blogs';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postToSubmit),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Failed to ${postToSubmit._id ? 'update' : 'create'} blog post`);
      }

      await fetchBlogPosts(); // Refresh the list
      setShowBlogPostForm(false);
      setEditingBlogPost(undefined);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during blog post submission');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
    setShowSkillForm(true);
  };

  const handleEditBlogPost = (blogPost: BlogPost) => {
    setEditingBlogPost(blogPost);
    setShowBlogPostForm(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete project');
      }
      await fetchProjects(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete skill');
      }
      await fetchSkills();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete blog post');
      }
      await fetchBlogPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (blogPost: BlogPost) => {
    if (!blogPost._id) return;
    setLoading(true);
    setError(null);
    const newPublishStatus = !blogPost.isPublished;
    try {
      const res = await fetch(`/api/blogs/${blogPost._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newPublishStatus }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update publish status');
      }
      // Refresh the blog posts to show the updated status
      await fetchBlogPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
      {loading && <p className="text-blue-500 text-center mb-4">Loading...</p>}

      {/* Manage Projects Section */}
      <section className="mb-12 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Projects</h2>
          <button
            onClick={() => { setEditingProject(undefined); setShowProjectForm(!showProjectForm); }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
          >
            {showProjectForm && !editingProject ? 'Cancel' : 'Add New Project'}
          </button>
        </div>
        {showProjectForm && (
          <ProjectForm
            project={editingProject}
            onSubmit={handleProjectSubmit}
            onCancel={() => { setShowProjectForm(false); setEditingProject(undefined); }}
          />
        )}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Existing Projects:</h3>
          {projects.length === 0 && !loading && <p className="text-gray-500 dark:text-gray-400">No projects found.</p>}
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{p.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{p.description.substring(0,100)}{p.description.length > 100 ? '...' : ''}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEditProject(p)} className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</button>
                  <button onClick={() => p._id && handleDeleteProject(p._id)} className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Manage Skills Section */}
      <section className="mb-12 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Skills</h2>
          <button
            onClick={() => { setEditingSkill(undefined); setShowSkillForm(!showSkillForm); }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
          >
            {showSkillForm && !editingSkill ? 'Cancel' : 'Add New Skill'}
          </button>
        </div>
        {showSkillForm && (
          <SkillForm
            skill={editingSkill}
            onSubmit={handleSkillSubmit}
            onCancel={() => { setShowSkillForm(false); setEditingSkill(undefined); }}
          />
        )}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Existing Skills:</h3>
          {skills.length === 0 && !loading && <p className="text-gray-500 dark:text-gray-400">No skills found.</p>}
          <ul className="space-y-3">
            {skills.map((s) => (
              <li key={s._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{s.name} ({s.level}%)</p>
                  {s.category && <p className="text-sm text-gray-600 dark:text-gray-300">Category: {s.category}</p>}
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEditSkill(s)} className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</button>
                  <button onClick={() => s._id && handleDeleteSkill(s._id)} className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Manage Blog Posts Section */}
      <section className="mb-12 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Blog Posts</h2>
          <button
            onClick={() => { setEditingBlogPost(undefined); setShowBlogPostForm(!showBlogPostForm); }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium"
          >
            {showBlogPostForm && !editingBlogPost ? 'Cancel' : 'Add New Blog Post'}
          </button>
        </div>
        {showBlogPostForm && (
          <BlogPostForm
            post={editingBlogPost}
            onSubmit={handleBlogPostSubmit}
            onCancel={() => { setShowBlogPostForm(false); setEditingBlogPost(undefined); }}
          />
        )}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Existing Blog Posts:</h3>
          {blogPosts.length === 0 && !loading && <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>}
          <ul className="space-y-3">
            {blogPosts.map((b) => (
              <li key={b._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{b.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Slug: {b.slug}</p>
                  <p className={`text-sm font-medium ${b.isPublished ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                    Status: {b.isPublished ? 'Published' : 'Draft'}
                  </p>
                </div>
                <div className="space-x-2">
                  <button 
                    onClick={() => b._id && handleTogglePublish(b)} 
                    className={`text-sm px-3 py-1 rounded-md ${b.isPublished ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                  >
                    {b.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => handleEditBlogPost(b)} className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Edit</button>
                  <button onClick={() => b._id && handleDeleteBlogPost(b._id)} className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
};

export default AdminPage;
