import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Me</h1>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          I'd love to hear from you! Whether you have a question about my projects,
          a potential opportunity, or just want to say hi, feel free to reach out.
        </p>
        
        {/* Basic Contact Info Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-sky-500 mb-3">Get in Touch</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Email:</strong> <a href="mailto:youremail@example.com" className="hover:underline">youremail@example.com</a>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/yourprofile</a>
          </p>
          {/* Add other contact methods like GitHub, Twitter, etc. */}
        </div>

        {/* Simple Contact Form Placeholder (requires form handling logic) */}
        <div>
          <h2 className="text-2xl font-semibold text-sky-500 mb-4">Send a Message</h2>
          <form action="#" method="POST"> { /* Replace # with your form endpoint */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="Your Name" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="you@example.com" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="Your message..."></textarea>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
