import React from 'react';

export default function FeatureCard({ title, desc, delay = 0 }) {
  return (
    <div
      className={
        "rounded-xl border border-gray-200 bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow " +
        "animate-fade-in-up"
      }
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}
