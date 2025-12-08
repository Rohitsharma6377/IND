import React from 'react';

export default function EmptyState({ icon, title, message }) {
    return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <p className="text-gray-500">{message}</p>
        </div>
    );
}
