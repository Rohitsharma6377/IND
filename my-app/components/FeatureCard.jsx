import React from 'react';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="text-4xl sm:text-5xl mb-4">{icon}</div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
    </div>
  );
}
