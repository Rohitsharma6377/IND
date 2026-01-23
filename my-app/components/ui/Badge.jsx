import React from 'react';

const variants = {
  default: 'bg-gray-100 text-gray-700 border border-gray-200/50',
  primary: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  secondary: 'bg-purple-50 text-purple-700 border border-purple-100',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  warning: 'bg-amber-50 text-amber-700 border border-amber-100',
  danger: 'bg-red-50 text-red-700 border border-red-100',
  info: 'bg-sky-50 text-sky-700 border border-sky-100',
  outline: 'bg-transparent border border-gray-300 text-gray-600',
  gradient: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-sm',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs font-semibold',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  dotColor = 'bg-current',
  removable = false,
  onRemove,
  icon,
  className = '',
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 ml-0.5 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

// Status Badge with pulse animation
export function StatusBadge({ status = 'online', className = '' }) {
  const statusConfig = {
    online: { color: 'bg-green-500', label: 'Online' },
    offline: { color: 'bg-gray-400', label: 'Offline' },
    away: { color: 'bg-yellow-500', label: 'Away' },
    busy: { color: 'bg-red-500', label: 'Busy' },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm text-gray-600 ${className}`}>
      <span className="relative flex h-2 w-2">
        {status === 'online' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${config.color} opacity-75`} />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.color}`} />
      </span>
      {config.label}
    </span>
  );
}

// Notification Badge
export function NotificationBadge({ count = 0, max = 99, className = '' }) {
  if (count === 0) return null;
  
  const displayCount = count > max ? `${max}+` : count;

  return (
    <span
      className={`
        inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 
        text-xs font-bold text-white bg-red-500 rounded-full
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
}
