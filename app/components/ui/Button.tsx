import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string; // If the button should act as a link
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', href, className, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline: "bg-transparent hover:bg-gray-100 text-blue-600 border border-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ''}`;
  if (href) {
    return (
      <a href={href} className={`${combinedClassName} inline-block text-center`}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
