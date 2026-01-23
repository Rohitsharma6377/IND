import React, { useState } from 'react';
import { ChevronDown } from './Icons';

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}) {
  const [openItems, setOpenItems] = useState(defaultOpen);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          icon={item.icon}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

// Single Accordion Item
export function AccordionItem({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-4 pt-0 text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}

// FAQ Accordion (styled differently)
export function FAQAccordion({
  items,
  className = '',
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`
            bg-white rounded-xl border transition-all duration-200
            ${openIndex === index ? 'border-indigo-200 shadow-lg' : 'border-gray-200'}
          `}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <span className="font-semibold text-gray-900">{item.question}</span>
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                transition-colors duration-200
                ${openIndex === index ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}
              `}
            >
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
          <div
            className={`
              overflow-hidden transition-all duration-300 ease-in-out
              ${openIndex === index ? 'max-h-96' : 'max-h-0'}
            `}
          >
            <div className="px-5 pb-5 text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Collapsible (single toggle)
export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  );
}
