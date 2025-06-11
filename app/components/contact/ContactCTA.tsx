import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

// Placeholder icons - consider using a library like react-icons
const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.869-.013-1.703-2.782.602-3.369-1.343-3.369-1.343-.455-1.156-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.335-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.549 9.549 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.698 1.026 1.591 1.026 2.682 0 3.842-2.338 4.685-4.565 4.935.359.309.679.92.679 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.578.688.48C19.138 20.162 22 16.416 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

const ContactCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Let's Connect!
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. 
          Feel free to reach out if you'd like to build something amazing together or just want to chat!
        </p>
        
        <div className="flex justify-center space-x-6 mb-10">
          <a 
            href="#" // Replace with your LinkedIn URL
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon />
          </a>
          <a 
            href="#" // Replace with your GitHub URL
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <GitHubIcon />
          </a>
          {/* Add other social links here e.g., Twitter, Email */}
        </div>

        <Link href="/contact">
          <Button variant="primary"> {/* Assuming your Button might have a size prop */}
            Get In Touch
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;
