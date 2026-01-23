import React from 'react';
import { User } from './Icons';

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const colors = {
  gray: 'bg-gray-200 text-gray-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  purple: 'bg-purple-100 text-purple-600',
  pink: 'bg-pink-100 text-pink-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600',
};

export default function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  color = 'indigo',
  rounded = 'full',
  status,
  className = '',
  ...props
}) {
  const roundedClasses = {
    full: 'rounded-full',
    lg: 'rounded-2xl',
    md: 'rounded-xl',
    sm: 'rounded-lg',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  return (
    <div className={`relative inline-flex ${className}`} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={`${sizes[size]} ${roundedClasses[rounded]} object-cover`}
        />
      ) : name ? (
        <div
          className={`
            ${sizes[size]} ${roundedClasses[rounded]} ${colors[color]}
            flex items-center justify-center font-semibold
          `}
        >
          {getInitials(name)}
        </div>
      ) : (
        <div
          className={`
            ${sizes[size]} ${roundedClasses[rounded]} ${colors[color]}
            flex items-center justify-center
          `}
        >
          <User size={size === 'xs' ? 12 : size === 'sm' ? 16 : 20} />
        </div>
      )}

      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full ring-2 ring-white
            ${statusColors[status]}
            ${size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'}
          `}
        />
      )}
    </div>
  );
}

// Avatar Group
export function AvatarGroup({
  avatars,
  max = 5,
  size = 'md',
  className = '',
}) {
  const displayed = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayed.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            ${sizes[size]} rounded-full bg-gray-200 text-gray-600
            flex items-center justify-center font-semibold ring-2 ring-white
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

// Avatar with Badge
export function AvatarWithBadge({
  avatar,
  badge,
  position = 'top-right',
  className = '',
}) {
  const positions = {
    'top-right': 'top-0 right-0 -translate-y-1/4 translate-x-1/4',
    'top-left': 'top-0 left-0 -translate-y-1/4 -translate-x-1/4',
    'bottom-right': 'bottom-0 right-0 translate-y-1/4 translate-x-1/4',
    'bottom-left': 'bottom-0 left-0 translate-y-1/4 -translate-x-1/4',
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      <Avatar {...avatar} />
      <span className={`absolute ${positions[position]}`}>
        {badge}
      </span>
    </div>
  );
}

// User Avatar Card
export function UserCard({
  name,
  email,
  avatar,
  action,
  className = '',
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Avatar src={avatar} name={name} size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{name}</p>
        {email && <p className="text-sm text-gray-500 truncate">{email}</p>}
      </div>
      {action}
    </div>
  );
}
