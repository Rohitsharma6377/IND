import React from 'react';

export default function Progress({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  animated = false,
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const variants = {
    primary: 'bg-indigo-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`
            ${sizes[size]} ${variants[variant]} rounded-full
            transition-all duration-500 ease-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress
export function CircularProgress({
  value = 0,
  max = 100,
  size = 100,
  strokeWidth = 8,
  variant = 'primary',
  showLabel = true,
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variants = {
    primary: 'text-indigo-600',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${variants[variant]} transition-all duration-500 ease-out`}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-lg font-semibold text-gray-900">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

// Steps Progress
export function Steps({
  steps,
  currentStep = 0,
  variant = 'default',
  className = '',
}) {
  const variants = {
    default: {
      active: 'bg-indigo-600 text-white',
      completed: 'bg-indigo-600 text-white',
      pending: 'bg-gray-200 text-gray-500',
      line: 'bg-indigo-600',
      lineInactive: 'bg-gray-200',
    },
    numbered: {
      active: 'bg-indigo-600 text-white',
      completed: 'bg-green-500 text-white',
      pending: 'bg-gray-200 text-gray-500',
      line: 'bg-green-500',
      lineInactive: 'bg-gray-200',
    },
  };

  const v = variants[variant];

  return (
    <div className={`flex items-center ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                transition-all duration-300
                ${index < currentStep ? v.completed : index === currentStep ? v.active : v.pending}
              `}
            >
              {index < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            {step.label && (
              <span className={`mt-2 text-sm font-medium ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.label}
              </span>
            )}
          </div>
          
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 rounded ${index < currentStep ? v.line : v.lineInactive}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Skeleton Loader
export function Skeleton({
  width,
  height,
  circle = false,
  className = '',
}) {
  return (
    <div
      className={`
        animate-pulse bg-gray-200
        ${circle ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      style={{ width, height }}
    />
  );
}

// Skeleton Text
export function SkeletonText({
  lines = 3,
  className = '',
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={16}
          className={index === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  );
}

// Loading Spinner
export function Spinner({
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <svg
      className={`animate-spin ${sizes[size]} text-indigo-600 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Loading Dots
export function LoadingDots({ className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
