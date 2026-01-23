import React, { useState } from 'react';

export default function Tabs({
  tabs,
  defaultTab = 0,
  onChange,
  variant = 'default',
  fullWidth = false,
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  const variants = {
    default: {
      container: 'bg-gray-100 p-1 rounded-xl',
      tab: 'px-4 py-2 rounded-lg text-sm font-medium transition-all',
      active: 'bg-white text-gray-900 shadow-sm',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
    underline: {
      container: 'border-b border-gray-200',
      tab: 'px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px',
      active: 'text-indigo-600 border-indigo-600',
      inactive: 'text-gray-600 hover:text-gray-900 border-transparent',
    },
    pills: {
      container: 'flex gap-2',
      tab: 'px-4 py-2 rounded-full text-sm font-medium transition-all',
      active: 'bg-indigo-600 text-white',
      inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    },
  };

  const v = variants[variant];

  return (
    <div className={className}>
      <div className={`flex ${fullWidth ? 'w-full' : ''} ${v.container}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`
              ${v.tab}
              ${activeTab === index ? v.active : v.inactive}
              ${fullWidth ? 'flex-1' : ''}
            `}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${activeTab === index ? 'bg-white/20' : 'bg-gray-200'}
                `}>
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}

// Tab Panel (for manual tab content management)
export function TabPanel({ children, active }) {
  if (!active) return null;
  return <div className="animate-fade-in">{children}</div>;
}

// Vertical Tabs
export function VerticalTabs({
  tabs,
  defaultTab = 0,
  onChange,
  className = '',
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div className={`flex gap-6 ${className}`}>
      <div className="flex flex-col gap-1 min-w-[200px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all
              ${activeTab === index 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            {tab.icon && (
              <span className={activeTab === index ? 'text-indigo-600' : 'text-gray-400'}>
                {tab.icon}
              </span>
            )}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}

// Segmented Control
export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  };

  return (
    <div className={`inline-flex bg-gray-100 p-1 rounded-xl ${className}`}>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(option.value)}
          className={`
            ${sizes[size]} rounded-lg font-medium transition-all
            ${value === option.value 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
