import React from 'react';
export default function Button({ children, ...props }) {
  return <button className="px-4 py-2 bg-indigo-600 text-white rounded" {...props}>{children}</button>;
}