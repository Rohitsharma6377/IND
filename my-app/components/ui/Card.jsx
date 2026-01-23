import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  gradient = false,
  padding = 'md',
  glass = false,
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = glass 
    ? 'bg-white/60 backdrop-blur-xl border-white/30' 
    : 'bg-white border-gray-100';

  return (
    <div
      className={`
        rounded-2xl border shadow-sm
        ${baseStyles}
        ${hover ? 'hover:shadow-xl hover:shadow-gray-900/5 hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer' : ''}
        ${gradient ? 'bg-gradient-to-br from-white via-white to-gray-50/80' : ''}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

// Card Header
export function CardHeader({ children, className = '', actions }) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div>{children}</div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Card Title
export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-xl font-bold text-gray-900 tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

// Card Description
export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-gray-500 mt-1.5 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

// Card Content
export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Card Footer
export function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-6 pt-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

// Feature Card with Icon
export function FeatureCard({
  icon,
  title,
  description,
  href,
  className = '',
}) {
  const content = (
    <div className={`group relative p-6 bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-transparent to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/50 rounded-2xl transition-all duration-300"></div>
      
      <div className="relative">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 mb-4 group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-200">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
        {href && (
          <div className="mt-4 flex items-center gap-1 text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
            Learn more
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return content;
}

// Stats Card
export function StatsCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  className = '',
}) {
  const changeColors = {
    positive: 'text-emerald-600 bg-emerald-50 border border-emerald-100',
    negative: 'text-red-600 bg-red-50 border border-red-100',
    neutral: 'text-gray-600 bg-gray-50 border border-gray-100',
  };

  return (
    <div className={`p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-gray-500">
            {icon}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{value}</div>
      {change && (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${changeColors[changeType]}`}>
          {changeType === 'positive' && (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          )}
          {changeType === 'negative' && (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          )}
          {change}
        </span>
      )}
    </div>
  );
}

// Image Card
export function ImageCard({
  image,
  title,
  description,
  tags = [],
  actions,
  className = '',
}) {
  return (
    <div className={`group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {actions && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            {actions}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-500 mb-4">{description}</p>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
