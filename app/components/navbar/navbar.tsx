import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Portfolio
        </Link>
        <div>
          <Link href="/about" className="px-3 hover:text-gray-300">
            About
          </Link>
          <Link href="/projects" className="px-3 hover:text-gray-300">
            Projects
          </Link>
          <Link href="/blog" className="px-3 hover:text-gray-300"> {/* Added Blog link */}
            Blog
          </Link>
          <Link href="/contact" className="px-3 hover:text-gray-300">
            Contact
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;