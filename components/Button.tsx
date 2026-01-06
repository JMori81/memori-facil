import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm",
    secondary: "bg-blue-900 hover:bg-blue-800 text-white focus:ring-blue-900 shadow-sm",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 bg-white focus:ring-gray-200",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};