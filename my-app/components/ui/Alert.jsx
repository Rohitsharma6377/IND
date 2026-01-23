import React from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from './Icons';

const variants = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: <CheckCircle className="text-green-500" size={20} />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: <AlertCircle className="text-red-500" size={20} />,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: <AlertTriangle className="text-yellow-500" size={20} />,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: <Info className="text-blue-500" size={20} />,
  },
};

export default function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  actions,
  className = '',
}) {
  const v = variants[variant];

  return (
    <div className={`${v.bg} ${v.border} border rounded-xl p-4 ${className}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {icon || v.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold ${v.text} mb-1`}>{title}</h4>
          )}
          <div className={`text-sm ${v.text} opacity-90`}>{children}</div>
          {actions && (
            <div className="mt-3 flex gap-2">{actions}</div>
          )}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ${v.text} opacity-60 hover:opacity-100 transition-opacity`}
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

// Inline Alert (compact)
export function InlineAlert({
  variant = 'info',
  children,
  className = '',
}) {
  const v = variants[variant];

  return (
    <div className={`flex items-center gap-2 text-sm ${v.text} ${className}`}>
      {v.icon}
      <span>{children}</span>
    </div>
  );
}

// Banner Alert (full width)
export function BannerAlert({
  variant = 'info',
  children,
  dismissible = false,
  onDismiss,
  action,
  className = '',
}) {
  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-600',
  };

  return (
    <div className={`${bgColors[variant]} text-white py-3 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <p className="text-sm font-medium text-center">{children}</p>
        {action && (
          <button className="flex-shrink-0 text-sm font-semibold underline hover:no-underline">
            {action}
          </button>
        )}
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 opacity-80 hover:opacity-100"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
