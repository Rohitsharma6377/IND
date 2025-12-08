import React from 'react';

export default function StatCard({ value, label, color = 'purple' }) {
    const colors = {
        purple: 'text-purple-600',
        blue: 'text-blue-600',
        green: 'text-green-600',
        orange: 'text-orange-600'
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className={`text-2xl font-bold ${colors[color]}`}>{value}</div>
            <div className="text-xs text-gray-600">{label}</div>
        </div>
    );
}
