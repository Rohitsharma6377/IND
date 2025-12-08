import React from 'react';

export default function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${active
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
        >
            {icon} {label}
        </button>
    );
}
