import React from 'react';

const categories = {
    food: { icon: '🍔', color: 'bg-orange-500', name: 'Food' },
    transport: { icon: '🚗', color: 'bg-blue-500', name: 'Transport' },
    shopping: { icon: '🛍️', color: 'bg-pink-500', name: 'Shopping' },
    bills: { icon: '💡', color: 'bg-yellow-500', name: 'Bills' },
    entertainment: { icon: '🎮', color: 'bg-purple-500', name: 'Fun' },
    other: { icon: '📦', color: 'bg-gray-500', name: 'Other' }
};

export default function CategoryCard({ category, amount }) {
    const cat = categories[category];

    return (
        <div className="bg-white rounded-2xl p-4 shadow-md">
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {cat.icon}
                </div>
                <div className="flex-1">
                    <div className="text-xs text-gray-600">{cat.name}</div>
                    <div className="text-lg font-bold text-gray-800">${amount.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}
