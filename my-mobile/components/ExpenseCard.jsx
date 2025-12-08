import React from 'react';

const categories = {
    food: { icon: '🍔', color: 'bg-orange-500', name: 'Food' },
    transport: { icon: '🚗', color: 'bg-blue-500', name: 'Transport' },
    shopping: { icon: '🛍️', color: 'bg-pink-500', name: 'Shopping' },
    bills: { icon: '💡', color: 'bg-yellow-500', name: 'Bills' },
    entertainment: { icon: '🎮', color: 'bg-purple-500', name: 'Fun' },
    other: { icon: '📦', color: 'bg-gray-500', name: 'Other' }
};

export default function ExpenseCard({ expense, onDelete }) {
    const cat = categories[expense.category];

    return (
        <div className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{expense.title}</p>
                    <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</div>
                    <button
                        onClick={() => onDelete(expense.id)}
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all flex items-center justify-center"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}
