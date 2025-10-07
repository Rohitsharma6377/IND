import React from 'react';

export default function Card({ 
  className = '',
  variant = 'default',
  size = 'md',
  children,
  ...props 
}) {
  const base = 'card';
  const variantClass = variant === 'primary' ? 'bg-blue-600 text-white' : variant === 'secondary' ? 'bg-gray-100' : '';
  const sizeClass = size === 'sm' ? 'text-sm px-2 py-1' : size === 'lg' ? 'text-lg px-4 py-3' : 'text-base px-3 py-2';
  return (
    <div className={`${base} ${variantClass} ${sizeClass} ${className}`} role="group" {...props}>
      <h2 className="text-2xl font-semibold mb-4">Card</h2>
      {children}
    </div>
  );
}

// Optional: Add default props
Card.defaultProps = {
  className: ''
};
