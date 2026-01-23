import React from 'react';

export default function FeatureCard({ icon, title, description, gradient }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Background Gradient on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${gradient || 'bg-gradient-to-br from-indigo-600 to-purple-600'}`}></div>
      
      {/* Icon Container */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl sm:text-4xl">{icon}</span>
      </div>
      
      {/* Content */}
      <h3 className="relative text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="relative text-gray-600 leading-relaxed text-sm sm:text-base">
        {description}
      </p>
      
      {/* Arrow Icon */}
      <div className="relative mt-4 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
        <span className="text-sm font-semibold">Learn more</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-100/50 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
