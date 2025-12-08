import React from 'react';

export default function TodoCard({ todo, onToggle, onDelete }) {
    return (
        <div
            className={`group bg-white rounded-2xl p-4 shadow-md transition-all ${todo.done ? 'bg-green-50 border-2 border-green-200' : 'hover:shadow-lg'
                }`}
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggle(todo.id)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${todo.done ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-500'
                        }`}
                >
                    {todo.done && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
                <div className="flex-1">
                    <p className={`text-lg ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.text}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(todo.id)}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all flex items-center justify-center"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}
